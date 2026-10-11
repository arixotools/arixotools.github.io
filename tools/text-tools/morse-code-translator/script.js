ARIXO.tool({ live: true, compute(v) {
  const t = v.txt || "";
  if (!t.trim()) return null;
  const M = { A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....", I: "..", J: ".---", K: "-.-", L: ".-..", M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.", S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-", Y: "-.--", Z: "--..", 0: "-----", 1: ".----", 2: "..---", 3: "...--", 4: "....-", 5: ".....", 6: "-....", 7: "--...", 8: "---..", 9: "----.", ".": ".-.-.-", ",": "--..--", "?": "..--..", "'": ".----.", "!": "-.-.--", "/": "-..-.", "(": "-.--.", ")": "-.--.-", "&": ".-...", ":": "---...", ";": "-.-.-.", "=": "-...-", "+": ".-.-.", "-": "-....-", "_": "..--.-", '"': ".-..-.", "@": ".--.-." };
  const R = {}; Object.keys(M).forEach((k) => (R[M[k]] = k));
  const isMorse = /^[.\-\s\/|_·−]+$/.test(t);
  if (isMorse) {
    const s = t.replace(/[·]/g, ".").replace(/[−_]/g, "-");
    const words = s.trim().split(/\s*[\/|]\s*|\s{3,}/);
    const out = words.map((w) => w.trim().split(/\s+/).map((c) => R[c] || "?").join("")).join(" ");
    return { main: ["Decoded text", out], stats: "Morse to text." };
  }
  const out = t.toUpperCase().split(/\s+/).filter(Boolean).map((w) => Array.from(w).map((ch) => M[ch] || "?").join(" ")).join(" / ");
  return { main: ["Morse code", out], stats: "Text to Morse. Letters are separated by spaces and words by a slash." };
}});