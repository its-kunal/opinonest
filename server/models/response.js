const { Schema, model } = require("mongoose");

const responseSchema = new Schema({
  pollId: {
    type: Schema.Types.ObjectId,
    ref: "Poll",
    index: true,
    required: true,
  },
  username: {
    type: String,
    index: true,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Response", responseSchema);
