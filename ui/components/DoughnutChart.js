import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DoughnutChart = ({ healthStats }) => {
  const labels = healthStats.map((e) => e._id);
  const data = healthStats.map((e) => e.count);
  return (
    <div>
      <Doughnut
        width={100}
        height={250}
        data={{
          labels: labels,
          datasets: [
            {
              label: "count",
              data: data,
              backgroundColor: [
                "rgb(252, 48, 72)",
                "rgb(48, 252, 102)",
                "rgb(255, 205, 86)",
              ],
              hoverOffset: 4,
              borderWidth: 3,
              tension: 0.4,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            legend: {
              labels: {
                // This more specific font property overrides the global property
                font: {
                  family: "inherit",
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default DoughnutChart;
