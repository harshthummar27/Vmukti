import React, { useState, useRef } from "react";
import { Dialog, DialogContent, IconButton, Tooltip } from "@mui/material";
import HlsPlayer from "../Dashboard/HlsPlayer";
import CloseIcon from "@mui/icons-material/Close";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

function DialogBox({ open, onClose, videoUrl, isDarkMode }) {
  const [screenshotMode, setScreenshotMode] = useState(false);
  const contentRef = useRef(null); // Reference to the DialogContent for screenshot

  const toggleScreenshotMode = () => {
    setScreenshotMode(!screenshotMode);
  };

  const handleTakeScreenshot = () => {
    if (contentRef.current) {
      // Use html2canvas library or any other method to take a screenshot
      // For demonstration, let's log a message indicating a screenshot would be taken
      console.log("Taking screenshot of the dialog content...");
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
        <DialogContent
          ref={contentRef}
          sx={{
            position: "relative",
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
          {videoUrl && (
            <HlsPlayer
              src={videoUrl}
              autoPlay={true}
              controls={true}
              width="100%"
              height="100%"
              style={{
                flexGrow: 1,
              }}
            />
          )}

          {screenshotMode && (
            <Tooltip title="Take Screenshot">
              <IconButton
                onClick={handleTakeScreenshot}
                sx={{
                  position: "absolute",
                  bottom: 10,
                  right: 10,
                  color: isDarkMode ? "#fff" : "#333",
                }}
              >
                <PhotoCameraIcon />
              </IconButton>
            </Tooltip>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DialogBox;
