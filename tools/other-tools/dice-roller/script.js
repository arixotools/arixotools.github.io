ARIXO.tool({ compute(v) {
  const n = v.count === null ? 1 : Math.round(v.count);
  if (n < 1 || n > 20) return { error: "Roll from 1 to 20 dice." };
  const s = parseInt(v.sides, 10);
  const rnd = (k) => { if (typeof crypto !== "undefined" && crypto.getRandomValues) { const a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] % k; } return Math.floor(Math.random() * k); };
  const rolls = []; let sum = 0;
  for (let i = 0; i < n; i++) { const r = rnd(s) + 1; rolls.push(r); sum += r; }
  return { main: ["Total", String(sum)], items: [["Rolls", rolls.join(", ")], ["Dice", n + " × d" + s], ["Average", (sum / n).toFixed(2)]], stats: "Range possible: " + n + " to " + (n * s) + "." };
}});