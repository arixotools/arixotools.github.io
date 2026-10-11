ARIXO.tool({ compute(v) {
  if (v.amount === null || v.rate === null || v.years === null) return { error: "Enter the amount, expected return and number of years." };
  if (v.amount <= 0 || v.years <= 0 || v.rate < 0) return { error: "Use a positive amount and period, and a return of 0% or more." };
  if (v.rate > 50 || v.years > 60) return { error: "Use a return up to 50% and a period up to 60 years." };
  const inr = (n) => "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fv = v.amount * Math.pow(1 + v.rate / 100, v.years);
  const rows = [];
  const whole = Math.min(Math.floor(v.years), 40);
  for (let y = 1; y <= whole; y++) rows.push([y, inr(v.amount * Math.pow(1 + v.rate / 100, y))]);
  return { main: ["Estimated value", inr(fv)], items: [["Amount invested", inr(v.amount)], ["Estimated gain", inr(fv - v.amount)]], table: { head: ["Year", "Value"], rows } };
}});