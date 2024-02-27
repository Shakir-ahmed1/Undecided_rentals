const multer = require('multer');

// Storage for profileImage
const Storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now + file.originalname);
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
  storage: Storage, fileFilter: filter,
}).single('profileImage');

module.exports = { upload };
