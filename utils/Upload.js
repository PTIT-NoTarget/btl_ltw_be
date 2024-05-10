const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/CloudinaryConfig");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "images",
    format: async (req, file) => "png",
  },
});

const parser = multer({ storage: storage });

const upload = (file) => {
  return parser.single(file);
};

module.exports = upload;
