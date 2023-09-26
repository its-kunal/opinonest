import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import { Suspense, lazy } from "react";
const PollCard = lazy(() => import("../components/PollCard"));
import PollCardSkeleton from "../components/PollCardSkeleton";
const MyPollCard = lazy(() => import("../components/MyPollCard"));
import { useMyPoll } from "../hooks/useMyPoll";

export default function MyPolls() {
  const myPolls = useMyPoll();
  const exCards = Array(10).fill("");
  return (
    <Box sx={{}}>
      <Typography variant="h5" component={"h1"}>
        Welcome to OpinioNest, a place to share your opinions
      </Typography>
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6">My Polls</Typography>
      <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 2 }}>
        {myPolls
          ? myPolls.map((v, idx) => {
              return <MyPollCard poll={v} key={idx} />;
            })
          : exCards.map((v, idx) => {
              return <PollCardSkeleton key={idx} />;
            })}
      </Box>
    </Box>
  );
}
