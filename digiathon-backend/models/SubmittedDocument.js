const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubmittedDocumentSchema = new Schema({
  data: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  created: {
    type: Number,
    required: true,
    default: Math.floor(new Date().getTime() / 1000),
  },
  requestId: {
    type: mongoose.Types.ObjectId,
    ref: "SignRequest",
  },
});

module.exports = SubmittedDocument = mongoose.model(
  "SubmittedDocument",
  SubmittedDocumentSchema
);
