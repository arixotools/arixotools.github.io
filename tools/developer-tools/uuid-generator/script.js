ARIXO.tool({ compute(v) {
  const n = v.count === null ? 1 : Math.round(v.count);
  if (n < 1 || n > 100) return { error: "Choose from 1 to 100 UUIDs." };
  const gen = () => {
    if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
    const b = new Uint8Array(16); crypto.getRandomValues(b);
    b[6] = (b[6] & 15) | 64; b[8] = (b[8] & 63) | 128;
    const h = Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
    return h.slice(0, 8) + "-" + h.slice(8, 12) + "-" + h.slice(12, 16) + "-" + h.slice(16, 20) + "-" + h.slice(20);
  };
  const out = [];
  for (let i = 0; i < n; i++) {
    let u = gen();
    if (v.fmt === "nohy") u = u.replace(/-/g, "");
    if (v.fmt === "braces") u = "{" + u + "}";
    if (v.up) u = u.toUpperCase();
    out.push(u);
  }
  return { text: out.join("\n"), rows: Math.min(10, n + 1), stats: n + " UUID" + (n === 1 ? "" : "s") + " generated (version 4)." };
}});