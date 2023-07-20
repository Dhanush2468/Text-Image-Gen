import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";

const Form = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  const onGenerate = () => {
    if (prompt) {
      setImage("");
      setLoading(true);
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiY2FhZjZmNGEtNmE3OC00ZjIzLWFlNDEtYzMwZmJmMWUwOGY5IiwidHlwZSI6ImFwaV90b2tlbiJ9.QpSWLOt81Inv3INF0AmTv2BWgaRv9nlPv0upSPrVRks";
      const encodedToken = encodeURIComponent(token);
      const options = {
        method: "POST",
        url: "https://api.edenai.run/v2/image/generation",
        headers: {
          authorization: `Bearer ${encodedToken}`,
        },
        data: {
          providers: "openai",
          text: prompt,
          resolution: "512x512",
        },
      };

      axios
        .request(options)
        .then((response) => {
          console.log("yes");
          console.log(response.data.openai.items[0].image_resource_url);
          setImage(response.data.openai.items[0].image_resource_url);
          setLoading(false);
          setPrompt("");
        })
        .catch((error) => {
          console.lo("no");
          console.error(error);
          setLoading(false);
        });
    }
  };
  return (
    <Stack pt={12} mx={{ xs: 2, md: 15 }} alignItems="center" >
      <Typography variant="h6" color="white" sx={{ mb: 4 }}>
        Generate an AI Image
      </Typography>
      <Stack
        direction={{ xs: "column", md: "row" }}
        gap={2}
        alignItems="center"
        width="100%"
      >
        <TextField
          placeholder="Enter text to generate an image"
          value={prompt !== "" ? prompt : transcript}
          multiline
          onChange={(event) => setPrompt(event.target.value)}
          variant="outlined"
          InputLabelProps={{
            sx: { color: "white" }, // Sets the label color to white
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {listening ? (
                  <MicIcon
                    onClick={() => {
                      SpeechRecognition.stopListening();
                      setPrompt(transcript);
                      resetTranscript();
                    }}
                    sx={{ color: "#7856f5", fontSize: 30, cursor: "pointer" }}
                  />
                ) : (
                  <MicOffIcon
                    onClick={() => {
                      SpeechRecognition.startListening({ continuous: true });
                      resetTranscript();
                      setPrompt("");
                    }}
                    sx={{ color: "white", fontSize: 30, cursor: "pointer" }}
                  />
                )}
              </InputAdornment>
            ),
            sx: {
              color: "white", // Sets the text color to white
              "& .MuiOutlinedInput-notchedOutline": {
                borderWidth: 0.5,
                borderColor: "#792aa8", // Sets the outline border color to white
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderWidth: 0.5,
                borderColor: "#792aa8", // Sets the outline border color on hover
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderWidth: 0.5,
                borderColor: "#792aa8", // Sets the outline border color when focused
              },
            },
          }}
          sx={{
            width: "100%",
            "& .MuiInputBase-input": {
              color: "white", // Sets the input text color to white
            },
            "& .MuiInputBase-input::placeholder": {
              color: "white", // Sets the placeholder color to white
            },
          }}
        />
        {loading ? (
          <div className="lds-hourglass"></div>
        ) : (
          <Button
            variant="contained"
            onClick={onGenerate}
            sx={{
              backgroundColor: "#8d2ac9",
              "&:hover": {
                backgroundColor: "#792aa8",
              },
              textTransform: "capitalize",
              paddingY: 1.8,
            }}
          >
            <Typography color="white">Generate</Typography>
          </Button>
        )}
      </Stack>
      {image && (
        <Box
          component="img"
          src={image}
          my={4}
          sx={{ height: "40%", width: { xs: "90%", md: "40%" } }}
        />
      )}
      {image && (
        <Button
          variant="contained"
          onClick={() => {
            const link = document.createElement("a");
            link.href = image;
            link.download = "image";
            link.click();
          }}
          sx={{
            backgroundColor: "#8d2ac9",
            "&:hover": {
              backgroundColor: "#792aa8",
            },
            textTransform: "capitalize",
            paddingY: 1.8,
            paddingX: 10,
            marginBottom: 4,
          }}
        >
          <Typography color="white">Download</Typography>
        </Button>
      )}
    </Stack>
  );
};

export default Form;
