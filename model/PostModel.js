const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  image: {
    type: String,
    required: [true, "Please post an image"],
  },
  time: {
    type: Date,
  },
  caption: {
    type: String,
  },
  user_id: { type: mongoose.Schema.Types.ObjectId },
});

module.exports = mongoose.model.Posts || mongoose.model("posts", postSchema);
