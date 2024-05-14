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
        data = {
          ...data._doc,
          children: [],
        };
        response.json(data);
      })
      .catch((error) => {
        response.status(400).json({ message: error.message });
      });
  });
});

const getChildren = (comments, parent_id) => {
  const children = comments.filter((c) => {
    if(c.parent_id === null) {
      return false;
    }
    return c.parent_id.toString() === parent_id.toString();
  });
  if (children.length === 0) {
    return [];
  }
  return children.map((child) => ({
    ...child._doc,
    children: getChildren(comments, child._id),
  }));
}

router.get("/list/:postId", async (request, response) => {
  validateToken(request, response, async () => {
    const comments = await Comment.find({
      post_id: request.params.postId,
    }).sort({ time: 1 });
    const result = [];
    for (let comment of comments) {
      if (comment.parent_id === null) {
        result.push({
          ...comment._doc,
          children: getChildren(comments, comment._id),
        });
      }
    }
    response.json(result);
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
