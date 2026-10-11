/* ARIXO home extras: favorites, recently used, popular search chips (all stored only in this browser) */
(function () {
    "use strict";
    var FAV = "arixo_fav", REC = "arixo_recent";
    function load(k) { try { var v = JSON.parse(localStorage.getItem(k) || "[]"); return Array.isArray(v) ? v : []; } catch (e) { return []; } }
    function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
    function keyOf(href) { var m = (href || "").match(/tools\/([^/]+\/[^/]+)\//); return m ? m[1] : null; }

    var cards = Array.prototype.slice.call(document.querySelectorAll(".tool-card"));
    var byKey = {};
    cards.forEach(function (c) { var k = keyOf(c.getAttribute("href")); if (k) byKey[k] = c; });

    function quick(k) {
        var c = byKey[k]; if (!c) return null;
        var a = document.createElement("a");
        a.className = "quick-card"; a.href = c.getAttribute("href");
        var i = document.createElement("span"); i.className = "quick-icon"; i.textContent = (c.querySelector(".tool-icon") || {}).textContent || "";
        var t = document.createElement("span"); t.className = "quick-text";
        var s = document.createElement("strong"); s.textContent = c.getAttribute("data-name") || "";
        var sm = document.createElement("small"); sm.textContent = (c.querySelector(".tool-category") || {}).textContent || "";
        t.appendChild(s); t.appendChild(sm); a.appendChild(i); a.appendChild(t);
        return a;
    }
    function fill(id, keys) {
        var box = document.getElementById(id); if (!box) return 0;
        box.innerHTML = "";
        var n = 0;
        keys.forEach(function (k) { var q = quick(k); if (q) { box.appendChild(q); n++; } });
        return n;
    }
    function renderPersonal() {
        var favs = load(FAV).filter(function (k) { return byKey[k]; });
        var recent = load(REC).filter(function (k) { return byKey[k]; }).slice(0, 8);
        var sec = document.getElementById("personal");
        if (!sec) return;
        var f = fill("favGrid", favs), r = fill("recentGrid", recent);
        document.getElementById("favBlock").hidden = !f;
        document.getElementById("recentBlock").hidden = !r;
        sec.hidden = !(f || r);
        cards.forEach(function (c) {
            var k = keyOf(c.getAttribute("href")), b = c.querySelector(".fav-btn");
            if (!b) return;
            var on = favs.indexOf(k) > -1;
            b.classList.toggle("on", on);
            b.setAttribute("aria-pressed", on ? "true" : "false");
            b.textContent = on ? "★" : "☆";
        });
    }
    cards.forEach(function (c) {
        var k = keyOf(c.getAttribute("href"));
        if (!k) return;
        var b = document.createElement("button");
        b.type = "button"; b.className = "fav-btn";
        b.setAttribute("aria-label", "Save " + (c.getAttribute("data-name") || "tool") + " to favorites");
        b.addEventListener("click", function (e) {
            e.preventDefault(); e.stopPropagation();
            var favs = load(FAV), i = favs.indexOf(k);
            if (i > -1) favs.splice(i, 1); else favs.unshift(k);
            save(FAV, favs.slice(0, 24));
            renderPersonal();
        });
        c.appendChild(b);
        c.addEventListener("click", function () {
            var r = load(REC).filter(function (x) { return x !== k; }); r.unshift(k); save(REC, r.slice(0, 12));
        });
    });
    var clr = document.getElementById("clearRecent");
    if (clr) clr.addEventListener("click", function () { save(REC, []); renderPersonal(); });
    renderPersonal();

    // popular search chips under the search box
    var input = document.getElementById("toolSearch"), box = document.querySelector(".tool-search-panel .search-box");
    if (input && box) {
        var wrap = document.createElement("div"); wrap.className = "search-chips";
        var lab = document.createElement("span"); lab.textContent = "Try:"; wrap.appendChild(lab);
        ["EMI", "SIP", "GST", "BMI", "kg", "katha", "age", "image", "date", "json"].forEach(function (w) {
            var b = document.createElement("button"); b.type = "button"; b.textContent = w;
            b.addEventListener("click", function () { input.value = w; input.dispatchEvent(new Event("input", { bubbles: true })); input.focus(); });
            wrap.appendChild(b);
        });
        box.parentNode.insertBefore(wrap, box.nextSibling);
    }
    // press / to jump to search
    document.addEventListener("keydown", function (e) {
        if (e.key === "/" && input && !/INPUT|TEXTAREA|SELECT/.test((document.activeElement || {}).tagName || "")) { e.preventDefault(); input.focus(); }
    });
})();
