ARIXO.tool({ init(inputs) {
  const d = inputs.find((i) => i.id === "start");
  if (d && !d.value) { const n = new Date(); d.value = n.getFullYear() + "-" + String(n.getMonth() + 1).padStart(2, "0") + "-" + String(n.getDate()).padStart(2, "0"); }
 },
 compute(v) {
  if (!v.start) return { error: "Choose a start date." };
  if (v.amount === null || !Number.isInteger(v.amount) || v.amount < 0) return { error: "Enter a whole number of 0 or more." };
  const p = v.start.split("-").map(Number);
  const sign = v.op === "add" ? 1 : -1;
  let y = p[0], m = p[1] - 1, d = p[2];
  if (v.unit === "d" || v.unit === "w") {
    const t = Date.UTC(y, m, d) + sign * v.amount * (v.unit === "w" ? 7 : 1) * 86400000;
    const r = new Date(t); y = r.getUTCFullYear(); m = r.getUTCMonth(); d = r.getUTCDate();
  } else {
    const months = v.unit === "m" ? v.amount : v.amount * 12;
    const total = y * 12 + m + sign * months;
    y = Math.floor(total / 12); m = total - y * 12;
    const last = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
    d = Math.min(d, last);
  }
  const res = new Date(Date.UTC(y, m, d));
  if (res.getUTCFullYear() < 1 || res.getUTCFullYear() > 9999) return { error: "The result is outside the supported date range." };
  const text = res.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  const wk = res.toLocaleDateString("en-GB", { weekday: "long", timeZone: "UTC" });
  const iso = res.getUTCFullYear() + "-" + String(res.getUTCMonth() + 1).padStart(2, "0") + "-" + String(res.getUTCDate()).padStart(2, "0");
  return { main: ["Resulting date", text], items: [["Day of the week", wk], ["Date (YYYY-MM-DD)", iso]] };
}});