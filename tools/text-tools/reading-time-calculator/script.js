ARIXO.tool({ live: true, compute(v) {
  const t = v.txt || "";
  const words = (t.trim().match(/\S+/g) || []).length;
  if (!words) return null;
  const sentences = (t.match(/[^.!?।]+[.!?।]+/g) || [t]).length;
  const paras = t.split(/\n\s*\n/).filter((p) => p.trim()).length;
  const fmt = (m) => { const s = Math.round(m * 60); const mm = Math.floor(s / 60), ss = s % 60; return mm > 0 ? mm + " min " + ss + " sec" : ss + " sec"; };
  const wpm = parseInt(v.wpm, 10);
  return { main: ["Estimated reading time", fmt(words / wpm)], items: [["Speaking time (130 wpm)", fmt(words / 130)], ["Words", words.toLocaleString("en-IN")], ["Characters", t.length.toLocaleString("en-IN")], ["Sentences", String(sentences)], ["Paragraphs", String(paras)]] };
}});