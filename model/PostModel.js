const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  url: {
    type: String,
    required: [true, "Please post an image"],
  },
  time: {  
    type: Date
  },
  caption: { 
    type: String 
  },
  user: { type: mongoose.Schema.Types.ObjectId },
});