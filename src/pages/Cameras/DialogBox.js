import React, { useRef, useState } from "react";
import { Dialog, DialogContent, IconButton, Tooltip, Box } from "@mui/material";
import HlsPlayer from "../Dashboard/HlsPlayer"; // Adjust the path as per your project structure
import CloseIcon from "@mui/icons-material/Close";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import html2canvas from "html2canvas";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import SendIcon from "@mui/icons-material/Send";
import TimelineIcon from "@mui/icons-material/Timeline";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

function DialogBox({ open, onClose, videoUrl, isDarkMode }) {
  const contentRef = useRef(null);
  const playerRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const [isRecording, setIsRecording] = useState(false);

  const handleTakeScreenshot = async () => {
    if (contentRef.current) {
      try {
        const canvas = await html2canvas(contentRef.current, {
          useCORS: true, // Enable cross-origin image loading if needed
        });
        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imgData;
        link.download = "screenshot.png";
        link.click();
      } catch (error) {
        console.error("Error taking screenshot:", error);
      }
    }
  };

  const handleStartRecording = () => {
    const videoElement = playerRef.current.getVideoElement();
    const stream = videoElement.captureStream();
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunksRef.current.push(event.data);
      }
    };
    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
      recordedChunksRef.current = [];
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "recording.webm";
      link.click();
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: isDarkMode ? "#1e1e1e" : "#fff",
        }}
      >
        <DialogContent
          ref={contentRef}
          sx={{
            width: "100%",
            padding: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: isDarkMode ? "#1e1e1e" : "#fff",
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              color: isDarkMode ? "#fff" : "#333",
            }}
          >
            <CloseIcon />
          </IconButton>

          <HlsPlayer
            ref={playerRef}
            src={videoUrl}
            autoPlay={false}
            controls={true}
            width="100%"
            height="100%"
            style={{
              flexGrow: 1,
            }}
          />
        </DialogContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            padding: 2,
            backgroundColor: isDarkMode ? "#1e1e1e" : "#fff",
          }}
        >
          <Tooltip title={"Next"}>
            <IconButton
              sx={{
                color: isDarkMode ? "#fff" : "#333",
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Take Screenshot">
            <IconButton
              onClick={handleTakeScreenshot}
              sx={{
                color: isDarkMode ? "#fff" : "#333",
              }}
            >
              <PhotoCameraIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title={isRecording ? "Stop Recording" : "Start Recording"}>
            <IconButton
              onClick={isRecording ? stopRecording : handleStartRecording}
              sx={{
                color: isDarkMode ? "#fff" : "#333",
              }}
            >
              {isRecording ? (
                <StopCircleIcon sx={{ color: "red" }} />
              ) : (
                <RadioButtonCheckedIcon sx={{ color: "red" }} />
              )}
            </IconButton>
          </Tooltip>

          <Tooltip title={"Share"}>
            <IconButton
              sx={{
                color: isDarkMode ? "#fff" : "#333",
              }}
            >
              <SendIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title={"Next"}>
            <IconButton
              sx={{
                color: isDarkMode ? "#fff" : "#333",
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title={"TimeLine"}>
            <IconButton
              sx={{
                color: isDarkMode ? "#fff" : "#333",
              }}
            >
              <TimelineIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Dialog>
  );
}

export default DialogBox;
