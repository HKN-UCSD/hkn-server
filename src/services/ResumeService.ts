import { AppUser } from '@Entities';

import { StorageService, StorageServiceImpl } from '@Services';

export class ResumeService {
  constructor(private storageService: StorageService) {}

  async uploadResume(appUser: AppUser, file: Express.Multer.File): Promise<string | null> {
    const storedfileName = `${appUser.firstName}_${appUser.lastName}_Resume`;
    const options = {
      appendFileName: appUser.id,
    };
    try {
      return this.storageService.uploadFile(storedfileName, file, options).catch(e => {
        return null;
      });
    } catch (e) {
      console.log(`Error uploading to resume storage: ${e.message}`);
      return null;
    }
  }

  async downloadResume(appUser: AppUser): Promise<Buffer | null> {
    try {
      const storedfileName = `${appUser.firstName}_${appUser.lastName}_${appUser.id}_Resume`;
      return this.storageService.downloadFile(storedfileName);
    } catch (e) {
      console.log(`Could not retrieve file from S3: ${e.message}`);
      return null;
    }
  }
}

export const ResumeServiceImpl = new ResumeService(StorageServiceImpl);
