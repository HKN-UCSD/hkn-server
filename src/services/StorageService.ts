import AWS from 'aws-sdk';

const s3 = new AWS.S3();

export class StorageService {
  async uploadFile(
    fileName: string,
    fileContent: string | Buffer | Blob | NodeJS.TypedArray | NodeJS.ReadableStream
  ): Promise<string> {
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: fileName,
      Body: fileContent,
    };

    return s3
      .upload(params)
      .promise()
      .then(
        function(data: AWS.S3.ManagedUpload.SendData) {
          console.log(`File uploaded successfully. ${data.Location}`);
          return data.Location;
        },
        function(err: Error) {
          console.log(`Error while uploading file: ${err}`);
          return '';
        }
      );
  }
}

export const StorageServiceImpl = new StorageService();
