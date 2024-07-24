import React, { useState, useEffect, useRef } from "react";

import {
  Box,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import HlsPlayer from "../Dashboard/HlsPlayer";
import Pagination from "@mui/material/Pagination";
import DialogBox from "./DialogBox"; // Import DialogBox component
import FullscreenIcon from "@mui/icons-material/Fullscreen";

function Cameras() {
  const [selectedCoach, setSelectedCoach] = useState(null);

  const [isFullscreen, setIsFullscreen] = useState(false); // State for fullscreen mode
  const totalVideos = 300; // Total number of videos
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const videoContainerRef = useRef(null); // Ref for the video container

  // Handle fullscreen toggle
  const handleFullscreenToggle = () => {
    if (!document.fullscreenElement) {
      videoContainerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleCoachSelect = (coachNumber) => {
    setSelectedCoach(coachNumber);
  };
  return (
    <Box
      className={`h-full flex flex-col ${
        isDarkMode ? "bg-[#121212]" : "bg-[#f5f5f5]"
      } ${isMobile ? "p-2" : "p-3"}`}
    >
      {/* Camera header */}
      <Box
        className={`flex items-center justify-between mb-2 p-3 ${
          isDarkMode ? "bg-[#1e1e1e]" : "bg-white"
        } rounded shadow`}
      >
        <Typography
          variant="h5"
          className={`${
            isDarkMode ? "text-white" : "text-gray-900"
          } font-semibold`}
        >
          Cameras
        </Typography>

        <Button onClick={handleFullscreenToggle}>
          <FullscreenIcon sx={{ color: isDarkMode ? "#fff" : "#333" }} />
        </Button>
      </Box>

      <Divider className={`mt-3 ${isDarkMode ? "bg-white" : "bg-gray-900"}`} />

      <Box className="flex flex-wrap gap-3 mt-3">
        <Typography
          variant="h6"
          className={`${isDarkMode ? "text-white" : "text-gray-900"} font-bold`}
        >
          Select Coach:
        </Typography>
        <Box className="mt-2 flex flex-wrap gap-1 align-center">
          {Array.from({ length: 24 }, (_, i) => i + 1).map((coachNumber) => (
            <Button
              key={coachNumber}
              onClick={() => handleCoachSelect(coachNumber)}
              sx={{ margin: "4px 4px" }}
              variant={selectedCoach === coachNumber ? "contained" : "text"}
            >
              Coach {coachNumber}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Video container */}
      <Box
        ref={videoContainerRef}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 mt-10 pt-4 h-auto"
      >
        {Array.from({ length: 8 }, (_, index) => (
          <Box
            key={index}
            sx={{
              cursor: "pointer",
              width: "100%",
              height: "100%",
              margin: 0,
              padding: 0,
            }}
          >
            <HlsPlayer
              key={index}
              src={"https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"}
              autoPlay={true}
              muted
              width="100%"
              height="100%" // Ensure it takes full height
              style={{
                objectFit: "cover",
                margin: 0, // Remove margin
                padding: 0, // Remove padding
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Cameras;
