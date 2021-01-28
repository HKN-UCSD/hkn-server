import {
  JsonController,
  Get,
  Post,
  QueryParam,
  UploadedFile,
  BadRequestError,
  UseBefore,
} from 'routing-controllers';
import { AppUserService, AppUserServiceImpl, StorageService, StorageServiceImpl } from '@Services';
import multer from 'multer';
import { OfficerAuthMiddleware } from '@Middlewares';
import { OpenAPI } from 'routing-controllers-openapi';

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
      return this.storageService.uploadFile(name, file);
    } catch (e) {
      throw new BadRequestError(`Error uploading to storage: ${e.message}`);
    }
  }

  @Get('/download')
  @UseBefore(OfficerAuthMiddleware)
  @OpenAPI({ security: [{ TokenAuth: [] }] })
  async downloadFile(@QueryParam('fileName') fileName: string): Promise<Buffer | null> {
    if (fileName) {
      try {
        return this.storageService.downloadFile(fileName);
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
      return this.storageService.getFileIndex();
    } catch (e) {
      throw new BadRequestError(`Error loading from storage: ${e.message}`);
    }
  }
}

export const StorageControllerImpl = new StorageController(StorageServiceImpl, AppUserServiceImpl);
