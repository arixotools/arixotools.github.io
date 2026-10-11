ARIXO.tool({ compute(v) {
  if (v.value === null) return { error: "Enter a value to convert." };
  if (v.value < 0) return { error: "The value cannot be negative." };
  const r = (n) => parseFloat(n.toFixed(2)).toString();
  if (v.mode === "c2p") {
    if (v.value > 10) return { error: "CGPA on a 10-point scale cannot be above 10." };
    return { main: [r(v.value) + " CGPA equals", r(v.value * 9.5) + "%"], items: [["Multiplier used", "9.5"]] };
  }
  if (v.value > 100) return { error: "Percentage cannot be above 100." };
  return { main: [r(v.value) + "% equals", r(v.value / 9.5) + " CGPA"], items: [["Multiplier used", "9.5"]] };
}});