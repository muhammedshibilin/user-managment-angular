

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name:process.env.cloudName,
  api_key:process.env.cloudKey,
  api_secret:process.env.cloudSecret,
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'user_images',
    allowed_formats: ['jpg', 'jpeg', 'png'], 
  },
});

const upload = multer({ storage: storage });

module.exports = { cloudinary, upload };
