import React from "react";
import { Grid, Typography } from "@mui/material";
import ViewCard from "../Dashboard/ViewCard";

function Favourite({ items, onFavoriteToggle }) {
  return (
    <Grid container spacing={8} paddingTop={6}>
      <Grid item xs={12}>
        <Typography variant="h4">Most Viewed</Typography>
      </Grid>
      {items.map((item, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
          <ViewCard item={item} onFavoriteToggle={onFavoriteToggle} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Favourite;
