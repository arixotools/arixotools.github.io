/* ARIXO tool runtime: wires inputs marked data-in to a compute() function and renders the result. */
(function (root) {
    function el(tag, cls, text) {
        const e = document.createElement(tag);
        if (cls) e.className = cls;
        if (text !== undefined) e.textContent = text;
        return e;
    }
    root.ARIXO = root.ARIXO || {};
    root.ARIXO.tool = function (cfg) {
        if (typeof document === "undefined") return cfg;
        const inputs = Array.prototype.slice.call(document.querySelectorAll("[data-in]"));
        const resultBox = document.getElementById("result");
        const errBox = document.getElementById("error");
        const calcBtn = document.getElementById("calcBtn");
        const clearBtn = document.getElementById("clearBtn");

        function read() {
            const v = {};
            inputs.forEach((i) => {
                if (i.type === "checkbox") v[i.id] = i.checked;
                else if (i.type === "number") {
                    const n = parseFloat(i.value);
                    v[i.id] = isFinite(n) ? n : null;
                } else v[i.id] = i.value;
            });
            return v;
        }
        function hide() { resultBox.classList.remove("show"); resultBox.innerHTML = ""; }
        function render(r) {
            errBox.textContent = "";
            if (!r) { hide(); return; }
            if (r.error) { hide(); errBox.textContent = r.error; return; }
            resultBox.innerHTML = "";
            if (r.main) {
                const m = el("div", "result-item main-result");
                m.appendChild(el("span", "", r.main[0]));
                m.appendChild(el("strong", "", r.main[1]));
                resultBox.appendChild(m);
            }
            if (r.items && r.items.length) {
                const g = el("div", "result-grid");
                r.items.forEach((it) => {
                    const d = el("div", "result-item");
                    d.appendChild(el("span", "", it[0]));
                    d.appendChild(el("strong", "", it[1]));
                    g.appendChild(d);
                });
                resultBox.appendChild(g);
            }
            if (r.swatch) {
                const s = el("div", "swatch");
                s.style.background = r.swatch;
                resultBox.appendChild(s);
            }
            if (r.table) {
                const w = el("div", "tscroll");
                const t = el("table", "data");
                const th = el("thead"), hr = el("tr");
                r.table.head.forEach((h) => hr.appendChild(el("th", "", h)));
                th.appendChild(hr); t.appendChild(th);
                const tb = el("tbody");
                r.table.rows.forEach((row) => {
                    const tr = el("tr");
                    row.forEach((c) => tr.appendChild(el("td", "", String(c))));
                    tb.appendChild(tr);
                });
                t.appendChild(tb); w.appendChild(t); resultBox.appendChild(w);
            }
            if (r.text !== undefined) {
                const ta = el("textarea", "field out-text");
                ta.readOnly = true; ta.rows = r.rows || 8; ta.value = r.text;
                ta.setAttribute("aria-label", "Result text");
                resultBox.appendChild(ta);
                const b = el("button", "btn ghost-btn", "Copy result");
                b.type = "button";
                b.addEventListener("click", async () => {
                    try { await navigator.clipboard.writeText(ta.value); }
                    catch (e) { ta.select(); document.execCommand("copy"); }
                    b.textContent = "Copied";
                    setTimeout(() => (b.textContent = "Copy result"), 1300);
                });
                resultBox.appendChild(b);
            }
            if (r.stats) resultBox.appendChild(el("div", "legend", r.stats));
            resultBox.classList.add("show");
        }
        function run() {
            let r;
            try { r = cfg.compute(read()); }
            catch (e) { r = { error: "Something went wrong. Please check your input." }; }
            render(r);
        }
        if (cfg.live) {
            inputs.forEach((i) => {
                i.addEventListener("input", run);
                i.addEventListener("change", run);
            });
            run();
        } else {
            if (calcBtn) calcBtn.addEventListener("click", run);
            inputs.forEach((i) =>
                i.addEventListener("keydown", (e) => {
                    if (e.key === "Enter" && i.tagName !== "TEXTAREA") { e.preventDefault(); run(); }
                })
            );
        }
        if (clearBtn) clearBtn.addEventListener("click", () => {
            inputs.forEach((i) => {
                const d = i.getAttribute("data-default");
                if (i.type === "checkbox") i.checked = d === "1";
                else i.value = d === null ? "" : d;
            });
            errBox.textContent = "";
            if (cfg.live) run(); else hide();
        });
        if (cfg.init) cfg.init(inputs, run);
    };
})(typeof window !== "undefined" ? window : globalThis);
