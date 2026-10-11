ARIXO.tool({ compute(v) {
  if (v.value === null) return { error: "Enter a distance to convert." };
  if (v.value < 0) return { error: "Distance cannot be negative." };
  const M = 1.609344;
  const km = v.dir === "km" ? v.value : v.value * M;
  const mi = km / M;
  const f = (n, d) => parseFloat(n.toFixed(d)).toLocaleString("en-US", { maximumFractionDigits: d });
  const main = v.dir === "km" ? [f(v.value, 4) + " km equals", f(mi, 4) + " miles"] : [f(v.value, 4) + " miles equals", f(km, 4) + " km"];
  return { main, items: [["Meters", f(km * 1000, 1)], ["Feet", f(mi * 5280, 0)], ["Yards", f(mi * 1760, 0)]] };
}});