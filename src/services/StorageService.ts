import { Response } from 'express';

import { loadAWS_S3 } from '../loaders';
import { config } from '../config';

const s3 = loadAWS_S3();
export class StorageService {
  /**
   * Uploads a file to the S3 bucket, given a filename and the file itself
   * through multer.  There is also an options object to add details to the
   * key in the filesystem while not changing the download name.
   *
   * @param {string} fileName The fileName as we want it to appear in the fs.
   * @param {Express.Multer.File} file A file object uploaded through multer.
   * @param {Object} options An options object to configure extra functionality.
   * @returns {Promise<string | null>} A Promise that indicates whether the upload succeeded.
   */
  async uploadFile(
    fileName: string,
    file: Express.Multer.File,
    options?: Object
  ): Promise<string | null> {
    let fileNameKey = fileName;
    if (options) {
      if ('appendFileName' in options) {
        fileNameKey = `${fileName}_${options['appendFileName']}`;
      }
    }

    /**
     * We store the key as a string without extension, since when we retrieve we
     * do not know the extension of file.  But, we can set content disposition and
     * mimetype so that when we download, the file will be downloaded correctly.
     */
    const params = {
      Bucket: config.awsConfig.bucketName,
      Key: fileNameKey,
      Body: file.buffer,
      ContentDisposition: `attachment; filename="${fileName}${file.originalname.substring(
        file.originalname.lastIndexOf('.')
      )}"`,
      ContentType: `${file.mimetype}`,
    };

    return s3
      .upload(params)
      .promise()
      .then(data => {
        console.log(`File uploaded successfully. ${data.Location}`);
        return 'File uploaded successfully';
      });
    // .catch(e => {
    //   console.log(`Error while uploading file: ${e.message}`);
    //   return null;
    // }); // TODO cleanup
  }

  /**
   * Downloads a file from the S3 bucket, using a fileName as the key.  If an
   * error occurs, returns null, otherwise returns the contents of the file as a
   * Buffer.
   *
   * @param {string} fileName The fileName as it appears in the key of the bucket.
   * @param {Response} res The response object.
   * @returns {Promise<Buffer | null>} A Promise that returns the contents of the file in a Buffer.
   */
  async downloadFile(fileName: string, res: Response): Promise<Buffer | null> {
    try {
      const params = {
        Bucket: config.awsConfig.bucketName,
        Key: fileName,
      };

      return s3
        .getObject(params)
        .promise()
        .then(data => {
          res.set({
            'content-disposition': data.ContentDisposition,
            'content-type': data.ContentType,
          });
          return Buffer.from(data.Body);
        });
      // .catch(e => {
      //   console.log(`Could not retrieve file: ${e.message}`);
      //   return null;
      // }); // TODO cleanup
    } catch (e) {
      console.log(`Could not retrieve file from S3: ${e.message}`);
      return null;
    }
  }

  /**
   * Lists all of the files currently present in the S3 bucket.
   *
   * @returns {Promise<Array<string> | null>} A Promise that returns the list of all objects in the bucket.
   */
  async getFileIndex(): Promise<Array<string> | null> {
    try {
      const params = {
        Bucket: config.awsConfig.bucketName,
      };
      return s3
        .listObjectsV2(
          params
          //   err => {
          //   if (err) {
          //     console.log(`Could not retrieve file from S3: ${err.message}`);
          //     return null;
          //   }
          // } // TODO cleanup
        )
        .promise()
        .then(data => {
          if (!data) {
            return [];
          }
          const contents = data.Contents;
          return contents.map(content => {
            return content.Key;
          });
        });
      // .catch(e => {
      //   console.log(`Could not retrieve file from S3: ${e.message}`);
      //   return null;
      // });  // TODO cleanup
    } catch (e) {
      console.log(`Could not retrieve index from S3: ${e.message}`);
      return null;
    }
  }
}

export const StorageServiceImpl = new StorageService();
