const multer = require('multer');
const { v1: uuidv1 } = require('uuid'); // Импорт метода v1 из uuid
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

const fileUpload = multer({
    limits: 500000, // 500kb
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploades/images');
        },
        filename: (req, file, cb) => {

            const ext = MIME_TYPE_MAP[file.mimetype];
            cb(null, uuidv1() + '.' + ext); 
        }
    }),
    fileFilter: (req, file, cb) => {
        const isValid = !!MIME_TYPE_MAP[file.mimetype];
        let error = isValid ? null : new Error('Invalid mime type!')
        cb(error, isValid)
    }
})

module.exports = fileUpload;