(function () {
    const $ = (id) => document.getElementById(id);

    // MD5 (RFC 1321) over a Uint8Array, returns lowercase hex
    function md5(bytes) {
        const K = new Int32Array(64), S = [7,12,17,22,7,12,17,22,7,12,17,22,7,12,17,22,5,9,14,20,5,9,14,20,5,9,14,20,5,9,14,20,4,11,16,23,4,11,16,23,4,11,16,23,4,11,16,23,6,10,15,21,6,10,15,21,6,10,15,21,6,10,15,21];
        for (let i = 0; i < 64; i++) K[i] = Math.floor(Math.abs(Math.sin(i + 1)) * 4294967296) | 0;
        const len = bytes.length;
        const padded = new Uint8Array(((len + 8) >> 6 << 6) + 64);
        padded.set(bytes);
        padded[len] = 0x80;
        const dv = new DataView(padded.buffer);
        dv.setUint32(padded.length - 8, (len * 8) >>> 0, true);
        dv.setUint32(padded.length - 4, Math.floor((len * 8) / 4294967296), true);
        let a0 = 0x67452301, b0 = 0xefcdab89 | 0, c0 = 0x98badcfe | 0, d0 = 0x10325476;
        for (let off = 0; off < padded.length; off += 64) {
            const M = new Int32Array(16);
            for (let i = 0; i < 16; i++) M[i] = dv.getInt32(off + i * 4, true);
            let A = a0, B = b0, C = c0, D = d0;
            for (let i = 0; i < 64; i++) {
                let F, g;
                if (i < 16) { F = (B & C) | (~B & D); g = i; }
                else if (i < 32) { F = (D & B) | (~D & C); g = (5 * i + 1) % 16; }
                else if (i < 48) { F = B ^ C ^ D; g = (3 * i + 5) % 16; }
                else { F = C ^ (B | ~D); g = (7 * i) % 16; }
                F = (F + A + K[i] + M[g]) | 0;
                A = D; D = C; C = B;
                B = (B + ((F << S[i]) | (F >>> (32 - S[i])))) | 0;
            }
            a0 = (a0 + A) | 0; b0 = (b0 + B) | 0; c0 = (c0 + C) | 0; d0 = (d0 + D) | 0;
        }
        const out = new Uint8Array(16), o = new DataView(out.buffer);
        o.setInt32(0, a0, true); o.setInt32(4, b0, true); o.setInt32(8, c0, true); o.setInt32(12, d0, true);
        return Array.from(out, (b) => b.toString(16).padStart(2, "0")).join("");
    }

    const toHex = (buf) => Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
    const SHA = [["sha1", "SHA-1"], ["sha256", "SHA-256"], ["sha384", "SHA-384"], ["sha512", "SHA-512"]];

    async function hashAll(text, subtle) {
        const bytes = new TextEncoder().encode(text);
        const res = { md5: md5(bytes) };
        if (subtle) {
            for (const [id, algo] of SHA) res[id] = toHex(await subtle.digest(algo, bytes));
        }
        return res;
    }

    if (typeof window !== "undefined" && window.document && $("input")) {
        const subtle = window.crypto && window.crypto.subtle;
        const ids = ["md5"].concat(SHA.map((s) => s[0]));
        let last = {};
        let token = 0;
        function show() {
            const up = $("upper").checked;
            ids.forEach((id) => {
                const v = last[id] || (id !== "md5" && !subtle ? "Not available in this browser or connection" : "");
                $("out-" + id).textContent = up ? v.toUpperCase() : v;
            });
        }
        async function run() {
            const my = ++token;
            const text = $("input").value;
            last = text === "" ? {} : await hashAll(text, subtle);
            if (my !== token) return;
            $("chars").textContent = text.length + " characters, " + new TextEncoder().encode(text).length + " bytes";
            show();
        }
        $("input").addEventListener("input", run);
        $("upper").addEventListener("change", show);
        $("clearBtn").addEventListener("click", () => { $("input").value = ""; run(); });
        document.querySelectorAll(".copy").forEach((btn) =>
            btn.addEventListener("click", async () => {
                const t = $("out-" + btn.dataset.id).textContent;
                if (!t || t.startsWith("Not available")) return;
                try { await navigator.clipboard.writeText(t); } catch (e) {}
                const old = btn.textContent;
                btn.textContent = "Copied";
                setTimeout(() => (btn.textContent = old), 1200);
            })
        );
        run();
    }
    if (typeof module !== "undefined") module.exports = { md5, hashAll };
})();
