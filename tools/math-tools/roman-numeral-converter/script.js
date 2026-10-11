ARIXO.tool({ live: true, compute(v) {
  const s = (v.val || "").trim();
  if (!s) return null;
  const map = [[1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
  const toRoman = (n) => { let out = ""; for (const [v2, r] of map) while (n >= v2) { out += r; n -= v2; } return out; };
  if (/^\d+$/.test(s)) {
    const n = parseInt(s, 10);
    if (n < 1 || n > 3999) return { error: "Roman numerals here cover 1 to 3999." };
    return { main: [n + " in Roman numerals", toRoman(n)] };
  }
  const u = s.toUpperCase();
  if (!/^[IVXLCDM]+$/.test(u)) return { error: "Enter digits, or Roman letters I, V, X, L, C, D and M." };
  const val = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let n = 0;
  for (let i = 0; i < u.length; i++) { const c = val[u[i]], nx = val[u[i + 1]] || 0; n += c < nx ? -c : c; }
  if (toRoman(n) !== u) return { error: "That is not a standard Roman numeral. The correct form of " + n + " is " + toRoman(n) + "." };
  return { main: [u + " equals", String(n)] };
}});