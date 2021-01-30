import { Response } from 'express';

import { AppUser } from '@Entities';

import { StorageService, StorageServiceImpl } from '@Services';

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
    const storedfileName = `${appUser.firstName}_${appUser.lastName}_Resume`;
    const options = {
      appendFileName: `${appUser.id}`,
    };
    try {
      return this.storageService.uploadFile(storedfileName, file, options);
    } catch (e) {
      console.log(`Error uploading to resume storage: ${e.message}`);
      return null;
    }
  }

  /**
   * Downloads the resume for the current user.  If none exists, returns null.
   * Otherwise, returns the file contents in a Buffer.
   *
   * @param {AppUser} appUser The current user object.
   * @param {Response} res The response object.
   */
  async downloadResume(appUser: AppUser, res: Response): Promise<Buffer | null> {
    try {
      const storedfileName = `${appUser.firstName}_${appUser.lastName}_Resume_${appUser.id}`;
      return this.storageService.downloadFile(storedfileName, res);
    } catch (e) {
      console.log(`Could not retrieve file from S3: ${e.message}`);
      return null;
    }
  }
}

export const ResumeServiceImpl = new ResumeService(StorageServiceImpl);
