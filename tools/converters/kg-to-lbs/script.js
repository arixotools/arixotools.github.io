ARIXO.tool({ compute(v) {
  if (v.value === null) return { error: "Enter a weight to convert." };
  if (v.value < 0) return { error: "Weight cannot be negative." };
  const F = 2.20462262185;
  const kg = v.dir === "kg" ? v.value : v.value / F;
  const lb = kg * F;
  const f = (n, d) => parseFloat(n.toFixed(d)).toLocaleString("en-US", { maximumFractionDigits: d });
  const main = v.dir === "kg" ? [f(v.value, 4) + " kg equals", f(lb, 2) + " lb"] : [f(v.value, 4) + " lb equals", f(kg, 2) + " kg"];
  return { main, items: [["Grams", f(kg * 1000, 1)], ["Ounces", f(lb * 16, 2)], ["Stone", f(lb / 14, 3)], ["Pounds", f(lb, 3)]] };
}});