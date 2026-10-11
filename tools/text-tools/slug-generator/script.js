ARIXO.tool({ live: true, compute(v) {
  let s = (v.txt || "").trim();
  if (!s) return null;
  if (v.lc) s = s.toLowerCase();
  s = s.replace(/&/g, " and ");
  if (!v.keep) s = s.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
  const allowed = v.keep ? /[^\p{L}\p{M}\p{N}]+/gu : /[^a-zA-Z0-9]+/g;
  s = s.replace(allowed, v.sep).replace(new RegExp("\\" + v.sep + "{2,}", "g"), v.sep);
  s = s.replace(new RegExp("^\\" + v.sep + "+|\\" + v.sep + "+$", "g"), "");
  const max = parseInt(v.max, 10);
  if (max && s.length > max) { s = s.slice(0, max); const i = s.lastIndexOf(v.sep); if (i > max * 0.6) s = s.slice(0, i); s = s.replace(new RegExp("\\" + v.sep + "+$"), ""); }
  if (!s) return { error: "No usable letters or numbers found. Try turning on 'Keep non-English letters'." };
  return { main: ["Your slug", s], items: [["Length", s.length + " characters"], ["Example URL", "https://example.com/" + s]] };
}});