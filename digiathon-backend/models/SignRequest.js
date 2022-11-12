const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SignRequestSchema = new Schema({
  sender: {
    type: String,
    required: true,
  },
  created: {
    type: Number,
    required: true,
    default: Math.floor(new Date().getTime() / 1000),
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = SignRequest = mongoose.model("SignRequest", SignRequestSchema);
