import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
  Filler,
} from "chart.js";
import { getChartOptions } from "./chartOptions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AsteroidCharts = ({ neoData, isDarkMode }) => {
  if (!neoData || neoData.length === 0) {
    return <p className="loading">No data available for visualization.</p>;
  }

  const chartOptions = getChartOptions(isDarkMode);
  const pieChartOptions = {
  ...chartOptions,
  scales: undefined,
};

  const topLargestAsteroids = [...neoData]
    .sort(
      (a, b) =>
        b.estimated_diameter.kilometers.estimated_diameter_max -
        a.estimated_diameter.kilometers.estimated_diameter_max
    )
    .slice(0, 10);

  const sizeChartData = {
    labels: topLargestAsteroids.map((asteroid) => asteroid.name),
    datasets: [
      {
        label: "Maximum Diameter (km)",
        data: topLargestAsteroids.map(
          (asteroid) =>
            asteroid.estimated_diameter.kilometers.estimated_diameter_max
        ),
        backgroundColor: isDarkMode
          ? "rgba(75, 192, 192, 0.7)"
          : "rgba(255, 159, 64, 0.7)",
        borderColor: isDarkMode
          ? "rgba(75, 192, 192, 1)"
          : "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  const dateCount = neoData.reduce((acc, asteroid) => {
    const approachDate = asteroid.close_approach_data?.[0]?.close_approach_date;

    if (approachDate) {
      acc[approachDate] = (acc[approachDate] || 0) + 1;
    }

    return acc;
  }, {});

  const lineChartData = {
    labels: Object.keys(dateCount),
    datasets: [
      {
        label: "Number of Close Approaches",
        data: Object.values(dateCount),
        backgroundColor: isDarkMode
          ? "rgba(255, 99, 132, 0.25)"
          : "rgba(54, 162, 235, 0.25)",
        borderColor: isDarkMode
          ? "rgba(255, 99, 132, 1)"
          : "rgba(54, 162, 235, 1)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const hazardousAsteroids = neoData.filter(
    (asteroid) => asteroid.is_potentially_hazardous_asteroid
  ).length;

  const safeAsteroids = neoData.length - hazardousAsteroids;

  const pieChartData = {
    labels: ["Safe Asteroids", "Hazardous Asteroids"],
    datasets: [
      {
        data: [safeAsteroids, hazardousAsteroids],
        backgroundColor: isDarkMode
          ? ["rgba(54, 162, 235, 0.7)", "rgba(255, 99, 132, 0.9)"]
          : ["rgba(255, 206, 86, 0.9)", "rgba(255, 99, 132, 0.9)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <section className="charts-container">
<div className="chart-wrapper">
  <h3>Largest Asteroids in Current Dataset</h3>
  <div className="chart-canvas">
    <Bar data={sizeChartData} options={chartOptions} />
  </div>
</div>
      <div className="chart-wrapper">
        <h3>Close Approaches by Date</h3>
        <div className="chart-canvas">
        <Line data={lineChartData} options={chartOptions} />
        </div>
      </div>

      <div className="chart-wrapper">
        <h3>Hazard Distribution</h3>
        <div className="chart-canvas">
        <Pie data={pieChartData} options={pieChartOptions} />
        </div>
      </div>
    </section>
  );
};

export default AsteroidCharts;