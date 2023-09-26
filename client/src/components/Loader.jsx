import { Box, CircularProgress } from "@mui/material";
import NestSvg from "../assets/nest.svg";

export default function Loader() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <CircularProgress /> */}
      <img src={NestSvg} alt="" className="h-20 w-20 animate-pulse" />
    </Box>
  );
}
