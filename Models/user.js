const mongoose = require("mongoose");
const moment = require("moment");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  registerdate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", userSchema);
