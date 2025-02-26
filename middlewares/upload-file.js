const multer = require("multer");
const path = require("path");
// const fs = require("fs");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

require("dotenv").config();

// Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // Folder di Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"], // Format yang diizinkan
  },
});

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "/temp/uploads");
//   },
//   filename: (req, file, cb) => {
//     let dateNow = Date.now();
//     const uniqueSuffix = dateNow + "-" + Math.round(Math.random() * 1e9);
//     cb(
//       null,
//       file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
//     );
//   },
// });

const upload = multer({ storage: storage });

module.exports = upload;
