ARIXO.tool({ compute(v) {
  if (!v.start || !v.end) return { error: "Enter both a start time and an end time." };
  const tm = (s) => { const p = s.split(":").map(Number); return p[0] * 60 + p[1]; };
  let diff = tm(v.end) - tm(v.start);
  const overnight = diff < 0;
  if (overnight) diff += 1440;
  const brk = v.brk === null ? 0 : v.brk;
  if (brk < 0 || brk > diff) return { error: "The break cannot be longer than the time worked." };
  const net = diff - brk;
  const hm = (m) => Math.floor(m / 60) + " h " + (m % 60) + " min";
  return { main: ["Time worked", hm(net)], items: [["Decimal hours", (net / 60).toFixed(2)], ["Total minutes", String(net)], ["Before break", hm(diff)], ["Overnight shift", overnight ? "Yes, crosses midnight" : "No"]] };
}});