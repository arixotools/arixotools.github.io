(function () {
    const $ = (id) => document.getElementById(id);
    const WORDS = ("lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum curabitur pretium tincidunt lacus nunc volutpat integer feugiat scelerisque varius morbi leo urna molestie at elementum eu facilisis sapien pellentesque habitant tristique senectus netus malesuada fames turpis egestas").split(" ");
    const START = ["lorem", "ipsum", "dolor", "sit", "amet,", "consectetur", "adipiscing", "elit"];

    const rnd = (n) => Math.floor(Math.random() * n);
    const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

    function sentence(classic) {
        const len = 8 + rnd(9);
        let w = [];
        if (classic) {
            w = START.slice();
        }
        while (w.length < len) {
            const x = WORDS[rnd(WORDS.length)];
            if (w.length && w[w.length - 1].replace(/,$/, "") === x) continue;
            w.push(x);
        }
        // add one comma in the middle of longer sentences
        if (w.length > 10 && !w.some((t, i) => i > 0 && i < w.length - 1 && t.endsWith(","))) {
            const p = 3 + rnd(w.length - 6);
            if (!w[p].endsWith(",")) w[p] += ",";
        }
        w[w.length - 1] = w[w.length - 1].replace(/,$/, "");
        return cap(w.join(" ")) + ".";
    }
    function paragraph(classic) {
        const n = 4 + rnd(4);
        const s = [];
        for (let i = 0; i < n; i++) s.push(sentence(classic && i === 0));
        return s.join(" ");
    }
    function words(n, classic) {
        const w = [];
        if (classic) START.forEach((x) => w.length < n && w.push(x));
        while (w.length < n) w.push(WORDS[rnd(WORDS.length)]);
        return cap(w.join(" ").replace(/,/g, "")) + ".";
    }
    function generate(type, count, classic) {
        if (type === "words") return words(count, classic);
        const out = [];
        for (let i = 0; i < count; i++) {
            out.push(type === "sentences" ? sentence(classic && i === 0) : paragraph(classic && i === 0));
        }
        return type === "sentences" ? out.join(" ") : out.join("\n\n");
    }

    if (typeof window !== "undefined" && window.document && $("genBtn")) {
        const LIMITS = { paragraphs: 50, sentences: 200, words: 5000 };
        const err = $("error"), out = $("output");
        function run() {
            err.textContent = "";
            const type = $("loremType").value;
            const count = parseInt($("loremCount").value, 10);
            if (!(count >= 1) || count > LIMITS[type]) {
                err.textContent = "Enter a number from 1 to " + LIMITS[type] + " for " + type + ".";
                return;
            }
            out.value = generate(type, count, $("classic").checked);
            const wc = out.value.trim().split(/\s+/).filter(Boolean).length;
            $("stats").textContent = wc + " words, " + out.value.length + " characters";
        }
        $("genBtn").addEventListener("click", run);
        $("loremType").addEventListener("change", () => {
            const d = { paragraphs: 3, sentences: 5, words: 50 };
            $("loremCount").value = d[$("loremType").value];
        });
        $("copyBtn").addEventListener("click", async () => {
            if (!out.value) return;
            try { await navigator.clipboard.writeText(out.value); }
            catch (e) { out.select(); document.execCommand("copy"); }
            $("copyBtn").textContent = "Copied";
            setTimeout(() => ($("copyBtn").textContent = "Copy text"), 1400);
        });
        run();
    }
    if (typeof module !== "undefined") module.exports = { generate };
})();
