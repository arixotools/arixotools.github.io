(function () {
    const $ = (id) => document.getElementById(id);
    const fmt = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

    function compute(amount, rate, years, stepUp) {
        const months = Math.round(years * 12);
        const i = rate / 1200;
        let monthly = amount, balance = 0, invested = 0;
        const rows = [];
        for (let m = 1; m <= months; m++) {
            if (m > 1 && (m - 1) % 12 === 0) monthly *= 1 + stepUp / 100;
            balance = (balance + monthly) * (1 + i);
            invested += monthly;
            if (m % 12 === 0 || m === months) {
                rows.push({ year: Math.ceil(m / 12), monthly, invested, value: balance });
            }
        }
        return { invested, value: balance, returns: balance - invested, rows };
    }

    if (typeof window !== "undefined" && window.document && $("calcBtn")) {
        const err = $("error"), result = $("result");
        function run() {
            const amount = parseFloat($("sipAmount").value);
            const rate = parseFloat($("sipRate").value);
            const years = parseFloat($("sipYears").value);
            const stepUp = parseFloat($("sipStep").value) || 0;
            err.textContent = "";
            if (!(amount > 0) || !(rate >= 0) || !(years > 0)) {
                result.classList.remove("show");
                err.textContent = "Enter a monthly amount, an expected return and the number of years.";
                return;
            }
            if (rate > 50 || years > 50 || stepUp < 0 || stepUp > 100) {
                result.classList.remove("show");
                err.textContent = "Use a return up to 50%, up to 50 years and a step-up between 0% and 100%.";
                return;
            }
            const r = compute(amount, rate, years, stepUp);
            $("invested").textContent = fmt(r.invested);
            $("returns").textContent = fmt(r.returns);
            $("totalValue").textContent = fmt(r.value);
            const pct = r.value > 0 ? (r.invested / r.value) * 100 : 100;
            $("barInvested").style.width = pct.toFixed(1) + "%";
            $("barLegend").textContent = Math.round(pct) + "% invested, " + Math.round(100 - pct) + "% returns";
            const body = $("yearRows");
            body.innerHTML = "";
            r.rows.forEach((row) => {
                const tr = document.createElement("tr");
                [row.year, fmt(row.monthly), fmt(row.invested), fmt(row.value)].forEach((v) => {
                    const td = document.createElement("td");
                    td.textContent = v;
                    tr.appendChild(td);
                });
                body.appendChild(tr);
            });
            result.classList.add("show");
        }
        $("calcBtn").addEventListener("click", run);
        $("clearBtn").addEventListener("click", () => {
            ["sipAmount", "sipRate", "sipYears", "sipStep"].forEach((id) => ($(id).value = ""));
            err.textContent = "";
            result.classList.remove("show");
        });
        document.querySelectorAll("input").forEach((el) =>
            el.addEventListener("keydown", (e) => { if (e.key === "Enter") run(); })
        );
    }
    if (typeof module !== "undefined") module.exports = { compute };
})();
