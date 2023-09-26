import {
  Box,
  FormControl,
  TextField,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import { useState, useRef } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext";

export default function Register() {
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const formRef = useRef();
  const navigate = useNavigate();
  const { setError } = useAppContext();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== cnfPassword) {
      setError("Passwords do not match");
      return;
    }
    await axiosInstance
      .post("/user", {
        name: e.target.name.value,
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
      })
      .then((v) => {
        if (v) {
          console.log(v);
          localStorage.setItem("token", v.data.token);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">User Registration</Typography>
        <Link to={"/login"}>
          <Typography variant="body2">Already have an account?</Typography>
        </Link>
      </Box>
      <Divider sx={{ my: 3 }} />
      <form
        className="flex flex-col gap-y-4 md:w-2/5 mx-auto md:mx-0"
        onSubmit={submitHandler}
        ref={formRef}
      >
        {/* name */}
        <FormControl>
          <TextField
            label="Name"
            name="name"
            placeholder="Enter Name"
            required
          ></TextField>
        </FormControl>
        {/* username */}
        <FormControl>
          <TextField
            label="Username"
            placeholder="Enter Username"
            required
            name="username"
            autoComplete="username"
          ></TextField>
        </FormControl>
        {/* email */}
        <FormControl>
          <TextField
            label="Email"
            placeholder="Enter Email"
            name="email"
            type="email"
            required
          ></TextField>
        </FormControl>
        {/* Password */}
        <FormControl>
          <TextField
            label="Password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            autoComplete="password"
            required
          ></TextField>
        </FormControl>
        {/* Confirm Password */}
        <FormControl>
          <TextField
            required
            label="Confirm Password"
            placeholder="Enter Confirm Password"
            value={cnfPassword}
            onChange={(e) => setCnfPassword(e.target.value)}
            color={cnfPassword === password ? "success" : "error"}
            type="password"
          ></TextField>
        </FormControl>
        <Button type="submit" variant="contained" sx={{ width: "min-content" }}>
          Submit
        </Button>
      </form>
    </Box>
  );
}
