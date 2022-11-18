import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const uploadFolder = path.resolve(
  __dirname,
  '..',
  '..',
  '..',
  'upload',
  'avatar',
);

export default {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(_req, file, callback) {
      const filehash = crypto.randomBytes(10).toString('hex');

      const filename = `${filehash}- ${file.originalname.replace(/\s/g, '-')}`;

      callback(null, filename);
    },
  }),
};
