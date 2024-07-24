import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  styled,
  useTheme,
  Box,
} from "@mui/material";
import HlsPlayer from "./HlsPlayer";
import StarIcon from "@mui/icons-material/Star";

const StyledCard = styled(Card)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.15)",
  backdropFilter: "blur(5px)",
  WebkitBackdropFilter: "blur(5px)",
  border: "0.1px solid rgba(255, 255, 255, 0.2)",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.2)",
  borderRadius: "10px",
  overflow: "hidden",
  padding: "10px",
  position: "static",
  transition: "0.3s ease-in-out",
  "&:hover": {
    boxShadow: `0 4px 8px ${theme.palette.primary.main}, 0 20px 40px rgba(0, 0, 0, 0.3)`,
  },
}));

function ViewCard({ item, onFavoriteToggle }) {
  const theme = useTheme();
  const [isRed, setIsRed] = useState(item.fav === 1);

  const handleClick = () => {
    setIsRed((prev) => !prev);
    onFavoriteToggle(item.id);
  };

  return (
    <div style={{ width: "100%", maxWidth: "400px" }}>
      <StyledCard>
        <CardMedia
          sx={{
            borderRadius: "5px",
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
        </CardMedia>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body1">{item.name}</Typography>
            <IconButton
              sx={{
                border: 0,
                borderRadius: "50%",
                width: "1.5rem",
                height: "1.5rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1rem",
                transition: "0.25s ease",
                cursor: "pointer",
                color: isRed ? "#EC4646" : theme.palette.text.primary,
              }}
              onClick={handleClick}
            >
              <StarIcon />
            </IconButton>
          </Box>
        </CardContent>
      </StyledCard>
    </div>
  );
}

export default ViewCard;
