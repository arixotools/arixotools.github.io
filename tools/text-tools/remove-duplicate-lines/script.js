ARIXO.tool({ live: true, compute(v) {
  const src = v.txt || "";
  if (!src.trim()) return null;
  let lines = src.split(/\r?\n/);
  const total = lines.length;
  if (v.tr) lines = lines.map((l) => l.trim());
  if (v.ne) lines = lines.filter((l) => l !== "");
  const seen = new Set(); const out = [];
  for (const l of lines) { const k = v.ic ? l.toLowerCase() : l; if (!seen.has(k)) { seen.add(k); out.push(l); } }
  const removed = lines.length - out.length;
  return { text: out.join("\n"), rows: 8, stats: total + " lines in, " + out.length + " unique lines out, " + removed + " duplicate" + (removed === 1 ? "" : "s") + " removed." };
}});