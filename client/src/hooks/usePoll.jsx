import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useEffect, useState } from "react";

export const usePoll = () => {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  useEffect(()=>{
    axiosInstance.get(`/poll/${pollId}`).then((res) => {
        setPoll(res.data.poll);
      });
  },[])
  return poll;
};
