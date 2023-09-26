import { useState, useEffect } from "react";
import {
  Box,
  Divider,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Avatar,
} from "@mui/material";
import { useAppContext } from "../hooks/useAppContext";
import { useParams } from "react-router-dom";
import { usePoll } from "../hooks/usePoll";
import Loader from "../components/Loader";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import dayjs from "dayjs";
import axiosInstance from "../api/axiosInstance";
import ChartDisplay from "../components/ChartDisplay";

export default function Poll() {
  const [value, setValue] = useState("");
  const poll = usePoll();
  const { setMessage, setError } = useAppContext();
  // status of poll - true `active`, false `closed`, null `undefined`
  const [pollStatus, setPollStatus] = useState(null);
  const { pollId } = useParams();
  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    if (poll) {
      if (new Date(poll.endsAt) < new Date(Date.now())) {
        setPollStatus(false);
      } else {
        setPollStatus(true);
      }
    }
  }, [poll]);

  useEffect(() => {
    if (pollStatus == false) {
      axiosInstance
        .get(`/response`, {
          params: {
            pollId,
          },
        })
        .then((res) => {
          // console.log(res);
          setResponseData(res.data.response);
        });
    }
  }, [pollStatus, pollId]);

  if (poll == null) {
    // TODO : Add Skeleton
    return <Loader />;
  }

  // Response Submit Handler
  const submitHandler = (e) => {
    e.preventDefault();
    if (value === "") {
      setError("Please select an option");
      return;
    }
    axiosInstance
      .post("/response", {
        pollId,
        response: value,
      })
      .then((v) => {
        setMessage(v.data.message);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  return (
    <Box>
      <Typography variant="h5" component={"h2"}>
        Welcome to OpinioNest, a place to share your opinions
      </Typography>
      <Divider sx={{ my: 3 }} />
      {poll.bgImage ? (
        <img
          src={"data:image/svg+xml;base64, " + poll.bgImage}
          className="h-56 border border-gray-300 rounded my-3 object-contain max-w-md mx-auto md:mx-0"
        />
      ) : (
        <Avatar
          variant="square"
          sx={{ height: "14rem", width: "14rem", borderRadius: 1 }}
        >
          {poll.name}
        </Avatar>
      )}

      <Divider sx={{ my: 3 }} />

      <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 1 }}>
        <Box
          sx={{
            bgcolor: pollStatus ? `green` : `red`,
            height: 20,
            width: 20,
            borderRadius: 5,
          }}
        ></Box>
        <Box>
          <Typography variant="body">
            {pollStatus ? "Active" : "Closed"}
          </Typography>
        </Box>
      </Box>

      <Typography variant="h4" component={"h1"} sx={{ mb: 1 }}>
        {poll.name}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "GrayText", width: { md: "40%" }, mb: 2 }}
      >
        {poll.description}
      </Typography>

      <Box>
        <PersonIcon sx={{ mr: 1 }}></PersonIcon>

        <Typography variant="body2" component={"span"}>
          <Typography variant="body2" component={"span"} sx={{ color: "grey" }}>
            Created by-
          </Typography>{" "}
          {poll.createdUsername}
        </Typography>
      </Box>
      {/* Starts At */}
      <Box>
        <AccessTimeIcon color="success" sx={{ mr: 1 }} />
        <Typography variant="body2" component={"span"} sx={{ color: "grey" }}>
          Starts At-
        </Typography>{" "}
        <Typography variant="body2" component={"span"}>
          {dayjs(poll.createdAt).format("hh:mm, A, DD/MM/YYYY")}
        </Typography>
      </Box>
      {/* Ends At */}
      <Box>
        <AccessTimeIcon color="error" sx={{ mr: 1 }} />
        <Typography variant="body2" component={"span"} sx={{ color: "grey" }}>
          Ends At-
        </Typography>{" "}
        <Typography variant="body2" component={"span"}>
          {dayjs(poll.endsAt).format("hh:mm, A, DD/MM/YYYY")}
        </Typography>
      </Box>
      <Divider sx={{ my: 3 }} />

      {/* response form */}
      {pollStatus ? (
        <form onSubmit={submitHandler}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            {poll.question}
          </Typography>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={value}
              name="radio-buttons-group"
            >
              {poll.options.map((v, idx) => {
                return (
                  <FormControlLabel
                    key={idx}
                    value={v}
                    onClick={() => {
                      setValue(v);
                    }}
                    control={<Radio />}
                    label={v.toUpperCase()}
                  />
                );
              })}
            </RadioGroup>
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Button
                variant="contained"
                onClick={() => {
                  setValue("");
                }}
              >
                Reset
              </Button>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Box>
          </FormControl>
        </form>
      ) : (
        <Box>
          {/* respones result */}
          {/* Question */}

          <Typography>Poll Results</Typography>
          <Typography sx={{ md: 1 }}>
            <Typography color={"grey"} component="span" sx={{ mr: 0.5 }}>
              Question -
            </Typography>

            {poll.question}
          </Typography>
          {responseData ? (
            // (
            //   <>
            //     {/* <Typography color="gray" variant="h6" sx={{ fontSize: 14 }}>
            //       Responses
            //     </Typography> */}
            //     <Divider sx={{ my: 2 }} />
            //     <Box
            //       sx={{
            //         display: "grid",
            //         gridTemplateColumns: " 1fr 1fr",
            //         gap: 1,
            //         maxWidth: "300px",
            //       }}
            //     >
            //       <Typography component="span">Responses</Typography>
            //       <Typography component="span">Count</Typography>
            //       {responseData.map((v, idx) => {
            //         return (
            //           <>
            //             <Typography
            //               sx={{
            //                 color: "grey",
            //                 overflow: "hidden",
            //                 textOverflow: "ellipsis",
            //                 WebkitLineClamp: 1,
            //                 display: "-webkit-box",
            //                 WebkitBoxOrient: "vertical",
            //               }}
            //             >
            //               {v.response}
            //             </Typography>
            //             <Typography sx={{ color: "grey" }}>{v.count}</Typography>
            //           </>
            //         );
            //         // [v.response, v.count].map((va) => {
            //         //   return <Typography component="span" key={va}>{va}</Typography>;
            //         // });
            //       })}
            //     </Box>
            //   </>
            // )
            <Box sx={{ height: "100", display: "flex", maxWidth: 500 }}>
              <ChartDisplay props={responseData} />
            </Box>
          ) : (
            <Typography sx={{ color: "grey", mt: 1, fontSize: 14 }}>
              No Responses Found
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}

// <ChartDisplay props={responseData}/>
