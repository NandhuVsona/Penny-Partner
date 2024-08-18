const ctx = document.getElementById("myChart");

new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"], // X-axis labels
  datasets: [
    {
        label: "Number of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 1)",  // Red
          "rgba(54, 162, 235, 1)",  // Blue
          "rgba(255, 206, 86, 1)",  // Yellow
          "rgba(75, 192, 192, 1)",  // Green
          "rgba(153, 102, 255, 1)", // Purple
          "rgba(255, 159, 64, 1)"   // Orange
        ],
        hoverOffset: 10,
      },
    ],
  },
  options: {
    scales: {
      x: {
        display: true,  // Show X axis
        grid: {
          display: false,  // Hide vertical grid lines
        },
        ticks: {
          color: [
            "rgba(255, 99, 132, 1)",  // Red
            "rgba(54, 162, 235, 1)",  // Blue
            "rgba(255, 206, 86, 1)",  // Yellow
            "rgba(75, 192, 192, 1)",  // Green
            "rgba(153, 102, 255, 1)", // Purple
            "rgba(255, 159, 64, 1)"   // Orange
          ]
        },
      },
      y: {
        display: false,  // Hide Y axis
      },
    },
    plugins: {
      legend: {
        display: false,  // Hide the legend
      },
    },
    animation: false,  // Disable animation
  },
});
