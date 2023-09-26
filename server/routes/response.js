const { Router } = require("express");
const responseModel = require("../models/response.js");
const pollModel = require("../models/poll.js");
const { verifyMiddleware } = require("../controllers/user");
const { default: mongoose } = require("mongoose");

const router = Router();
router.use(verifyMiddleware);

router.post("/", async (req, res) => {
  const { pollId, response } = req.body;
  const { username } = req.headers;
  let Obj = { pollId, username, response };
  try {
    let prevResponse = await responseModel.findOne({ pollId, username });
    if (prevResponse !== null)
      return res.status(404).json({ message: "Response already exists" });
    Obj = Object.fromEntries(
      Object.entries(Obj).filter(([key, value]) => value != undefined)
    );
    const poll = await pollModel.findById(pollId);
    if (poll.endsAt < Date.now()) {
      return res.status(404).json({ message: "Poll has ended" });
    }
    Obj = { ...Obj, question: poll.question };
    await responseModel.create(Obj);
    res.json({ message: "Response Created Successfully" });
  } catch (error) {
    return res.status(404).json({ message: "Cannot submit response" });
  }
});

router.get("/", async (req, res) => {
  const { pollId } = req.query;
  try {
    let response = await responseModel
      .aggregate([
        {
          $match: { pollId: new mongoose.Types.ObjectId(pollId) },
        },
        {
          $group: {
            _id: "$response",
            count: { $sum: 1 },
          },
        },
      ])
      .exec();
    response = response.map((v) => {
      return { ...v, response: v._id, _id: 0 };
    });
    // console.log(response);
    res.json({ response: response });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "Invalid Credentials", err });
  }
});

module.exports = router;
