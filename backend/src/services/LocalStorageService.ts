import fs from 'fs';
import { Response } from 'express';

const dir_path = process.cwd() + '/local_fs/';

if (!fs.existsSync(dir_path)) {
  fs.mkdirSync(dir_path);
}

export class LocalStorageService {
  async uploadFile(fileName: string, file: Express.Multer.File, options: Object): Promise<string> {
    let fileNameKey = fileName;
    if (options) {
      if ('appendFileName' in options) {
        fileNameKey = `${fileName}_${options['appendFileName']}`;
      }
    }

    fs.writeFile(
      dir_path + fileNameKey + file.originalname.substring(file.originalname.lastIndexOf('.')),
      file.buffer,
      function (err) {
        if (err) {
          throw new Error(`Could not write file to ${dir_path + fileName}: ${err.message}`);
        }
      }
    );
    return `Uploaded file to ${dir_path + fileName}`;
  }

  async downloadFile(fileName: string, res: Response, options: Object): Promise<Buffer | null> {
    try {
      if (!options) {
        throw new Error('Options for bucket/container not specified');
      }
      res.set({
        'content-disposition': `attachment; filename="${fileName}"`,
      });
      return fs.promises.readFile(dir_path + fileName);
    } catch (e) {
      throw new Error(`Could not retrieve file from fs at ${dir_path + fileName}: ${e.message}`);
    }
  }
}

export const LocalStorageServiceImpl = new LocalStorageService();
