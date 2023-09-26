import {
  Box,
  Avatar,
  Input,
  Tooltip,
  IconButton,
  Button,
  Skeleton,
} from "@mui/material";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import CreateIcon from "@mui/icons-material/Create";
import BadgeIcon from "@mui/icons-material/Badge";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { useMyProfile } from "../hooks/useMyProfile";
import axiosInstance from "../api/axiosInstance";
import { useAppContext } from "../hooks/useAppContext";

export default function User() {
  const [imgPath, setImgPath] = useState("");
  const { setMessage } = useAppContext();
  const user = useMyProfile();
  useEffect(() => {
    const avatar = createAvatar(lorelei, {
      seed: user.name,
    });
    avatar.toDataUri().then((v) => {
      setImgPath(v);
    });
  }, [user]);
  const submitHandler = async (e) => {
    e.preventDefault();
    await axiosInstance
      .put("/user", {
        name: e.target.name.value,
        email: e.target.email.value,
      })
      .then((v) => {
        setMessage(v.data.message);
      });
  };
  if (user.username == undefined) {
    return (
      <Box
        sx={{
          display: "flex",
          gap: 5,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Skeleton
          variant="circular"
          height={100}
          width={100}
          sx={{ alignSelf: { sx: "center", md: "start" } }}
        />

        <form className="md:w-2/5 mx-auto md:mx-0 flex flex-col gap-y-4">
          {Array(3)
            .fill(1)
            .map((_v, idx) => (
              <Skeleton variant="rounded" key={idx} />
            ))}

          <Skeleton variant="rounded" height={30} width={100}></Skeleton>
        </form>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        gap: 5,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {/* Avatar Using Dicebear */}
      <Avatar
        sx={{
          width: 100,
          height: 100,
          backgroundColor: "lightgrey",
          alignSelf: { sx: "center", md: "start" },
        }}
        src={imgPath}
      ></Avatar>

      <form
        className="md:w-2/5 mx-auto md:mx-0 flex flex-col gap-y-4"
        onSubmit={submitHandler}
      >
        {/* name */}
        <Input
          startAdornment={
            <Tooltip title="Name">
              <PersonIcon sx={{ mr: 2 }}></PersonIcon>
            </Tooltip>
          }
          endAdornment={
            <IconButton>
              <CreateIcon></CreateIcon>
            </IconButton>
          }
          placeholder="Name"
          fullWidth
          defaultValue={user.name}
          name="name"
        ></Input>
        {/* username */}
        <Input
          startAdornment={
            <Tooltip title="Username">
              <BadgeIcon sx={{ mr: 2 }} />
            </Tooltip>
          }
          endAdornment={
            <IconButton disabled>
              <CreateIcon></CreateIcon>
            </IconButton>
          }
          placeholder="Username"
          fullWidth
          value={user.username}
          name="username"
          disabled
        ></Input>
        {/* email */}
        <Input
          startAdornment={
            <Tooltip title="Email">
              <AlternateEmailIcon sx={{ mr: 2 }} />
            </Tooltip>
          }
          endAdornment={
            <IconButton onClick={(e) => {}}>
              <CreateIcon></CreateIcon>
            </IconButton>
          }
          placeholder="Email"
          fullWidth
          defaultValue={user.email}
          name="email"
        ></Input>
        <Button variant="contained" sx={{ width: "min-content" }} type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
}
