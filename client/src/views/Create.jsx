import {
  Box,
  Typography,
  Divider,
  FormControl,
  FormLabel,
  FormGroup,
  TextField,
  OutlinedInput,
  IconButton,
  InputLabel,
  Button,
  FormHelperText,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext";
import axiosInstance from "../api/axiosInstance";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function Create() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [question, setQuestion] = useState("");
  const [nOptions, setNOptions] = useState(["", ""]);
  const [createdAt, setCreatedAt] = useState(null);
  const [endsAt, setEndsAt] = useState(null);
  const [bgImage, setBgImage] = useState(null);

  const navigate = useNavigate();
  const { error, setError, setMessage } = useAppContext();

  return (
    <Box>
      <Typography variant="h5" component={"h1"}>
        Create Your OpinioNest Poll
      </Typography>
      <Divider sx={{ my: 3 }}></Divider>
      <form
        className="flex flex-col gap-y-4 md:w-2/5 "
        onSubmit={async (e) => {
          e.preventDefault();
          await axiosInstance
            .post(
              "/poll",
              {
                name,
                description,
                question,
                options: nOptions,
                createdAt,
                endsAt,
                bgImage,
              },
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            )
            .then((v) => {
              navigate("/");
            })
            .catch((err) => {
              setError(err.response.data.message);
            });
        }}
      >
        <FormGroup>
          <TextField
            label="Name"
            placeholder="Enter Name For Your Poll"
            required
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></TextField>
        </FormGroup>
        <FormGroup>
          <TextField
            label="Description"
            placeholder="Enter Description For Your Poll"
            multiline
            rows={5}
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></TextField>
        </FormGroup>
        <FormGroup>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload Background Image
            <VisuallyHiddenInput
              type="file"
              name="bgImage"
              onChange={(e) => {
                if (
                  e.target.files[0].name.split(".")[1].toLowerCase() != "svg"
                ) {
                  setError("Select only svg files");
                } else {
                  setBgImage(e.target.files[0]);
                }
              }}
            />
          </Button>
          <FormHelperText>Please upload svg files only.</FormHelperText>
        </FormGroup>
        <FormGroup>
          <TextField
            required
            label="Question"
            placeholder="Enter Question For Your Poll"
            name="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          ></TextField>
        </FormGroup>
        {nOptions.map((v, idx) => {
          return (
            <FormGroup key={idx}>
              <OutlinedInput
                required
                id={`option-${idx}`}
                placeholder={`Enter Option ${idx + 1}`}
                value={v}
                name={`option-${idx}`}
                onChange={(e) => {
                  setNOptions((prevOps) => {
                    return prevOps.map((v, i) => {
                      if (i === idx) {
                        return e.target.value;
                      }
                      return v;
                    });
                  });
                }}
                endAdornment={
                  <IconButton
                    onClick={(e) => {
                      setNOptions((prevOps) => {
                        return prevOps.filter((v, i) => i !== idx);
                      });
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              ></OutlinedInput>
            </FormGroup>
          );
        })}
        {/* add option */}
        <FormGroup>
          <OutlinedInput
            label={`Option ${nOptions.length + 1}`}
            placeholder={`Enter Option ${nOptions.length + 1}`}
            sx={{
              opacity: "50%",
            }}
            onClick={(e) => {
              setNOptions((prevOps) => {
                return [...prevOps, ""];
              });
            }}
            value={""}
            onChange={(e) => {
              setNOptions((prevOps) => {
                return [...prevOps, ""];
              });
            }}
            endAdornment={
              <IconButton>
                <AddIcon />
              </IconButton>
            }
          ></OutlinedInput>
        </FormGroup>
        {/* start date */}
        <FormGroup>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Start Date"
              name="createdAt"
              value={createdAt}
              onChange={(e) => {
                setCreatedAt(e.$d);
              }}
            />
          </LocalizationProvider>
        </FormGroup>
        {/* end date */}
        <FormGroup>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="End Date"
              name="endsAt"
              value={endsAt}
              onChange={(v) => {
                setEndsAt(v.$d);
              }}
            />
          </LocalizationProvider>
        </FormGroup>
        <FormGroup>
          <Button
            variant="contained"
            sx={{
              width: "min-content",
            }}
            type="submit"
          >
            Submit
          </Button>
        </FormGroup>
      </form>
    </Box>
  );
}
