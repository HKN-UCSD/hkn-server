import {
  JsonController,
  Get,
  Post,
  Res,
  QueryParam,
  UploadedFile,
  BadRequestError,
  UseBefore,
} from 'routing-controllers';
import { Response } from 'express';
import multer from 'multer';

import { AppUserService, AppUserServiceImpl, StorageService, StorageServiceImpl } from '@Services';
import { OfficerAuthMiddleware } from '@Middlewares';
import { OpenAPI } from 'routing-controllers-openapi';

/**
 * File filter object, which checks the file's attributes then does a callback
 * depending on whether the file is accepted.
 *
 * @param req incoming request
 * @param file file object from multer
 * @param cb callback to accept/reject file
 */
const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: Function) => {
  if (
    file.mimetype.includes('image') ||
    file.mimetype.includes('pdf') ||
    file.mimetype.includes('word')
  ) {
    cb(null, true);
  } else {
    console.log('Invalid file type');
    cb(null, false);
  }
};

/**
 * File upload options for multer:
 * memoryStorage - (where to store files) store in memory as Buffer
 * fileFilter - (filter to accept/reject files) see above
 * limits - limits on size of file and file name, etc
 */
const fileUploadOptions = {
  storage: multer.memoryStorage(),
  fileFilter: fileFilter,
  limits: {
    fieldNameSize: 255,
    fileSize: 1024 * 1024 * 50,
  },
};

@JsonController('/api/storage')
export class StorageController {
  constructor(private storageService: StorageService, private appUserService: AppUserService) {}

  @Post('/upload')
  @UseBefore(OfficerAuthMiddleware)
  @OpenAPI({ security: [{ TokenAuth: [] }] })
  async uploadFile(
    @UploadedFile('file', {
      options: fileUploadOptions,
    })
    file: Express.Multer.File
  ): Promise<string | null> {
    if (!file) {
      throw new BadRequestError('Invalid file');
    }
    const name =
      Date.now() + '-' + file.originalname.substring(0, file.originalname.lastIndexOf('.'));
    try {
      return await this.storageService.uploadFile(name, file);
    } catch (e) {
      throw new BadRequestError(`Error uploading to storage: ${e.message}`);
    }
  }

  @Get('/download')
  @UseBefore(OfficerAuthMiddleware)
  @OpenAPI({ security: [{ TokenAuth: [] }] })
  async downloadFile(
    @QueryParam('fileName') fileName: string,
    @Res() res: Response
  ): Promise<Buffer | null> {
    if (fileName) {
      try {
        return await this.storageService.downloadFile(fileName, res);
      } catch (e) {
        throw new BadRequestError(`Error loading from storage: ${e.message}`);
      }
    }
    throw new BadRequestError('Invalid file path');
  }

  @Get('/index')
  @UseBefore(OfficerAuthMiddleware)
  @OpenAPI({ security: [{ TokenAuth: [] }] })
  async getFileIndex(): Promise<Array<string> | null> {
    try {
      return await this.storageService.getFileIndex();
    } catch (e) {
      throw new BadRequestError(`Error loading from storage: ${e.message}`);
    }
  }
}

export const StorageControllerImpl = new StorageController(StorageServiceImpl, AppUserServiceImpl);
