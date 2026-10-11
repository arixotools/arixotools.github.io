ARIXO.tool({ compute(v) {
  const t = (v.tok || "").trim().replace(/^Bearer\s+/i, "");
  if (!t) return { error: "Paste a JWT to decode." };
  const parts = t.split(".");
  if (parts.length < 2 || parts.length > 3) return { error: "A JWT has three parts separated by dots." };
  const dec = (s) => {
    s = s.replace(/-/g, "+").replace(/_/g, "/"); while (s.length % 4) s += "=";
    const bin = atob(s); const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes));
  };
  let h, p;
  try { h = dec(parts[0]); p = dec(parts[1]); } catch (e) { return { error: "That does not look like a valid JWT. The header or payload could not be decoded." }; }
  const when = (x) => typeof x === "number" ? new Date(x * 1000).toISOString().replace("T", " ").replace(".000Z", " UTC") : "Not set";
  const items = [["Algorithm", String(h.alg || "unknown")], ["Issued at (iat)", when(p.iat)], ["Expires (exp)", when(p.exp)]];
  if (typeof p.exp === "number") items.push(["Status", p.exp * 1000 < Date.now() ? "Expired" : "Not expired yet"]);
  const text = "HEADER\n" + JSON.stringify(h, null, 2) + "\n\nPAYLOAD\n" + JSON.stringify(p, null, 2);
  return { items, text, rows: 12, stats: "Decoded only. The signature is NOT verified." };
}});