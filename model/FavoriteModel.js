const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  user_id: { type: mongoose.Schema.Types.ObjectId },
  post_id: { type: mongoose.Schema.Types.ObjectId },
});