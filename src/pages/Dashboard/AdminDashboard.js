import { Divider, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import CardPage from "../CardPage";
import BarChart from "../BarChart";
import DonutChart from "../DonutChart";

const initialData = [
  { name: "TOTAL CAMERAS", amount: 78950 },
  { name: "TOTAL SUMMARY", amount: 82029 },
  { name: "TOTAL PROJECTS", amount: 1123 },
  { name: "TOTAL SUMMARY", amount: 101901 },
];

function AdminDashboard() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Divider sx={{ mb: 2 }} />
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={3}>
          {initialData.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} sx={{ p: 1 }}>
              <CardPage item={item} />
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid item xs={12} md={6} sx={{ mb: 3 }}>
        <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
          <BarChart />
        </Paper>
      </Grid>

      <Grid item xs={12} md={6} sx={{ mb: 3 }}>
        <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
          <DonutChart />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default AdminDashboard;
