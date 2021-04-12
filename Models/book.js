const mongoose = require("mongoose");
const moment = require("moment");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  registerdate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  image: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: true,
  },
  tag: {
    type: Array,
    required: false,
  },
  inStock: {
    type: Boolean,
    required: false,
    howMany: Number,
  },
  buyFor: {
    type: Number,
    required: false,
  },
  rentFor: {
    type: Number,
    required: false,
  },
  sellFor: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model("book", bookSchema);
