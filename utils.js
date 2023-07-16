import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

//CONFIGURACION DE MULTER

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder;
    if (file.fieldname === 'profileImage') {
      folder = 'profiles';
    } else if (file.fieldname === 'productImage') {
      folder = 'products';
    } else if (file.fieldname === 'document') {
      folder = 'documents';
    } else {
      return cb(new Error('Tipo de archivo no válido'));
    }

    const uploadPath = join(__dirname, 'public/imgs', folder);
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

export const uploader = multer({ storage });