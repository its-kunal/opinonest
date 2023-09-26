import mongoose from "mongoose";
import ResponseModel from "../models/response.js";

export const countVotes = async () => {
  await ResponseModel.aggregate([
    {
      $group: {
        _id: "$pollId",
        count: { $sum: 1 },
      },
    },
  ]).exec();
};
