const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  user_id: { type: mongoose.Schema.Types.ObjectId },
  post_id: { type: mongoose.Schema.Types.ObjectId },
  parent_id: { 
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },
  level: {
    type: Number,
    default: 0,
  },
  time: {
    type: Date,
  },
  content: {
    type: String,
    required: [true, "Please enter a comment"],
  },
});

module.exports =
  mongoose.model.Comments || mongoose.model("comments", commentSchema);
