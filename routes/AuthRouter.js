const express = require("express");
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/CloudinaryConfig');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require("../model/UserModel");
const router = express.Router();

router.post("/login", async (request, response) => {
  const { username, password } = request.body;
  const user = await User.findOne({ username });
  if (!user) {
    return response.status(400).json({ message: "Username does not exist" });
  }
  const validPassword = await comparePassword(password, user.password);
  if (!validPassword) {
    return response.status(400).json({ message: "Password is incorrect" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
  response.header("auth-token", token).json({ token });
});

router.post("/logout", async (request, response) => {
  
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'avatar',
    format: async (req, file) => 'png'
  },
});

const parser = multer({ storage: storage });

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
}

router.post("/register", parser.single("avatar"), async (request, response) => {
  const user = new User({
    username: request.body.username,
    password: await hashPassword(request.body.password),
    first_name: request.body.first_name,
    last_name: request.body.last_name,
    location: request.body.location,
    description: request.body.description,
    occupation: request.body.occupation,
    avatar: request.file.path,
  });
  const checkUser = await User.findOne({ username: user.username });
  if (checkUser) {
    return response.status(400).json({ message: "Username already exists" });
  }
  user.save()
    .then((data) => {
      response.json(data);
    })
    .catch((error) => {
      response.status(400).json({ message: error.message });
    });
});

module.exports = router;