const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  user_id: { type: mongoose.Schema.Types.ObjectId },
  post_id: { type: mongoose.Schema.Types.ObjectId },
  time: { 
    type: Date 
  },
  comment: { 
    type: String,
    required: [true, "Please enter a comment"]
  }
});