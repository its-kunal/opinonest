import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export const useMyProfile = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    axiosInstance.get("/poll/user/profile").then((v) => {
      setUser(v.data.user);
    });
  }, []);
  return user
};
