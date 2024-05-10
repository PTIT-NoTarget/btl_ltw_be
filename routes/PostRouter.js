const express = require("express");
const Post = require("../model/PostModel");
const validateToken = require("../utils/ValidateToken");
const router = express.Router();
const upload = require("../utils/Upload");

router.get("/list", async (request, response) => {
  validateToken(request, response, async (userId) => {
    const posts = await Post.find({ user_id: userId })
    response.json(posts);
  });
});

router.get("/list/:userId", async (request, response) => {
  validateToken(request, response, async () => {
    const posts = await Post.find({ user_id: request.params.userId });
    response.json(posts);
  });
});

router.post("/new", upload("image"), async (request, response) => {
  validateToken(request, response, async (userId) => {
    const post = new Post({
      ...request.body,
      user_id: userId,
      image: request.file?.path,
      time: new Date(),
    });
    post.save()
      .then((data) => {
        response.json(data);
      })
      .catch((error) => {
        response.status(400).json({ message: error.message });
      });
  });
});

router.post("/update/:id", upload("image"), async (request, response) => {
  validateToken(request, response, async () => {
    try {
      let update = { ...request.body, image: request.file?.path };
      const updatedPost = await Post.findOneAndUpdate({ _id: request.params.id }, update, { new: true });
      response.json(updatedPost);
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  });
});

router.delete("/:id", async (request, response) => {
  validateToken(request, response, async () => {
    try {
      await Post.findByIdAndDelete(request.params.id);
      response.json({ message: "Post deleted" });
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  });
});

module.exports = router;
