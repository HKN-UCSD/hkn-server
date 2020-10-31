import {
  JsonController,
  Post,
  UploadedFile,
  Req,
  BadRequestError,
  HttpCode,
} from 'routing-controllers';
import { StorageService, StorageServiceImpl } from '@Services';
import multer from 'multer';

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
  async saveFile(
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
    return this.storageService.uploadFile(name, file.buffer);
  }
}

export const StorageControllerImpl = new StorageController(StorageServiceImpl);
