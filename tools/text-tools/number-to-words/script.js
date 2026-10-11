ARIXO.tool({ live: true, compute(v) {
  const raw = (v.val || "").replace(/[,\s₹]/g, "");
  if (!raw) return null;
  if (!/^\d+(\.\d{1,2})?$/.test(raw)) return { error: "Enter a positive number with up to 2 decimal places." };
  const [ip, fp = ""] = raw.split(".");
  if (ip.length > 15) return { error: "Please use up to 15 digits before the decimal point." };
  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const b1000 = (n) => { const o = []; if (n >= 100) { o.push(ones[Math.floor(n / 100)] + " Hundred"); n %= 100; } if (n >= 20) { o.push(tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "")); } else if (n > 0) o.push(ones[n]); return o.join(" "); };
  const indian = (n) => {
    if (n >= 10000000n) { const cr = n / 10000000n, rest = n % 10000000n; return indian(cr) + " Crore" + (rest ? " " + indian(rest) : ""); }
    const p = []; const lakh = n / 100000n; n %= 100000n; const th = n / 1000n; n %= 1000n;
    if (lakh) p.push(b1000(Number(lakh)) + " Lakh"); if (th) p.push(b1000(Number(th)) + " Thousand"); if (n) p.push(b1000(Number(n)));
    return p.join(" ");
  };
  const scale = ["", " Thousand", " Million", " Billion", " Trillion", " Quadrillion"];
  const intl = (n) => { const p = []; let i = 0; while (n > 0n) { const g = Number(n % 1000n); if (g) p.unshift(b1000(g) + scale[i]); n /= 1000n; i++; } return p.join(" "); };
  const n = BigInt(ip), paise = fp ? parseInt((fp + "0").slice(0, 2), 10) : 0;
  const w = (f) => (n === 0n ? "Zero" : f(n));
  const rupees = (n === 0n && paise ? "" : w(indian) + " Rupees") + (paise ? (n === 0n ? "" : " and ") + b1000(paise) + " Paise" : "") + " Only";
  return { main: ["In words (Indian system)", w(indian)], items: [["International system", w(intl)], ["Rupees format", rupees.trim()]], rows: 1 };
}});