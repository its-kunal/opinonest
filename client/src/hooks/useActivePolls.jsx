import axiosInstance from "../api/axiosInstance";
import { useState, useEffect } from "react";

export const useActivePolls = () => {
  const [activePolls, setPolls] = useState(null);
  useEffect(() => {
    axiosInstance.get("/poll").then((res) => {
      setPolls(res.data.polls);
    });
  }, []);
  return activePolls;
};
