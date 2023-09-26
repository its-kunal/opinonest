import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export const useMyResponses = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    axiosInstance.get("/poll/user").then((v) => {
      setPolls(v.data.polls);
    });
  }, []);
  return polls;
};
