const mongoose = require("mongoose");
const moment = require("moment");

const userSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: false,
    },
  email: {
    type: String,
    required: true,
  },
  registerdate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    street: {
      type: String,
      required: false,
    },
    street2: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    zipCode: {
      type: Number,
      required: false,
    },
  },
  creditBalance: {
    type: Number,
    required: false,
  },
  orderHistory: {
    type: Array,
    required: false,
    //default: [],
  },
  myBooks:{
    type: Array,
    required: false,
    },
  myCart:{
    type: Array,
    required: false,
  }  
  
});

module.exports = mongoose.model("user", userSchema);
