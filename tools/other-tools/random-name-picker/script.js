ARIXO.tool({ compute(v) {
  let names = (v.names || "").split(/\r?\n/).map((x) => x.trim()).filter(Boolean);
  if (v.dup === "remove") names = Array.from(new Set(names));
  if (!names.length) return { error: "Add at least one name, one per line." };
  const n = v.count === null ? 1 : Math.round(v.count);
  if (n < 1) return { error: "Choose at least 1 winner." };
  if (n > names.length) return { error: "You asked for " + n + " winners but the list has only " + names.length + " entries." };
  const rnd = (k) => { if (typeof crypto !== "undefined" && crypto.getRandomValues) { const a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] % k; } return Math.floor(Math.random() * k); };
  const pool = names.slice(); const win = [];
  for (let i = 0; i < n; i++) { win.push(pool.splice(rnd(pool.length), 1)[0]); }
  return { main: [n === 1 ? "Winner" : "Winners", win.join(", ")], items: [["Entries in the draw", String(names.length)], ["Winners picked", String(n)]], stats: "Each winner is removed from the pool before the next pick, so nobody is picked twice." };
}});