import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Skeleton,
} from "@mui/material";

export default function PollCardSkeleton() {
  return (
    <Card
      variant="outlined"
      sx={{
        width: 250,
      }}
    >
      <CardMedia
        alt={"Poll Name"}
        component="div"
        sx={{
          height: 100,
          objectFit: "cover",
        }}
      >
        <Skeleton height={100} variant="rectangular" />
      </CardMedia>
      <CardContent>
        <Skeleton variant="text" height={20} width="80%" />
        <Skeleton variant="text" height={50} />
      </CardContent>
      <CardActions>
        <Skeleton variant="rounded" height={40} width="50%" />
      </CardActions>
    </Card>
  );
}
