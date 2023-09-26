const { Schema, model } = require("mongoose");

const pollSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      type: String,
      required: true,
    },
  ],
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  bgImage: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  endsAt: {
    type: Date,
  },
  createdUsername: {
    type: String,
    required: true,
  },
});

pollSchema.pre("save", function (next) {
  if (this.createdAt < Date.now()) {
    this.createdAt = Date.now();
  }
  if (this.endsAt < this.createdAt) {
    this.endsAt = new Date(this.createdAt).setDate(
      new Date(this.createdAt).getDate() + 1
    );
  }
  next();
});

module.exports = model("Poll", pollSchema);
