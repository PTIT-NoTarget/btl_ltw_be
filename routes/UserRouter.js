const express = require("express");
const User = require("../model/UserModel");
const validateToken = require("../utils/ValidateToken");
const router = express.Router();
const upload = require("../utils/Upload");

router.post("/", upload("avatar"), async (request, response) => {
  validateToken(request, response, async (_id) => {
    try {
      let update = {...request.body, avatar: request.file?.path};
      const updatedUser = await User.findOneAndUpdate({ _id }, update, { new: true });
      response.json(updatedUser);
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  });
});

router.get("/list", async (request, response) => {
  validateToken(request, response, async () => {
    const users = await User.find();
    response.json(users);
  });
});

router.get("/:id", async (request, response) => {
  validateToken(request, response, async () => {
    try {
      const user = await User.findById(request.params.id);
      response.json(user);
    } catch (error) {
      response.status(400).json({ message: "User does not exist" });
    }
  });
});

module.exports = router;