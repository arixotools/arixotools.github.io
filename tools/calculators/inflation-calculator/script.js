ARIXO.tool({ compute(v) {
  if (v.amount === null || v.rate === null || v.years === null) return { error: "Enter the amount, inflation rate and number of years." };
  if (v.amount <= 0 || v.years <= 0 || v.rate < 0) return { error: "Use a positive amount and period, and an inflation rate of 0% or more." };
  if (v.rate > 50 || v.years > 80) return { error: "Use an inflation rate up to 50% and up to 80 years." };
  const g = Math.pow(1 + v.rate / 100, v.years);
  const inr = (n) => "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return { main: ["Same goods will cost", inr(v.amount * g)], items: [["Value of " + inr(v.amount) + " in today's terms", inr(v.amount / g)], ["Total price rise", ((g - 1) * 100).toFixed(1) + "%"]] };
}});