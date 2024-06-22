import React from "react";
import { Grid } from "@mui/material";
import ViewCard from "./ViewCard";

function DefaultView({ handleprop }) {
  return (
    <Grid container spacing={8} paddingTop={6}>
      {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, index) => (
        <Grid
          item
          key={index}
          xs={12}
          sm={handleprop ? 12 : 6}
          md={handleprop ? 6 : 4}
          lg={handleprop ? 4 : 3}
        >
          <ViewCard />
        </Grid>
      ))}
    </Grid>
  );
}

export default DefaultView;
