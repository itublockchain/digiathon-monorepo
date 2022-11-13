const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VerificationSchema = new Schema({
  sender: {
    type: String,
    required: true,
  },
  type: {
    type: String, // "accepted" | "rejected"
    required: true,
  },
  created: {
    type: Number,
    required: true,
    default: Math.floor(new Date().getTime() / 1000),
  },
  comment: {
    type: String,
    required: false,
  },
  requestId: {
    type: mongoose.Types.ObjectId,
    ref: "SignRequest",
  },
});

module.exports = Verification = mongoose.model(
  "Verification",
  VerificationSchema
);
