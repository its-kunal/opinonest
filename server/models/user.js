const { Schema, model } = require("mongoose");
const { hashSync } = require("bcrypt");

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", function (next) {

  this.password = hashSync(this.password, 10);
  this.createdAt = Date.now();
  next();
});

module.exports = model("User", userSchema);
