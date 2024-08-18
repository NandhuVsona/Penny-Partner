const ctx = document.getElementById("myChart");

new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: " of Votes",
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 0,
        hoverOffset: 50,
      },
    ],
  },
  options: {
    animation: false, // Disable animation
  },
});
