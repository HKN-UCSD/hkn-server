import AWS from 'aws-sdk/global';
import S3 from 'aws-sdk/clients/s3';
import { config } from '../config';

export function loadAWS(): void {
  AWS.config.update({
    accessKeyId: config.awsConfig.accessKeyId,
    secretAccessKey: config.awsConfig.secretKey,
  });
}

export function loadAWS_S3(): S3 {
  return new S3({ region: config.awsConfig.bucketRegion });
}
