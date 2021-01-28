import fs from 'fs';

const dir_path = process.cwd() + '/local_fs/';

if (!fs.existsSync(dir_path)) {
  fs.mkdirSync(dir_path);
}

export class LocalStorageService {
  async uploadFile(
    fileName: string,
    fileContent: string | Buffer | Blob | NodeJS.TypedArray | NodeJS.ReadableStream
  ): Promise<string> {
    fs.writeFile(dir_path + fileName, Buffer.from(fileContent), function(err) {
      if (err) {
        throw new Error(`Could not write file to ${dir_path + fileName}: ${err.message}`);
      }
    });
    return `Uploaded file to ${dir_path + fileName}`;
  }

  async downloadFile(fileName: string): Promise<Buffer | null> {
    try {
      return fs.promises.readFile(dir_path + fileName);
    } catch (e) {
      throw new Error(`Could not retrieve file from fs at ${dir_path + fileName}: ${e.message}`);
    }
  }
}

export const LocalStorageServiceImpl = new LocalStorageService();
