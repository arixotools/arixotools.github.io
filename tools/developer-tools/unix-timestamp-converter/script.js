ARIXO.tool({ compute(v) {
  const pad = (n) => String(n).padStart(2, "0");
  const utc = (d) => d.getUTCFullYear() + "-" + pad(d.getUTCMonth() + 1) + "-" + pad(d.getUTCDate()) + " " + pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes()) + ":" + pad(d.getUTCSeconds()) + " UTC";
  if (v.ts !== null) {
    const ms = Math.abs(v.ts) >= 1e11 ? v.ts : v.ts * 1000;
    const d = new Date(ms);
    if (isNaN(d.getTime())) return { error: "That timestamp is out of range." };
    const local = typeof d.toLocaleString === "function" ? d.toLocaleString("en-GB", { dateStyle: "full", timeStyle: "medium" }) : "";
    return { main: ["Date and time (UTC)", utc(d)], items: [["ISO 8601", d.toISOString()], ["Your local time", local], ["Detected as", Math.abs(v.ts) >= 1e11 ? "Milliseconds" : "Seconds"]] };
  }
  const s = (v.dt || "").trim();
  if (!s) return { error: "Enter a Unix timestamp, or a date and time in UTC." };
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2})(?::(\d{2}))?)?$/);
  if (!m) return { error: "Use the format YYYY-MM-DD HH:MM:SS, for example 2023-11-14 22:13:20." };
  const t = Date.UTC(+m[1], +m[2] - 1, +m[3], +(m[4] || 0), +(m[5] || 0), +(m[6] || 0));
  return { main: ["Unix timestamp (seconds)", String(Math.floor(t / 1000))], items: [["Milliseconds", String(t)], ["ISO 8601", new Date(t).toISOString()]] };
}});