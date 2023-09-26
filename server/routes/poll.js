const { Router } = require("express");
const path = require("path");
const fs = require("fs");
const userModel = require("../models/user.js");
const responseModel = require("../models/response.js");
const pollModel = require("../models/poll.js");
const multer = require("multer");

const { verifyMiddleware } = require("../controllers/user");

const router = Router();

const upload = multer({ dest: path.join(__dirname, "../uploads") });

router.use(verifyMiddleware);

router.get("/", async (req, res) => {
  // get all active polls
  try {
    let polls = await pollModel.find({
      createdAt: { $lt: Date.now() },
      endsAt: { $gt: Date.now() },
    });

    return res.json({ polls });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
});

router.post("/", upload.single("bgImage"), async (req, res) => {
  // create a new poll
  if (req.file != null || req.file != undefined) {
    // const fileBuffer = req.file.buffer;
    // const base64String = fileBuffer.toString("base64");
    // req.body.bgImage = base64String;

    let file = fs.readFileSync(
      path.join(__dirname, `../uploads/${req.file.filename}`)
    );
    fs.renameSync(
      path.join(__dirname, `../uploads/${req.file.filename}`),
      path.join(__dirname, `../uploads/${req.file.filename}.svg`)
    );
    let base64String = file.toString("base64");
    req.body.bgImage = base64String;
  }
  const { name, question, bgImage, options, description, endsAt, createdAt } =
    req.body;

  let Obj = {
    name,
    question,
    bgImage,
    options,
    description,
    endsAt,
    createdAt,
    createdUsername: req.headers.username,
  };
  try {
    // throw new Error("Cannot create poll");
    Object.fromEntries(
      Object.entries(Obj).filter(([key, value]) => value != undefined)
    );
    let poll = await pollModel.create(Obj);
    res.json({ message: "Poll Created Successfully", poll });
  } catch (err) {
    return res.status(404).json({ message: "Cannot create poll", err });
  }
});

router.get("/closed", async (req, res) => {
  // get all closed polls
  try {
    const closedPolls = await pollModel.find({ endsAt: { $lt: Date.now() } });
    res.json({ polls: closedPolls });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
});
router.get("/user", async (req, res) => {
  // get polls where user participated
  let { username } = req.headers;
  try {
    const polls = await responseModel
      .aggregate([
        {
          $match: { username },
        },
        {
          $group: {
            _id: "$username",
            participatedPolls: { $push: "$pollId" },
          },
        },
      ])
      .exec();
    const participatedPolls = await pollModel
      .find({ _id: { $in: polls[0].participatedPolls } })
      .exec();
    res.json({ polls: participatedPolls });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
});

router.get("/user/profile", async (req, res) => {
  const { username } = req.headers;
  const errorMessage = "Couldn't find user";
  const errorHandler = () => res.status(404).json({ message: errorMessage });
  try {
    let user = await userModel.findOne({ username }, { password: 0 });
    if (user) {
      return res.json({ user });
    } else {
      errorHandler();
    }
  } catch (err) {
    errorHandler();
  }
});

router.get("/user/create", async (req, res) => {
  const { username } = req.headers;
  try {
    const polls = await pollModel.find({ createdUsername: username }).exec();
    res.json({ polls });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
});
router.get("/:pollId", async (req, res) => {
  // get a specific poll details
  const { pollId } = req.params;
  try {
    const poll = await pollModel.findById(pollId).exec();
    res.json({ poll });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
});

router.put("/:pollId", upload.single("bgImage"), async (req, res) => {
  // update a poll
  if (req.file != null || req.file != undefined) {
    const fileBuffer = req.file.buffer;
    const base64String = fileBuffer.toString("base64");
    req.body.bgImage = base64String;
    fs.rmSync(`../uploads/${req.file.filename}`);
  }
  const { pollId } = req.params;
  const { question, options, name, description, bgImage, username } = req.body;
  let updateObj = { question, options, name, description, bgImage };
  try {
    Object.fromEntries(
      Object.entries(updateObj).filter(([key, value]) => value != undefined)
    );
    // check if poll is created by user
    const poll = await pollModel.findById(pollId).exec();
    if (poll.createdUsername !== username) {
      return res.status(404).json({ message: "Unauthorized" });
    }
    await responseModel.deleteMany({ pollId }).exec();
    await poll.updateOne(updateObj).exec();
    res.json({ message: "Poll updated successfully" });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
});

router.delete("/:pollId", async (req, res) => {
  // delete a poll
  const { pollId } = req.params;
  const { username } = req.headers;
  try {
    // check if poll is created by user
    const poll = await pollModel.findById(pollId).exec();
    if (poll.createdUsername != username) {
      return res.status(404).json({ message: "Unauthorized" });
    }
    await pollModel.findByIdAndDelete(pollId).exec();
    await responseModel.deleteMany({pollId})
    res.json({ message: "Poll deleted successfully" });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
});

module.exports = router;
