import AWS from 'aws-sdk';
import { config } from '../config';

export function loadAWS(): void {
  AWS.config.update({
    accessKeyId: config.awsConfig.accessKeyId,
    secretAccessKey: config.awsConfig.secretKey,
  });
}

export function loadAWS_S3(): AWS.S3 {
  return new AWS.S3({ region: config.awsConfig.bucketRegion });
}
