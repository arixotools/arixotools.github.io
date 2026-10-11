const CFG = { out: "image/webp", ext: "webp", quality: true, bg: false };

(function () {
  const $ = (id) => document.getElementById(id);
  const list = $("list"), err = $("error"), files = $("files");
  const fmt = (b) => (b > 1048576 ? (b / 1048576).toFixed(2) + " MB" : (b / 1024).toFixed(1) + " KB");
  if ($("quality")) $("quality").addEventListener("input", () => ($("qv").textContent = $("quality").value));
  async function convert(file) {
    const url = URL.createObjectURL(file);
    const img = new Image();
    try {
      await new Promise((res, rej) => { img.onload = res; img.onerror = () => rej(new Error("decode")); img.src = url; });
      const c = document.createElement("canvas");
      c.width = img.naturalWidth; c.height = img.naturalHeight;
      const ctx = c.getContext("2d");
      if (CFG.bg) { ctx.fillStyle = $("bg").value; ctx.fillRect(0, 0, c.width, c.height); }
      ctx.drawImage(img, 0, 0);
      const q = CFG.quality ? $("quality").value / 100 : undefined;
      const blob = await new Promise((r) => c.toBlob(r, CFG.out, q));
      if (!blob) throw new Error("encode");
      return { blob, w: c.width, h: c.height };
    } finally { URL.revokeObjectURL(url); }
  }
  files.addEventListener("change", () => { list.innerHTML = ""; err.textContent = ""; });
  $("convBtn").addEventListener("click", async () => {
    err.textContent = ""; list.innerHTML = "";
    const fl = Array.from(files.files);
    if (!fl.length) { err.textContent = "Choose at least one image first."; return; }
    if (fl.length > 30) { err.textContent = "Please convert up to 30 images at a time."; return; }
    for (const f of fl) {
      const row = document.createElement("div"); row.className = "img-row";
      const meta = document.createElement("div"); meta.className = "meta";
      try {
        const r = await convert(f);
        const ok = r.blob.type === CFG.out;
        const name = f.name.replace(/\.[^.]+$/, "") + "." + (ok ? CFG.ext : "png");
        const href = URL.createObjectURL(r.blob);
        const im = document.createElement("img"); im.src = href; im.alt = "Preview of " + name; row.appendChild(im);
        meta.textContent = f.name + " (" + fmt(f.size) + ") became " + name + " (" + fmt(r.blob.size) + "), " + r.w + " × " + r.h + " px." + (ok ? "" : " Your browser cannot save this format, so a PNG was created instead.");
        const a = document.createElement("a"); a.href = href; a.download = name; a.className = "btn calculate-btn"; a.textContent = "Download " + name;
        row.appendChild(meta); row.appendChild(a);
      } catch (e) {
        meta.textContent = "Could not convert " + f.name + ". The file may not be a valid image, or it may be too large for your browser.";
        row.appendChild(meta);
      }
      list.appendChild(row);
    }
  });
})();
