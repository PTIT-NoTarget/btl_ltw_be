const express = require("express");
const Favorite = require("../model/FavoriteModel");
const router = express.Router();
const validateToken = require("../utils/ValidateToken");

router.post("/:postId", async (request, response) => {
  validateToken(request, response, async (userId) => {
    const favorite = new Favorite({
      user_id: userId,
      post_id: request.params.postId,
    });
    const existingFavorite = await Favorite.findOne({
      user_id: userId,
      post_id: request.params.postId,
    });
    if (existingFavorite) {
      await Favorite.findOneAndDelete({
        user_id: userId,
        post_id: request.params.postId,
      })
        .then(() => {
          response.json({ message: "Favorite removed" });
        })
        .catch((error) => {
          response.status(400).json({ message: error.message });
        });
    } else {
      favorite
        .save()
        .then((data) => {
          response.json(data);
        })
        .catch((error) => {
          response.status(400).json({ message: error.message });
        });
    }
  });
});

router.get("/count/:postId", async (request, response) => {
  validateToken(request, response, async () => {
    const count = await Favorite.countDocuments({
      post_id: request.params.postId,
    });
    response.json({ count });
  });
});

router.get("/check/:postId", async (request, response) => {
  validateToken(request, response, async (userId) => {
    const favorites = await Favorite.findOne({
      post_id: request.params.postId,
      user_id: userId,
    });
    if (favorites) {
      response.json({ isFavorite: true });
    } else {
      response.json({ isFavorite: false });
    }
  });
});

module.exports = router;
