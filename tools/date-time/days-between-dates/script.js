function calculateDays() {

  const startValue =
    document.getElementById("startDate").value;

  const endValue =
    document.getElementById("endDate").value;

  const result =
    document.getElementById("result");

  if (!startValue || !endValue) {

    result.textContent =
      "Please select both dates.";

    return;
  }

  const startDate = new Date(startValue);
  const endDate = new Date(endValue);

  const difference =
    Math.abs(endDate - startDate);

  const days =
    Math.floor(
      difference / (1000 * 60 * 60 * 24)
    );

  result.innerHTML =
    `<strong>${days}</strong> day${days !== 1 ? "s" : ""} between the selected dates.`;
}