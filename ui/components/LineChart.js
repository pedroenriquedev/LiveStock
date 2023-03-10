import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import styles from "../styles/LineChart.module.css";

const LineChart = ({ weightLog }) => {
  const getChartLabelDate = (dateStr) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const date = new Date(dateStr);

    const year = date.getFullYear().toString().slice(-2);

    const month = monthNames[date.getMonth()];

    return `${month} ${year}`;
  };

  const labels = weightLog.map((log) => getChartLabelDate(log.date));
  const weightArr = weightLog.map((log) => log.weight);
  return (
    <div className={styles.chart}>
      <Line
        width={100}
        height={250}
        data={{
          labels: labels,
          datasets: [
            {
              label: "Weight",
              data: weightArr,
              backgroundColor: "rgb(255, 226, 80)",
              borderColor: "rgb(255, 226, 80)",
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

export default LineChart;
