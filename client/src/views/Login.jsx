import {
  Box,
  FormControl,
  TextField,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useAppContext } from "../hooks/useAppContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { error, setError } = useAppContext();
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    axiosInstance
      .get("/user", {
        params: {
          username,
          password,
        },
      })
      .then((res) => {
        if (!res) {
          setError("Invalid Credentials");
        } else {
          localStorage.setItem("token", res.data.token);
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
        <Typography variant="h5">User Login</Typography>
        <Link to={"/register"}>
          <Typography variant="body2"> Create Account</Typography>
        </Link>
      </Box>
      <Divider sx={{ my: 3 }} />
      <form
        className="flex flex-col gap-y-4 md:w-2/5 mx-auto md:mx-0"
        onSubmit={submitHandler}
      >
        {/* username or email */}{" "}
        <FormControl>
          <TextField
            label="Username"
            placeholder="Enter Username"
            name="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          ></TextField>
        </FormControl>
        {/* password */}
        <FormControl>
          <TextField
            label="Password"
            placeholder="Enter Password"
            value={password}
            name="password"
            type="password"
            autoComplete="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          ></TextField>
        </FormControl>
        <Button type="submit" variant="contained" sx={{ width: "min-content" }}>
          Login
        </Button>
      </form>
    </Box>
  );
}
