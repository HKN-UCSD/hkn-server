import { Response } from 'express';

import { loadAWS_S3 } from '../loaders';
import { BadRequestError } from 'routing-controllers';

const s3 = loadAWS_S3();

type UploadOptions = {
  appendFileName: string;
  bucketName: string;
};

type DownloadOptions = {
  bucketName: string
};
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
    options: UploadOptions
  ): Promise<string | null> {
    let params;
    try {
      let fileNameKey = fileName;
      if (options) {
        if ('appendFileName' in options) {
          fileNameKey = `${fileName}_${options['appendFileName']}`;
        }
        if (!options.bucketName) {
          throw new Error('No bucket specified in upload');
        }
      }

      /**
       * We store the key as a string without extension, since when we retrieve we
       * do not know the extension of file.  But, we can set content disposition and
       * mimetype so that when we download, the file will be downloaded correctly.
       */
      params = {
        Bucket: options.bucketName,
        Key: fileNameKey,
        Body: file.buffer,
        ContentDisposition: `attachment; filename="${fileName}${file.originalname.substring(
          file.originalname.lastIndexOf('.')
        )}"`,
        ContentType: `${file.mimetype}`,
      };
    } catch (e) {
      throw new BadRequestError(`Error in storage parameters: ${e.message}`);
    }

    try {
      return await s3
        .upload(params)
        .promise()
        .then(data => {
          console.log(`File uploaded successfully. ${data.Location}`);
          return 'File uploaded successfully';
        });
    } catch (e) {
      throw new BadRequestError(`Error downloading from storage: ${e.message}`);
    }
  }

  /**
   * Downloads a file from the S3 bucket, using a fileName as the key.  If an
   * error occurs, returns null, otherwise returns the contents of the file as a
   * Buffer.
   *
   * @param {string} fileName The fileName as it appears in the key of the bucket.
   * @param {Response} res The response object.
   * @param {string} bucketName The bucket to download from.
   * @returns {Promise<Buffer | null>} A Promise that returns the contents of the file in a Buffer.
   */
  async downloadFile(fileName: string, res: Response, options: DownloadOptions): Promise<Buffer | null> {
    try {
      if (options) {
        if (!options.bucketName) {
          throw new Error('No bucket specified in download');
        }
      } else {
        throw new Error('Missing required options');
      }

      const params = {
        Bucket: options.bucketName,
        Key: fileName,
      };

      const data = await s3.getObject(params).promise();
      res.set({
        'content-disposition': data.ContentDisposition,
        'content-type': data.ContentType,
      });
      return Buffer.from(data.Body);
    } catch (e) {
      throw new BadRequestError(`Error downloading from storage: ${e.message}`);
    }
  }

  /**
   * Lists all of the files currently present in the S3 bucket. (utility function)
   *
   * @param {string} bucketName The name of bucket to get index of.
   * @returns {Promise<Array<string> | null>} A Promise that returns the list of all objects in the bucket.
   */
  async getFileIndex(bucketName: string): Promise<Array<string> | null> {
    try {
      const params = {
        Bucket: bucketName,
      };
      return s3
        .listObjectsV2(params)
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
    } catch (e) {
      throw new BadRequestError(`Error downloading from storage: ${e.message}`);
    }
  }
}

export const StorageServiceImpl = new StorageService();
