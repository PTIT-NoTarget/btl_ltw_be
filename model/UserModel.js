const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    id: mongoose.Schema.Types.ObjectId,
    username: {
      type: String,
      required: [true, "Please enter a username"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minLength: [6, "Password must be at least 6 characters long"],
    },
    first_name: {
      type: String,
      required: [true, "Please enter a first name"],
    },
    last_name: {
      type: String,
      required: [true, "Please enter a last name"],
    },
    location: {
      type: String,
    },
    description: {
      type: String,
    },
    occupation: {
      type: String,
    },
    avatar: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model.Users || mongoose.model("users", userSchema);
