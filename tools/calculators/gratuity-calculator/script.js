ARIXO.tool({ compute(v) {
  if (v.salary === null || v.years === null) return { error: "Enter the last drawn salary and years of service." };
  if (v.salary <= 0 || v.years < 0) return { error: "Enter a positive salary and a valid number of years." };
  const months = v.months === null ? 0 : v.months;
  if (months < 0 || months > 11) return { error: "Extra months must be from 0 to 11." };
  const eff = v.years + (months >= 6 ? 1 : 0);
  const g = v.salary * 15 * eff / 26;
  const inr = (n) => "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const items = [["Service counted", eff + " years"], ["Monthly salary used", inr(v.salary)]];
  let note = v.years + (months / 12) < 5 ? "Service is under 5 years. Gratuity is normally payable only after 5 years, except in cases such as death or disability." : "";
  return { main: ["Estimated gratuity", inr(g)], items, stats: note };
}});