import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Pagination,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import GridViewIcon from "@mui/icons-material/GridView";
import HlsPlayer from "../Dashboard/HlsPlayer";
import DialogBox from "./DialogBox";

function MultipleCamera() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [pageSize, setPageSize] = useState(40);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null); // State for selected video URL
  const totalVideos = 300; // Total number of videos
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [gridTemplateColumns, setGridTemplateColumns] =
    useState("repeat(8, 1fr)");
  const [gridTemplateRows, setGridTemplateRows] = useState("repeat(5, auto)");
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
          setMobileGridTemplateRows("repeat(10, 1fr)");
        } else {
          setGridTemplateColumns("repeat(8, 1fr)");
          setGridTemplateRows("repeat(5, auto)");
        }
        setPageSize(num);
        break;
      case 84:
        if (isMobile) {
          setMobileGridTemplateColumns("repeat(6, 1fr)");
          setMobileGridTemplateRows("repeat(14, 1fr)");
        } else {
          setGridTemplateColumns("repeat(12, 1fr)");
          setGridTemplateRows("repeat(7, auto)");
        }
        setPageSize(num);
        break;
      case 104:
        if (isMobile) {
          setMobileGridTemplateColumns("repeat(7, 1fr)");
          setMobileGridTemplateRows("repeat(12, 1fr)");
        } else {
          setGridTemplateColumns("repeat(13, 1fr)");
          setGridTemplateRows("repeat(8, auto)");
        }
        setPageSize(num);
        break;
      default:
        if (isMobile) {
          setMobileGridTemplateColumns("repeat(4, 1fr)");
          setMobileGridTemplateRows("repeat(10, 1fr)");
        } else {
          setGridTemplateColumns("repeat(8, 1fr)");
          setGridTemplateRows("repeat(5, auto)");
        }
    }
    setCurrentPage(1); // Reset to first page when changing page size

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
      className={`h-auto overflow-hidden flex flex-col p-2 ${
        isDarkMode ? "bg-[#121212]" : "bg-[#f5f5f5]"
      } ${isMobile ? "p-8 mt-4" : ""}`}
    >
      <Box
        className={`flex items-center justify-between mb-2 p-3 ${
          isDarkMode ? "bg-[#1e1e1e]" : "bg-white"
        } rounded shadow-md h-[7vh]`}
      >
        <Typography
          variant="h5"
          className={`font-bold ${isDarkMode ? "text-white" : "text-[#333]"}`}
        >
          Cameras
        </Typography>
        <IconButton onClick={handleClick}>
          <GridViewIcon sx={{ color: isDarkMode ? "#fff" : "#333" }} />
        </IconButton>
      </Box>

      <div
        id="playGround"
        className={`grid gap-2 overflow-y-auto p-1 ${
          isDarkMode ? "bg-[#1e1e1e]" : "bg-white"
        } rounded shadow flex-grow m-1 align-start ${
          isMobile ? mobileGridTemplateColumns : gridTemplateColumns
        } ${isMobile ? mobileGridTemplateRows : gridTemplateRows}`}
        style={{
          gridTemplateColumns: isMobile
            ? mobileGridTemplateColumns
            : gridTemplateColumns,
          gridTemplateRows: isMobile
            ? mobileGridTemplateRows
            : gridTemplateRows,
        }}
      >
        {Array.from({ length: endIndex - startIndex }, (_, index) => (
          <div
            // key={index}
            key={startIndex + index}
            className={`grid grid-col justify-center text-center m-0 rounded shadow-sm p-1 relative overflow-hidden ${
              isMobile ? "my-1" : ""
            }`}
            onClick={() =>
              handleVideoClick(
                "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8"
              )
            }
          >
            <HlsPlayer
              src="https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8"
              width="100%"
              autoPlay={false}
              muted
              controls={false}
              style={{
                objectFit: "cover",
                height: "100%",
                maxHeight: "100%",
              }}
            />
          </div>
        ))}
      </div>

      <Box
        className={`flex items-center justify-center text-2xl my-2 py-2 ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <Pagination
          count={Math.ceil(totalVideos / pageSize)}
          page={currentPage}
          onChange={handlePaginationChange}
          color="primary"
        />
      </Box>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {[40, 84, 104].map((item) => (
          <MenuItem key={item} onClick={() => handlePlayerSelect(item)}>
            {item}
          </MenuItem>
        ))}
      </Menu>

      <DialogBox
        open={Boolean(selectedVideo)}
        onClose={() => setSelectedVideo(null)}
        videoUrl={selectedVideo}
        isDarkMode={isDarkMode}
      />
    </Box>
  );
}

export default MultipleCamera;
