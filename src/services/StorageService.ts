import AWS from 'aws-sdk';

const s3 = new AWS.S3({ region: process.env.BUCKET_REGION });
export class StorageService {
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
    const params = {
      Bucket: process.env.BUCKET_NAME,
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
      .then(
        function(data: AWS.S3.ManagedUpload.SendData) {
          console.log(`File uploaded successfully. ${data.Location}`);
          return 'File uploaded successfully';
        },
        function(e: Error) {
          // throw new Error(`Error while uploading file: ${e.message}`);
          console.log(`Error while uploading file: ${e.message}`);
          return null;
        }
      )
      .catch(e => {
        console.log(`Error while uploading file: ${e.message}`);
        return null;
      });
  }

  async downloadFile(fileName: string): Promise<Buffer | null> {
    try {
      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: fileName,
      };

      return s3
        .getObject(params)
        .promise()
        .then(res => Buffer.from(res.Body))
        .catch(e => {
          console.log(`Could not retrieve file: ${e.message}`);
          return null;
        });
    } catch (e) {
      console.log(`Could not retrieve file from S3: ${e.message}`);
      return null;
    }
  }

  async getFileIndex(): Promise<Array<string> | null> {
    try {
      const params = {
        Bucket: process.env.BUCKET_NAME,
      };
      return s3
        .listObjectsV2(params, function(err) {
          if (err) {
            console.log(`Could not retrieve file from S3: ${err.message}`);
            return null;
          }
        })
        .promise()
        .then(function(data) {
          const contents = data.Contents;
          return contents.map(content => {
            return content.Key;
          });
        })
        .catch(e => {
          console.log(`Could not retrieve file from S3: ${e.message}`);
          return null;
        });
    } catch (e) {
      console.log(`Could not retrieve file from S3: ${e.message}`);
      return null;
    }
  }
}

export const StorageServiceImpl = new StorageService();
