ARIXO.tool({ compute(v) {
  const vals = [v.n1, v.d1, v.n2, v.d2];
  if (vals.some((x) => x === null)) return { error: "Fill in both fractions." };
  if (vals.some((x) => !Number.isInteger(x))) return { error: "Use whole numbers for numerators and denominators." };
  if (v.d1 === 0 || v.d2 === 0) return { error: "A denominator cannot be zero." };
  let n, d;
  if (v.op === "+") { n = v.n1 * v.d2 + v.n2 * v.d1; d = v.d1 * v.d2; }
  else if (v.op === "-") { n = v.n1 * v.d2 - v.n2 * v.d1; d = v.d1 * v.d2; }
  else if (v.op === "*") { n = v.n1 * v.n2; d = v.d1 * v.d2; }
  else { if (v.n2 === 0) return { error: "You cannot divide by zero." }; n = v.n1 * v.d2; d = v.d1 * v.n2; }
  if (d < 0) { n = -n; d = -d; }
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a; };
  const g = gcd(n, d) || 1;
  n /= g; d /= g;
  const frac = d === 1 ? String(n) : n + "/" + d;
  const whole = Math.trunc(n / d), rem = Math.abs(n) % d;
  const mixed = d === 1 || Math.abs(n) < d ? frac : whole + " " + rem + "/" + d;
  return { main: ["Result", frac], items: [["Mixed number", mixed], ["Decimal", parseFloat((n / d).toFixed(8)).toString()]] };
}});