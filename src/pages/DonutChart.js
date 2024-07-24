import React from "react";
import Chart from "react-apexcharts";
import { Box } from "@mui/material";

function DonutChart() {
  const options = {
    chart: {
      type: "donut",
    },
    labels: ["Category A", "Category B", "Category C", "Category D"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const series = [44, 55, 13, 33];

  return (
    <Box sx={{ width: "100%", maxWidth: 500, mx: "auto" }}>
      <Chart
        options={options}
        series={series}
        type="donut"
        width="100%"
        height="300"
      />
    </Box>
  );
}

export default DonutChart;
