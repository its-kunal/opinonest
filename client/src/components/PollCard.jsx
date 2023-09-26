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
export default function PollCard({ poll }) {
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
      </CardActions>
    </Card>
  );
}

/*
export default function PollCard() {
  return (
    <Card
      variant="outlined"
      sx={{
        width: 250,
      }}
    >
      <CardMedia
        alt={"Poll Name"}
        component="img"
        image={
          "data:image/svg+xml;base64, " +
          "PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDIwMDEwOTA0Ly9FTiIKICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4wIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiB3aWR0aD0iNTEyLjAwMDAwMHB0IiBoZWlnaHQ9IjUxMi4wMDAwMDBwdCIgdmlld0JveD0iMCAwIDUxMi4wMDAwMDAgNTEyLjAwMDAwMCIKIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiPgo8bWV0YWRhdGE+CkNyZWF0ZWQgYnkgcG90cmFjZSAxLjE2LCB3cml0dGVuIGJ5IFBldGVyIFNlbGluZ2VyIDIwMDEtMjAxOQo8L21ldGFkYXRhPgo8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAwMDAwMCw1MTIuMDAwMDAwKSBzY2FsZSgwLjEwMDAwMCwtMC4xMDAwMDApIgpmaWxsPSIjMDAwMDAwIiBzdHJva2U9Im5vbmUiPgo8cGF0aCBkPSJNMTk2MiAzODc5IGMtNzIgLTM2IC0xMDkgLTExMiAtOTkgLTIwNyAxMSAtMTA1IDg3IC0xNzIgMTk2IC0xNzIKMTA3IDAgMTc4IDcxIDE4OCAxODcgNyA4MCAtMzIgMTU2IC05NiAxOTAgLTU3IDMwIC0xMzAgMzEgLTE4OSAyeiIvPgo8cGF0aCBkPSJNMzA3NCAzODcxIGMtMTIxIC0zMCAtMTg4IC0xNzEgLTEzNSAtMjg2IDIzIC01MiA4MSAtMTAyIDEyNiAtMTExCjEzOSAtMjYgMjQ1IDYxIDI0NSAxOTkgMCA2OSAtMTIgMTAzIC01MiAxNDQgLTQ0IDQ1IC0xMjQgNjggLTE4NCA1NHoiLz4KPHBhdGggZD0iTTIwNzAgMjAxOCBjLTI2IC00NCAtMzMgLTgxIC0yNSAtMTM2IDkgLTU5IDUyIC0xMDYgODcgLTk0IDU2IDIwIDc5CjE2MiAzOCAyMzAgLTI4IDQ1IC03MiA0NSAtMTAwIDB6Ii8+CjxwYXRoIGQ9Ik0yOTQxIDIwMDQgYy0yOCAtMzYgLTM0IC02MyAtMjkgLTEzNSAzIC00OCAxMCAtNjUgMzEgLTg2IDIzIC0yMyAyOQotMjUgNTEgLTE1IDQzIDE5IDYxIDU5IDYxIDEzMyAwIDUzIC01IDc0IC0yMSA5NiAtMjkgMzkgLTY2IDQxIC05MyA3eiIvPgo8cGF0aCBkPSJNMTYwNCAxNDEzIGMtMzUgLTcgLTU5IC00MCAtNTkgLTg1IDAgLTMyIDYgLTQ1IDI5IC02NSA1NiAtNDcgMTM2Ci0xMCAxMzYgNjMgMCA1NSAtNTEgOTcgLTEwNiA4N3oiLz4KPHBhdGggZD0iTTMzNTkgMTM0MSBjLTM2IC0zNiAtMzggLTc5IC02IC0xMTYgNDcgLTU1IDE0NyAtMjAgMTQ3IDUwIDAgODQgLTgzCjEyMyAtMTQxIDY2eiIvPgo8cGF0aCBkPSJNMjE4MiA3MzcgYzYgLTcwIDMxIC0xMzMgNzQgLTE4MiAxNCAtMTYgMjMgLTI1IDE5IC0xOCAtOSAxOSA2NSA5NAoxMjAgMTE5IDY5IDMzIDE2MSAzMyAyMzAgMCA1NCAtMjQgMTM5IC0xMTAgMTI5IC0xMzAgLTMgLTYgOSA1IDI2IDI0IDQ0IDUwCjczIDExNiA3OCAxNzYgbDQgNTIgLTYzIDYgYy0zNSAzIC0xOTAgOCAtMzQzIDEyIGwtMjc5IDYgNSAtNjV6Ii8+CjwvZz4KPC9zdmc+Cg=="
        }
        sx={{
          height: 100,
          objectFit: "contain",
        }}
      />
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Poll Name
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
          Some quick example text to build on the card title and make up the
          bulk of the card content.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Know More</Button>
      </CardActions>
    </Card>
  );
}
*/
