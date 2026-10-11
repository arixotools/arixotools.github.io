ARIXO.tool({ compute(v) {
  const parts = (v.nums || "").split(/[\s,;]+/).filter(Boolean);
  if (parts.length < 2) return { error: "Enter at least two whole numbers." };
  if (parts.some((p) => !/^\d+$/.test(p))) return { error: "Use positive whole numbers only." };
  const a = parts.map((p) => BigInt(p));
  if (a.some((x) => x === 0n)) return { error: "Numbers must be greater than zero." };
  if (a.length > 50) return { error: "Please use at most 50 numbers." };
  const gcd = (x, y) => { while (y) { [x, y] = [y, x % y]; } return x; };
  let g = a[0], l = a[0];
  for (let i = 1; i < a.length; i++) { g = gcd(g, a[i]); l = (l / gcd(l, a[i])) * a[i]; }
  const fmt = (b) => b.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return { main: ["HCF (GCD)", fmt(g)], items: [["LCM", fmt(l)], ["Numbers used", a.map(String).join(", ")]] };
}});