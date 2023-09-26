import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function PollCard({ poll }) {
  const handleDelete = () => {
    axiosInstance.delete("/poll/" + poll._id).then((res) => {
      window.location.reload();
    });
  };
  return (
    <Card
      variant="outlined"
      sx={{
        width: 250,
      }}
    >
      {poll.bgImage ? (
        <CardMedia
          alt={poll.name}
          component="img"
          image={"data:image/svg+xml;base64, " + poll.bgImage}
          sx={{
            height: 100,
            objectFit: "contain",
          }}
        />
      ) : (
        <CardMedia
          sx={{
            height: 100,
            objectFit: "contain",
          }}
        >
          <Avatar
            variant="square"
            sx={{
              height: 100,
              width: "100%",
              bgcolor: "primary",
              fontSize: 20,
            }}
          >
            {poll.name}
          </Avatar>
        </CardMedia>
      )}
      <CardContent>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 1,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
          }}
        >
          {poll.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 3,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
          }}
        >
          {poll.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/poll/${poll._id}`}>
          <Button size="small">Know More</Button>
        </Link>
        <Button size="small" onClick={handleDelete}  color="error">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
