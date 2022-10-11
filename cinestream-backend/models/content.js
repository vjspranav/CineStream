const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Content schema
const contentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  type: {
    // Restrict to movie/series
    type: String,
    required: true,
    enum: ["movie", "series"],
    default: "movie",
  },
  genre: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
    default: "English",
  },
  ottPlatform: {
    type: String,
    required: true,
    default: "self",
  },
});

module.exports = mongoose.model("content", contentSchema);
