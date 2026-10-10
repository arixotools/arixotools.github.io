(function () {
    const $ = (id) => document.getElementById(id);
    // every unit expressed in square feet
    const UNITS = [
        { id: "sqft",    name: "Square foot (sq ft)",       sqft: 1 },
        { id: "sqyd",    name: "Square yard (sq yd)",       sqft: 9 },
        { id: "sqm",     name: "Square meter (sq m)",       sqft: 10.7639104167 },
        { id: "chatak",  name: "Chatak",                    sqft: 45 },
        { id: "katha",   name: "Katha",                     sqft: 720 },
        { id: "bigha",   name: "Bigha (20 katha)",          sqft: 14400 },
        { id: "decimal", name: "Decimal / Shotok / Cent",   sqft: 435.6 },
        { id: "gunta",   name: "Gunta",                     sqft: 1089 },
        { id: "acre",    name: "Acre",                      sqft: 43560 },
        { id: "hectare", name: "Hectare",                   sqft: 107639.104167 }
    ];
    const byId = Object.fromEntries(UNITS.map((u) => [u.id, u]));

    function convert(value, from, to) {
        return (value * byId[from].sqft) / byId[to].sqft;
    }
    function fmt(n) {
        if (!isFinite(n)) return "0";
        const abs = Math.abs(n);
        if (abs !== 0 && (abs < 0.0001 || abs >= 1e12)) return n.toExponential(4);
        return parseFloat(n.toPrecision(10)).toLocaleString("en-IN", { maximumFractionDigits: 6 });
    }

    if (typeof window !== "undefined" && window.document && $("fromUnit")) {
        const from = $("fromUnit"), to = $("toUnit"), val = $("landValue");
        UNITS.forEach((u) => {
            from.add(new Option(u.name, u.id));
            to.add(new Option(u.name, u.id));
        });
        from.value = "katha";
        to.value = "sqft";
        val.value = "1";

        function run() {
            const v = parseFloat(val.value);
            const tbody = $("allRows");
            tbody.innerHTML = "";
            if (!isFinite(v) || v < 0) {
                $("mainResult").textContent = "Enter a number";
                $("mainLine").textContent = "";
                return;
            }
            const out = convert(v, from.value, to.value);
            $("mainResult").textContent = fmt(out) + " " + byId[to.value].name.split(" (")[0];
            $("mainLine").textContent = fmt(v) + " " + byId[from.value].name.split(" (")[0] + " equals";
            UNITS.forEach((u) => {
                const tr = document.createElement("tr");
                const a = document.createElement("td"); a.textContent = u.name;
                const b = document.createElement("td"); b.textContent = fmt(convert(v, from.value, u.id));
                tr.appendChild(a); tr.appendChild(b);
                if (u.id === to.value) tr.className = "hit";
                tbody.appendChild(tr);
            });
        }
        [val, from, to].forEach((el) => el.addEventListener("input", run));
        $("swapBtn").addEventListener("click", () => {
            const t = from.value; from.value = to.value; to.value = t; run();
        });
        run();
    }
    if (typeof module !== "undefined") module.exports = { convert, UNITS };
})();
