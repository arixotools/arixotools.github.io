ARIXO.tool({ compute(v) {
  if (v.start === null || v.end === null || v.years === null) return { error: "Enter the initial value, final value and number of years." };
  if (v.start <= 0 || v.end <= 0 || v.years <= 0) return { error: "All three values must be greater than zero." };
  const cagr = (Math.pow(v.end / v.start, 1 / v.years) - 1) * 100;
  const total = (v.end / v.start - 1) * 100;
  const r = (n, d) => parseFloat(n.toFixed(d)).toLocaleString("en-IN", { maximumFractionDigits: d });
  return { main: ["CAGR", r(cagr, 2) + "%"], items: [["Total growth", r(total, 2) + "%"], ["Growth multiple", r(v.end / v.start, 2) + "x"]] };
}});