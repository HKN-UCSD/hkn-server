import { Response } from 'express';
import multer from 'multer';

import { AppUser } from '@Entities';
import { StorageService, StorageServiceImpl } from '@Services';
import { config } from '@Config';
import { logFunc } from '@Logger';

const FILE_NAME = 'ResumeService.ts';

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: Function): void => {
  logFunc('fileFilter', {}, FILE_NAME);

  if (file.mimetype.includes('pdf')) {
    cb(null, true);
  } else {
    console.log('Invalid file type');
    cb(null, false);
  }
};

export const resumeFileUploadOptions = {
  storage: multer.memoryStorage(),
  fileFilter: fileFilter,
  limits: {
    fieldNameSize: 255,
    fileSize: 1024 * 1024 * 5,
  },
};

export class ResumeService {
  constructor(private storageService: StorageService) {}

  /**
   * Uploads a document as the resume for the current signed in user.  Returns
   * a string to confirm success, and null otherwise.
   *
   * @param {AppUser} appUser The current signed in user.
   * @param {Express.Multer.File} file The file object passed in with multer.
   * @return {Promise<string | null>} A Promise that indicates whether the upload succeeded.
   */
  async uploadResume(appUser: AppUser, file: Express.Multer.File): Promise<string | null> {
    logFunc('uploadResume', { appUser }, FILE_NAME);

    const storedfileName = `${appUser.firstName}_${appUser.lastName}_Resume`;
    const options = {
      appendFileName: `${appUser.id}`,
      bucketName: config.awsConfig.resumeBucketName,
    };

    return this.storageService.uploadFile(storedfileName, file, options);
  }

  /**
   * Downloads the resume for the current user.  If none exists, returns null.
   * Otherwise, returns the file contents in a Buffer.
   *
   * @param {AppUser} appUser The current user object.
   * @param {Response} res The response object.
   */
  async downloadResume(appUser: AppUser, res: Response): Promise<Buffer | null> {
    logFunc('downloadResume', { appUser }, FILE_NAME);

    const storedfileName = `${appUser.firstName}_${appUser.lastName}_Resume_${appUser.id}`;
    const options = {
      bucketName: config.awsConfig.resumeBucketName,
    };
    return this.storageService.downloadFile(storedfileName, res, options);
  }
}

export const ResumeServiceImpl = new ResumeService(StorageServiceImpl);
