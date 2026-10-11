ARIXO.tool({ compute(v) {
  const parts = (v.nums || "").split(/[\s,;]+/).filter(Boolean);
  if (!parts.length) return { error: "Enter at least one number." };
  const a = parts.map(Number);
  if (a.some((x) => !isFinite(x))) return { error: "Only numbers are allowed. Check for stray letters or symbols." };
  const n = a.length, sum = a.reduce((x, y) => x + y, 0), mean = sum / n;
  const s = a.slice().sort((x, y) => x - y);
  const median = n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
  const freq = new Map();
  a.forEach((x) => freq.set(x, (freq.get(x) || 0) + 1));
  const top = Math.max.apply(null, Array.from(freq.values()));
  const modes = Array.from(freq.entries()).filter((e) => e[1] === top).map((e) => e[0]).sort((x, y) => x - y);
  const f = (x) => parseFloat(x.toFixed(6)).toString();
  const modeText = top === 1 && n > 1 ? "No repeated value" : modes.map(f).join(", ");
  return { main: ["Mean (average)", f(mean)], items: [["Median", f(median)], ["Mode", modeText], ["Sum", f(sum)], ["Count", String(n)], ["Minimum", f(s[0])], ["Maximum", f(s[n - 1])], ["Range", f(s[n - 1] - s[0])]] };
}});