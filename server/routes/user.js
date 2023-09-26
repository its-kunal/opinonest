const { Router } = require("express");
const userModel = require("../models/user.js");
const { sign } = require("jsonwebtoken");
const { compareSync } = require("bcrypt");
const { verifyMiddleware } = require("../controllers/user.js");
require("dotenv").config();

const router = Router();

router.post("/", async (req, res) => {
  const { name, email, username, password } = req.body;
  try {
    await userModel.create({ name, email, username, password });
    const token = sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    res.setHeader("Authorization", `Bearer ${token}`);
    req.headers.authorization = `Bearer ${token}`;

    res.json({ message: "User created successfully", token });
  } catch (error) {
    return res.status(404).json({ message: "Username already exists" });
  }
});

router.get("/", async (req, res) => {
  const { username, password } = req.query;
  try {
    const user = await userModel.findOne({ username });
    if (user === null)
      return res.status(404).json({ message: "Invalid Credentials" });
    if (!compareSync(password, user.password))
      return res.status(404).json({ message: "Invalid Credentials" });
    const token = sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    res.setHeader("Authorization", `Bearer ${token}`);
    res.json({ message: "User logged in successfully", token });
  } catch (error) {
    return res.status(404).json({ message: "Invalid Credentials" });
  }
});

router.put("/", verifyMiddleware, async (req, res) => {
  const { username } = req.headers;
  const { email, name } = req.body;
  let updateObj = { email, name };
  try {
    updateObj = Object.fromEntries(
      Object.entries(updateObj).filter(([_key, value]) => value != undefined)
    );
    await userModel.updateOne({ username }, updateObj).exec();
    res.json({ message: "User updated successfully" });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
});

module.exports = router;
