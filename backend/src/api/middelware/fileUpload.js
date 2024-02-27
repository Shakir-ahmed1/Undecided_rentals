const multer = require('multer');

const Storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now();
    const filename = `${uniqueSuffix}-${Math.round(Math.random() * 1E9)}-${file.originalname}`;
    cb(null, filename);
  },
});

const filter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    const error = new Error('Wrong file format');
    error.wrongFileFormat = true;
    cb(error);
  }
};

const upload = multer({
  storage: Storage,
  fileFilter: filter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB (in bytes)
  },
});

// eslint-disable-next-line no-unused-vars
const uploadErrorHandler = (maxFiles) => (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      res.status(400).json({ error: { largeFile: 'File size too large. Maximum size allowed is 10MB.' } });
    } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      if (maxFiles === 1) {
        res.status(400).json({ error: { LIMIT_UNEXPECTED_FILE: 'filed name must be Image and the number of images sent must be one' } });
      } else {
        res.status(400).json({ error: { LIMIT_UNEXPECTED_FILE: 'filed name must be Image and the max number of images sent must be 5' } });
      }
    }
  }
  if (err.wrongFileFormat) {
    res.status(400).json({ error: { wrongFormat: 'Wrong file format. Only images are allowed.' } });
  }
  return res.status(500).json({ error: { error: err.message } });
};

module.exports = { upload, uploadErrorHandler };
