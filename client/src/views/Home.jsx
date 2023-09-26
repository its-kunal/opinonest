import { Box, Divider, Typography } from "@mui/material";
import { Suspense, lazy } from "react";
const PollCard = lazy(() => import("../components/PollCard"));
import PollCardSkeleton from "../components/PollCardSkeleton";
import { useActivePolls } from "../hooks/useActivePolls";
import { useClosedPolls } from "../hooks/useClosedPolls";

// check if excards work properly for the home page

export default function Home() {
  const exCards = Array(10).fill("");
  const activePolls = useActivePolls();
  const closedPolls = useClosedPolls([]);
  return (
    <Box sx={{}}>
      <Typography variant="h5" component={"h1"}>
        Welcome to OpinioNest, a place to share your opinions
      </Typography>
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6">Active Polls</Typography>
      <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 2 }}>
        {activePolls !== null
          ? activePolls.map((v, idx) => {
              return <PollCard poll={v} idx={idx} key={idx} />;
            })
          : exCards.map((v, idx) => {
              return <PollCardSkeleton key={idx} />;
            })}
        {activePolls && activePolls.length == 0 ? (
          <Typography>No active polls</Typography>
        ) : null}
      </Box>
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6">Closed Polls</Typography>
      <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 2 }}>
        {closedPolls !== null
          ? closedPolls.map((v, idx) => {
              return <PollCard poll={v} key={idx} />;
            })
          : exCards.map((v, idx) => {
              return <PollCardSkeleton key={idx} />;
            })}
        {closedPolls && closedPolls.length == 0 ? (
          <Typography>No closed polls</Typography>
        ) : null}
      </Box>
    </Box>
  );
}
