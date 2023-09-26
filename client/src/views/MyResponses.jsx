import { Box, Divider, Typography } from "@mui/material";
import { Suspense, lazy } from "react";
const PollCard = lazy(() => import("../components/PollCard"));
import PollCardSkeleton from "../components/PollCardSkeleton";

import { useMyResponses } from "../hooks/useMyResponses";
export default function MyResponses() {
  const participatedPolls = useMyResponses();
  return (
    <Box sx={{}}>
      <Typography variant="h5" component={"h1"}>
        Welcome to OpinioNest, a place to share your opinions
      </Typography>
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6">Participated Polls</Typography>
      <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 2 }}>
        {participatedPolls.map((v, idx) => {
          return (
            <Suspense key={idx} fallback={<PollCardSkeleton />}>
              <PollCard poll={v} idx={idx} />
            </Suspense>
          );
        })}
      </Box>
    </Box>
  );
}
