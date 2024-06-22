import React, { useState } from "react";
import { Grid, styled, useTheme } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import HlsPlayer from "./HlsPlayer";

const StyledCard = styled(Grid)(({ theme }) => ({
  position: "relative",
  textDecoration: "none",
  maxWidth: "350px",
  height: "auto",
  display: "flex",
  padding: "9px",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  borderRadius: "1px",
  boxShadow: "0 0 20px 0 rgba(0,0,0,0.1)",
  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  "&:hover": {
    cursor: "pointer",
    transform: "translateY(-2px)",
    boxShadow: "0 0 11px 0 #345F89 ", // Added hover background color
  },
}));

const FavouriteIcon = styled(Favorite)(({ theme }) => ({
  color: "white",
  fontSize: "18px", // Making the icon smaller
}));

function ViewCard() {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isRed, setIsRed] = useState(false); // State to track if color is red

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    setIsRed((prev) => !prev); // Toggle the state between true and false
    console.log("Clicked on favorite!");
  };

  return (
    <StyledCard className="card">
      <Grid
        className="top"
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
          borderRadius: "6px",
          overflow: "hidden",
        }}
      >
        <HlsPlayer
          src={
            "https://media1.ambicam.com:443/dvr30/6eb06634-127d-445e-8178-8d3c1489892c/12_06_24/6eb06634-127d-445e-8178-8d3c1489892c.m3u8"
          }
          controls={true}
          autoPlay={false}
          muted={true}
          width={"100%"}
          height={"100%"}
        />
        <Grid
          className="favourite"
          sx={{
            position: "absolute",
            top: "8px",
            right: "8px",
            zIndex: "100",
            borderRadius: "50%",
            padding: "5px",
            transition:
              "background-color 0.3s ease-in-out, transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
          onClick={handleClick}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        >
          <FavouriteIcon sx={{ color: isRed ? "red" : "white" }} />
        </Grid>
      </Grid>
      <Grid className="information" sx={{ padding: "18px", width: "100%" }}>
        <Grid className="mainInfo" sx={{ textAlign: "center" }}>
          <Grid
            className="Title"
            sx={{
              fontSize: "16px",
              fontWeight: "bold",
              color: theme.palette.text.primary,
              marginTop: "10px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "100%",
            }}
          >
            CAM 001 - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Grid>
        </Grid>
      </Grid>
    </StyledCard>
  );
}

export default ViewCard;
