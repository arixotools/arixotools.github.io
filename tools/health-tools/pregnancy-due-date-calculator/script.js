ARIXO.tool({ init(inputs) { const d = inputs.find((i) => i.id === "lmp"); },
 compute(v) {
  if (!v.lmp) return { error: "Choose the first day of your last period." };
  const cyc = v.cycle === null ? 28 : v.cycle;
  if (cyc < 21 || cyc > 45) return { error: "Cycle length should be between 21 and 45 days." };
  const p = v.lmp.split("-").map(Number);
  const lmp = Date.UTC(p[0], p[1] - 1, p[2]);
  const DAY = 86400000;
  const edd = lmp + (280 + (cyc - 28)) * DAY;
  const fmt = (t) => new Date(t).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  const now = new Date(); const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const days = Math.floor((today - lmp) / DAY);
  let age = "Not started yet";
  if (days >= 0 && days <= 300) age = Math.floor(days / 7) + " weeks " + (days % 7) + " days";
  else if (days > 300) age = "Past the typical 42-week window";
  const adj = (cyc - 28) * DAY;
  return { main: ["Estimated due date", fmt(edd)], items: [["Pregnant today", age], ["First trimester ends (week 13)", fmt(lmp + 91 * DAY + adj)], ["Second trimester ends (week 27)", fmt(lmp + 189 * DAY + adj)], ["Full term from (week 37)", fmt(lmp + 259 * DAY + adj)]], stats: "A due date is an estimate. Most babies arrive between weeks 37 and 42. Always confirm dates with your doctor." };
}});