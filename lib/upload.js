// const s3 = require('./s3');
const multer = require('multer');
// const multerS3 = require('multer-s3');
const uuid = require('uuid');

module.exports = multer({
  storage: multer.diskStorage({
    filename(req, file, next) {
      const ext = file.mimetype.replace('image/', '');
      next(null, `${uuid.v4()}.${ext}`);
    },
    destination(req, file, next) {
      next(null, 'public/uploads');
    }
  })
});
