/* Remembers recently opened tools in this browser only (used by the home page "Recently used" list). */
(function () {
    try {
        var m = location.pathname.match(/tools\/([^/]+\/[^/]+)\/?/);
        if (!m) return;
        var k = m[1], r = JSON.parse(localStorage.getItem("arixo_recent") || "[]");
        if (!Array.isArray(r)) r = [];
        r = r.filter(function (x) { return x !== k; }); r.unshift(k);
        localStorage.setItem("arixo_recent", JSON.stringify(r.slice(0, 12)));
    } catch (e) {}
})();
