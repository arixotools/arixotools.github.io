ARIXO.tool({ compute(v) {
  const s = (v.val || "").trim().toLowerCase().replace(/^0x/, "").replace(/^0b/, "");
  if (!s) return { error: "Enter a number to convert." };
  const base = parseInt(v.from, 10);
  const digits = "0123456789abcdefghijklmnopqrstuvwxyz";
  let n = 0n;
  const B = BigInt(base);
  for (const ch of s) {
    const d = digits.indexOf(ch);
    if (d < 0 || d >= base) return { error: "'" + ch + "' is not a valid digit in base " + base + "." };
    n = n * B + BigInt(d);
  }
  const grp = (str, k) => str.replace(new RegExp("\\B(?=(.{" + k + "})+(?!.))", "g"), " ");
  return { main: ["Decimal", n.toString()], items: [["Binary", grp(n.toString(2), 4)], ["Octal", n.toString(8)], ["Hexadecimal", n.toString(16).toUpperCase()], ["Base 36", n.toString(36).toUpperCase()]] };
}});