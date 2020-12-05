import {
  JsonController,
  Get,
  Post,
  QueryParam,
  UploadedFile,
  Req,
  Res,
  BadRequestError,
  HttpCode,
} from 'routing-controllers';
import { StorageService, StorageServiceImpl } from '@Services';
import multer from 'multer';
import { Readable } from 'typeorm/platform/PlatformTools';

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
    fileSize: 1024 * 1024 * 5,
  },
};

@JsonController('/api/storage')
export class StorageController {
  constructor(private storageService: StorageService) {}

  @HttpCode(201)
  @Post('/upload')
  async uploadFile(
    @Req() req: Express.Request,
    @UploadedFile('file', {
      options: fileUploadOptions,
    })
    file: Express.Multer.File
  ): Promise<string> {
    if (!file) {
      throw new BadRequestError('Invalid file');
    }
    const name = Date.now() + '-' + file.originalname;
    try {
      return this.storageService.uploadFile(name, file.buffer);
    } catch (e) {
      throw new BadRequestError(`Error uploading to storage: ${e.message}`);
    }
  }

  @HttpCode(200)
  @Get('/download')
  downloadFile(@QueryParam('fileName') fileName: string): NodeJS.ReadableStream {
    const filepathRegex =
      '^(?:[w]:|\\)(\\[a-z_-s0-9.]+)+.(txt|gif|pdf|doc|docx|xls|xlsx|png|jpg|jpeg)$';

    if (fileName.match(filepathRegex)) {
      try {
        return this.storageService.downloadFile(fileName);
      } catch (e) {
        throw new BadRequestError(`Error loading from storage: ${e.message}`);
      }
    }
    throw new BadRequestError('Invalid file path');
  }

  @HttpCode(200)
  @Get('/index')
  async getFileIndex(): Promise<string> {
    return '';
  }
}

export const StorageControllerImpl = new StorageController(StorageServiceImpl);
