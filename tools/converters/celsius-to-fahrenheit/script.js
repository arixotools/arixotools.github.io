ARIXO.tool({ compute(v) {
  if (v.value === null) return { error: "Enter a temperature." };
  let c;
  if (v.unit === "c") c = v.value; else if (v.unit === "f") c = (v.value - 32) * 5 / 9; else c = v.value - 273.15;
  if (c < -273.15) return { error: "That is below absolute zero (-273.15 °C)." };
  const f = c * 9 / 5 + 32, k = c + 273.15;
  const r = (n) => parseFloat(n.toFixed(2)).toString();
  const names = { c: r(c) + " °C", f: r(f) + " °F", k: r(k) + " K" };
  const src = names[v.unit];
  const others = ["c", "f", "k"].filter((x) => x !== v.unit);
  return { main: [src + " equals", names[others[0]]], items: [[others[0] === "c" ? "Celsius" : others[0] === "f" ? "Fahrenheit" : "Kelvin", names[others[0]]], [others[1] === "c" ? "Celsius" : others[1] === "f" ? "Fahrenheit" : "Kelvin", names[others[1]]]] };
}});