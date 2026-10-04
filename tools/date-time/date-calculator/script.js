function calculateDate() {
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const result = document.getElementById("result");

  if (!startDate || !endDate) {
    result.textContent = "Please select both dates.";
    return;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  const difference = Math.abs(end - start);

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));

  result.textContent = `Difference: ${days} day${days !== 1 ? "s" : ""}`;
}