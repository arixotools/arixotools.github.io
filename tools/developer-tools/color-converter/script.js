ARIXO.tool({ live: true, compute(v) {
  const s = (v.val || "").trim().toLowerCase();
  if (!s) return null;
  let r, g, b, m;
  if ((m = s.match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/))) {
    let h = m[1]; if (h.length === 3) h = h.split("").map((c) => c + c).join("");
    r = parseInt(h.slice(0, 2), 16); g = parseInt(h.slice(2, 4), 16); b = parseInt(h.slice(4, 6), 16);
  } else if ((m = s.match(/^rgba?\(\s*(\d{1,3})\s*[, ]\s*(\d{1,3})\s*[, ]\s*(\d{1,3})(?:\s*[,/]\s*[\d.]+%?)?\s*\)$/))) {
    r = +m[1]; g = +m[2]; b = +m[3];
    if (r > 255 || g > 255 || b > 255) return { error: "RGB values must be from 0 to 255." };
  } else if ((m = s.match(/^hsla?\(\s*(-?[\d.]+)(?:deg)?\s*[, ]\s*([\d.]+)%\s*[, ]\s*([\d.]+)%(?:\s*[,/]\s*[\d.]+%?)?\s*\)$/))) {
    const h = (((+m[1] % 360) + 360) % 360) / 360, sat = Math.min(+m[2], 100) / 100, l = Math.min(+m[3], 100) / 100;
    const q = l < 0.5 ? l * (1 + sat) : l + sat - l * sat, p = 2 * l - q;
    const f = (t) => { t = (t + 1) % 1; if (t < 1 / 6) return p + (q - p) * 6 * t; if (t < 1 / 2) return q; if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6; return p; };
    if (sat === 0) { r = g = b = Math.round(l * 255); } else { r = Math.round(f(h + 1 / 3) * 255); g = Math.round(f(h) * 255); b = Math.round(f(h - 1 / 3) * 255); }
  } else return { error: "Could not read that color. Use HEX like #1e90ff, rgb(30, 144, 255) or hsl(210, 100%, 56%)." };
  const hex = "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
  const rr = r / 255, gg = g / 255, bb = b / 255, mx = Math.max(rr, gg, bb), mn = Math.min(rr, gg, bb), d = mx - mn;
  let h = 0, sat = 0; const l = (mx + mn) / 2;
  if (d) { sat = d / (1 - Math.abs(2 * l - 1)); if (mx === rr) h = ((gg - bb) / d) % 6; else if (mx === gg) h = (bb - rr) / d + 2; else h = (rr - gg) / d + 4; h *= 60; if (h < 0) h += 360; }
  return { main: ["HEX", hex.toUpperCase()], items: [["RGB", "rgb(" + r + ", " + g + ", " + b + ")"], ["HSL", "hsl(" + Math.round(h) + ", " + Math.round(sat * 100) + "%, " + Math.round(l * 100) + "%)"]], swatch: hex };
}});