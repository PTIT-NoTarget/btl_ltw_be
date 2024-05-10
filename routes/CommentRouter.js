const express = require("express");
const Comment = require("../model/CommentModel");
const router = express.Router();
const validateToken = require("../utils/ValidateToken");

router.post("/:postId", async (request, response) => {
  validateToken(request, response, async (userId) => {
    const comment = new Comment({
      ...request.body,
      user_id: userId,
      post_id: request.params.postId,
      time: new Date(),
    });
    comment
      .save()
      .then((data) => {
        response.json(data);
      })
      .catch((error) => {
        response.status(400).json({ message: error.message });
      });
  });
});

router.get("/list/:postId", async (request, response) => {
  validateToken(request, response, async () => {
    const comments = await Comment.find({
      post_id: request.params.postId,
    }).sort({ time: -1 });
    response.json(comments);
  });
});

router.get("/count/:postId", async (request, response) => {
  validateToken(request, response, async () => {
    const count = await Comment.countDocuments({
      post_id: request.params.postId,
    });
    response.json({ count });
  });
});

module.exports = router;
