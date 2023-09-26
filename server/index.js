const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs")

const pollRouter = require("./routes/poll.js");
const userRouter = require("./routes/user.js");
const responseRouter = require("./routes/response.js");

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/test";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/poll", pollRouter);
app.use("/user", userRouter);
app.use("/response", responseRouter);

try {
  mongoose.connect(MONGO_URI, {}).then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port http://localhost:${PORT}`);
    });
  });
} catch (err) {
  console.log("Could not connect to database");
}
