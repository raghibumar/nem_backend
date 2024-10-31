const mongoose = require("mongoose");

// User Schema
const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  age: Number,
});

// User Model
const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};
