import axiosInstance from "../api/axiosInstance";
import { useEffect, useState } from "react";

export const useClosedPolls = () => {
  const [activePolls, setPolls] = useState(null);
  useEffect(() => {
    axiosInstance.get("/poll/closed").then((res) => {
      setPolls(res.data.polls);
    });
  }, []);
  return activePolls;
};
