const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a user schema
// It has
// - email
// - password
// - username
// - Full name
// - A object that contains movie from each ott platform

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  movies: {
    type: Object,
  },
  subscription: {
    type: Object,
  },
  orders: {
    type: Array,
  },
  payments: {
    type: Array,
  },
  token: {
    type: String,
  },
});

module.exports = mongoose.model("users", userSchema);
