import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const createFolder = (folder: string) => {
  try {
    console.log('๐พ Create a root uploads folder...');
    fs.mkdirSync(path.join(__dirname, '..', `uploads`));
  } catch (error) {
    console.log('The folder already exists...');
  }
  try {
    console.log(`๐พ Create a ${folder} uploads folder...`);
    fs.mkdirSync(path.join(__dirname, '..', `uploads/${folder}`));
  } catch (error) {
    console.log(`The ${folder} folder already exists...`);
  }
};

const storage = (folder: string): multer.StorageEngine => {
  createFolder(folder);
  return multer.diskStorage({
    destination(req, file, cb) {    //* ์ด๋์ ์ ์ฅํ  ์ง
      const folderName = path.join(__dirname, '..', `uploads/${folder}`);
      cb(null, folderName);
    },
    filename(req, file, cb) {      //* ์ด๋ค ์ด๋ฆ์ผ๋ก ์ฌ๋ฆด ์ง
      const ext = path.extname(file.originalname); //extname => ํ์ฅ์ ์ถ์ถ

      const fileName = `${path.basename(  //์ต์ข์ ์ผ๋ก ์ ์ฅํ  ํ์ผ ์ด๋ฆ
        file.originalname,
        ext,
      )}${Date.now()}${ext}`;

      cb(null, fileName);
    },
  });
};

export const multerOptions = (folder: string) => { // multerOptionsํจ์๋ folder๋ช์ ์ธ์๋ก ๋ฐ๊ณ  ํด๋๋ฅผ ๋ง๋ฆ
  const result: MulterOptions = {
    storage: storage(folder),
  };
  return result;
};