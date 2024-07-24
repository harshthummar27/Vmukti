import React from "react";
import { Card, CardContent, Typography, Avatar } from "@mui/material";

const CardPage = ({ item }) => (
  <Card
    sx={{
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      p: 2,
      boxShadow: 3,
      borderRadius: 2,
      backgroundColor: "background.paper",
    }}
  >
    <CardContent sx={{ flex: 1 }}>
      <Typography
        variant="h6"
        sx={{
          letterSpacing: "1px",
          mb: 0.5,
          color: "text.secondary",
        }}
      >
        {item.name}
      </Typography>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          mb: 1,
          color: "text.primary",
        }}
      >
        {item.amount}
      </Typography>
    </CardContent>
    <Avatar
      sx={{
        backgroundColor: "primary.main",
        color: "common.white",
        width: 56,
        height: 56,
        fontSize: "1.5rem",
      }}
    >
      $
    </Avatar>
  </Card>
);

export default CardPage;
