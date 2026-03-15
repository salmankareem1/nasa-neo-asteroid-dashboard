export const getChartOptions = (isDarkMode) => ({
  responsive: true,
  maintainAspectRatio: false,

  interaction: {
    mode: "index",
    intersect: false,
  },

  plugins: {
    legend: {
      position: "top",
      labels: {
        color: isDarkMode ? "#ffffff" : "#1f2933",
        font: {
          size: 13,
          family: "Inter, Arial, sans-serif",
          weight: "600",
        },
      },
    },

    tooltip: {
      backgroundColor: isDarkMode ? "#2f2f2f" : "#ffffff",
      titleColor: isDarkMode ? "#ffffff" : "#111827",
      bodyColor: isDarkMode ? "#e5e7eb" : "#374151",
      borderColor: isDarkMode ? "#444" : "#e5e7eb",
      borderWidth: 1,
      padding: 10,
    },
  },

  scales: {
    x: {
      ticks: {
        color: isDarkMode ? "#e5e7eb" : "#374151",
        maxRotation: 40,
        minRotation: 40,
      },
      grid: {
        color: isDarkMode
          ? "rgba(255,255,255,0.08)"
          : "rgba(0,0,0,0.06)",
      },
    },

    y: {
      ticks: {
        color: isDarkMode ? "#e5e7eb" : "#374151",
      },
      grid: {
        color: isDarkMode
          ? "rgba(255,255,255,0.08)"
          : "rgba(0,0,0,0.06)",
      },
    },
  },
});