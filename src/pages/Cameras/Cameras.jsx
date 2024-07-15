import React, { useState, useEffect } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import GridViewIcon from "@mui/icons-material/GridView";
import {
  Box,
  Typography,
  Divider,
  IconButton,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import HlsPlayer from "../Dashboard/HlsPlayer";
import Pagination from "@mui/material/Pagination";
import DialogBox from "./DialogBox"; // Import DialogBox component

function Cameras() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [pageSize, setPageSize] = useState(40);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null); // State for selected video URL
  const totalVideos = 200; // Total number of videos
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [gridTemplateColumns, setGridTemplateColumns] =
    useState("repeat(8, 1fr)"); // Default layout for 40 videos per page
  const [gridTemplateRows, setGridTemplateRows] = useState("repeat(5, auto)"); // Default layout for 40 videos per page
  const [mobileGridTemplateColumns, setMobileGridTemplateColumns] =
    useState("repeat(4, 1fr)");
  const [mobileGridTemplateRows, setMobileGridTemplateRows] =
    useState("repeat(10, 1fr)");

  useEffect(() => {
    // Simulate a loading delay
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the delay as needed
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePlayerSelect = (num) => {
    setLoading(true);
    switch (num) {
      case 40:
        if (isMobile) {
          setMobileGridTemplateColumns("repeat(4, 1fr)");
          setMobileGridTemplateRows("repeat(10, auto)");
        } else {
          setGridTemplateColumns("repeat(8, 1fr)");
          setGridTemplateRows("repeat(5, auto)");
        }
        setPageSize(num);
        break;
      case 84:
        if (isMobile) {
          setMobileGridTemplateColumns("repeat(6, 1fr)");
          setMobileGridTemplateRows("repeat(14, auto)");
        } else {
          setGridTemplateColumns("repeat(12, 1fr)");
          setGridTemplateRows("repeat(7, auto)");
        }
        setPageSize(num);
        break;
      case 104:
        if (isMobile) {
          setMobileGridTemplateColumns("repeat(7, 1fr)");
          setMobileGridTemplateRows("repeat(12, auto)");
        } else {
          setGridTemplateColumns("repeat(13, 1fr)");
          setGridTemplateRows("repeat(8, auto)");
        }
        setPageSize(num);
        break;
      default:
        if (isMobile) {
          setMobileGridTemplateColumns("repeat(4, 1fr)");
          setMobileGridTemplateRows("repeat(10, auto)");
        } else {
          setGridTemplateColumns("repeat(8, 1fr)");
          setGridTemplateRows("repeat(5, auto)");
        }
    }
    setCurrentPage(1); // Reset to first page when changing page size
    setAnchorEl(null);

    // Simulate a loading delay when changing the number of videos
    setTimeout(() => {
      setLoading(false);
    }, 500); // Adjust the delay as needed
  };

  const handlePaginationChange = (event, value) => {
    setLoading(true);
    setCurrentPage(value);

    // Simulate a loading delay when changing the page
    setTimeout(() => {
      setLoading(false);
    }, 500); // Adjust the delay as needed
  };

  // Calculate which videos to display based on pagination
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalVideos);

  // Handle click on video
  const handleVideoClick = (videoUrl) => {
    setSelectedVideo(videoUrl); // Set selected video URL
  };

  return (
    <Box
      sx={{
        height: "auto",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        padding: "2px",
        backgroundColor: isDarkMode ? "#121212" : "#f5f5f5",
        ...(isMobile && {
          padding: "8px",
          marginTop: 4,
        }),
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 2,
          marginTop: "2px",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: isDarkMode ? "#fff" : "#333" }}
        >
          Cameras
        </Typography>
        <IconButton onClick={handleClick}>
          <GridViewIcon sx={{ color: isDarkMode ? "#fff" : "#333" }} />
        </IconButton>
      </Box>
      <Divider
        sx={{ marginBottom: 2, backgroundColor: isDarkMode ? "#fff" : "#333" }}
      />

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? mobileGridTemplateColumns
                  : gridTemplateColumns,
                gridTemplateRows: isMobile
                  ? mobileGridTemplateRows
                  : gridTemplateRows,
                gap: isMobile ? "0.25rem" : "0.5rem",
                overflowY: "auto",
                padding: 1,
                backgroundColor: isDarkMode ? "#1e1e1e" : "#fff",
                borderRadius: 2,
                boxShadow: "0 2px 2px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Render HLS players based on selected number and pagination */}
              {Array.from({ length: endIndex - startIndex }, (_, index) => (
                <Box
                  key={startIndex + index}
                  sx={{
                    borderRadius: 1,
                    overflow: "hidden",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
                    padding: 0, // Ensure no padding around the video
                    margin: 0, // Ensure no margin around the video
                    display: "flex", // Make sure the container uses flex display
                    ...(isMobile && {
                      margin: "0.25rem 0",
                    }),
                  }}
                  onClick={() =>
                    handleVideoClick(
                      "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8"
                    )
                  }
                >
                  <HlsPlayer
                    src={
                      "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8"
                    }
                    autoPlay={false}
                    muted
                    width="100%"
                    height="auto"
                    style={{
                      display: "flex", // Ensure the video uses flex display
                      flexGrow: 1, // Make the video grow to occupy available space
                      margin: 0, // Ensure no margin around the video
                    }}
                  />
                </Box>
              ))}
            </Box>

            {/* Pagination control */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 1,
                paddingBottom: 1,
                backgroundColor: isDarkMode ? "#1e1e1e" : "#fff",
              }}
            >
              <Pagination
                count={Math.ceil(totalVideos / pageSize)}
                page={currentPage}
                onChange={handlePaginationChange}
                color="primary"
              />
            </Box>
          </>
        )}
      </Box>

      {/* Menu for selecting number of videos per page */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handlePlayerSelect(40)}>40</MenuItem>
        <MenuItem onClick={() => handlePlayerSelect(84)}>84</MenuItem>
        <MenuItem onClick={() => handlePlayerSelect(104)}>104</MenuItem>
      </Menu>

      {/* DialogBox for displaying selected video */}
      <DialogBox
        open={Boolean(selectedVideo)}
        onClose={() => setSelectedVideo(null)}
        videoUrl={selectedVideo}
        isDarkMode={isDarkMode}
      />
    </Box>
  );
}

export default Cameras;
