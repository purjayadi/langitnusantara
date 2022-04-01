import multer from 'multer';
import path from 'path';
import fs from 'fs';

export const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const des = req.path;
    const dir = './public/images/' + des;
    fs.exists(dir, (exist: any) => {
      if (!exist) {
        return fs.mkdirSync(dir, { recursive: true });
      }
      return cb(null, dir);
    });
  },

  filename: function (req: any, file: any, cb: any) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

export const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Image uploaded is not of type jpg/jpeg or png'), false);
  }
};
