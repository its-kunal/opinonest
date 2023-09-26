import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export const useMyPoll = () => {
  const [polls, setPolls] = useState(null);
  useEffect(() => {
    axiosInstance.get("/poll/user/create").then((v) => {
      setPolls(v.data.polls);
    });
  }, []);
  return polls;
};
