ARIXO.tool({ compute(v) {
  if (!v.start || !v.end) return { error: "Choose both a start date and an end date." };
  const pd = (s) => { const p = s.split("-").map(Number); return Date.UTC(p[0], p[1] - 1, p[2]); };
  let a = pd(v.start), b = pd(v.end);
  if (b < a) { const t = a; a = b; b = t; }
  const DAY = 86400000;
  if (!v.incl) b -= DAY;
  if (b < a) return { main: ["Working days", "0"], items: [["Total days", "0"]] };
  const wk = { "sat-sun": [6, 0], "fri-sat": [5, 6], fri: [5], sun: [0] }[v.weekend];
  const hol = new Set((v.hol || "").split(/\s+/).filter((x) => /^\d{4}-\d{2}-\d{2}$/.test(x)).map(pd));
  let total = 0, weekend = 0, work = 0, holidays = 0;
  for (let t = a; t <= b; t += DAY) {
    total++;
    const dow = new Date(t).getUTCDay();
    if (wk.includes(dow)) weekend++;
    else if (hol.has(t)) holidays++;
    else work++;
  }
  if (total > 40000) return { error: "Please use a range shorter than about 100 years." };
  return { main: ["Working days", String(work)], items: [["Total calendar days", String(total)], ["Weekend days", String(weekend)], ["Holidays skipped", String(holidays)]] };
}});