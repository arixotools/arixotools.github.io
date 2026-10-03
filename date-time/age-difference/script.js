function calculateAgeDifference() {

  const firstDateValue =
    document.getElementById("dateOfBirth").value;

  const secondDateValue =
    document.getElementById("secondDate").value;

  const result =
    document.getElementById("result");

  if (!firstDateValue || !secondDateValue) {
    result.textContent =
      "Please select both dates.";

    return;
  }

  let firstDate = new Date(firstDateValue);
  let secondDate = new Date(secondDateValue);

  // Make sure the earlier date comes first
  if (firstDate > secondDate) {
    const temp = firstDate;
    firstDate = secondDate;
    secondDate = temp;
  }

  let years =
    secondDate.getFullYear() -
    firstDate.getFullYear();

  let months =
    secondDate.getMonth() -
    firstDate.getMonth();

  let days =
    secondDate.getDate() -
    firstDate.getDate();

  // Fix negative days
  if (days < 0) {
    months--;

    const previousMonth =
      new Date(
        secondDate.getFullYear(),
        secondDate.getMonth(),
        0
      );

    days += previousMonth.getDate();
  }

  // Fix negative months
  if (months < 0) {
    years--;
    months += 12;
  }

  result.innerHTML =
    `<strong>Difference:</strong><br>
     ${years} year${years !== 1 ? "s" : ""},
     ${months} month${months !== 1 ? "s" : ""},
     ${days} day${days !== 1 ? "s" : ""}`;
}