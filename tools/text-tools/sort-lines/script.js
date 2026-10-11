ARIXO.tool({ live: true, compute(v) {
  const src = v.txt || "";
  if (!src.trim()) return null;
  let lines = src.split(/\r?\n/);
  if (v.ne) lines = lines.filter((l) => l.trim() !== "");
  const key = (s) => (v.ic ? s.toLowerCase() : s);
  const cmp = (a, b) => key(a).localeCompare(key(b), undefined, { numeric: false, sensitivity: v.ic ? "base" : "variant" });
  const num = (s) => { const n = parseFloat(s.replace(/,/g, "")); return isNaN(n) ? null : n; };
  if (v.order === "az") lines.sort(cmp);
  else if (v.order === "za") lines.sort((a, b) => cmp(b, a));
  else if (v.order === "lenA") lines.sort((a, b) => a.length - b.length || cmp(a, b));
  else if (v.order === "lenD") lines.sort((a, b) => b.length - a.length || cmp(a, b));
  else if (v.order === "numA" || v.order === "numD") {
    const d = v.order === "numA" ? 1 : -1;
    lines.sort((a, b) => { const x = num(a), y = num(b); if (x === null && y === null) return cmp(a, b); if (x === null) return 1; if (y === null) return -1; return (x - y) * d; });
  } else lines.reverse();
  return { text: lines.join("\n"), rows: 8, stats: lines.length + " lines sorted." };
}});