(function () {
    const $ = (id) => document.getElementById(id);
    const fmt = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

    function fd(principal, rate, years, perYear) {
        // perYear = 0 means simple interest paid at maturity
        const value = perYear === 0
            ? principal * (1 + (rate / 100) * years)
            : principal * Math.pow(1 + rate / (100 * perYear), perYear * years);
        return { invested: principal, value, interest: value - principal };
    }
    function rd(deposit, rate, months) {
        // monthly deposits at the start of each month, interest compounded quarterly
        let value = 0;
        for (let k = 1; k <= months; k++) {
            value += deposit * Math.pow(1 + rate / 400, (months - k + 1) / 3);
        }
        return { invested: deposit * months, value, interest: value - deposit * months };
    }

    if (typeof window !== "undefined" && window.document && $("calcBtn")) {
        let mode = "fd";
        const err = $("error"), result = $("result");
        const tabs = { fd: $("tabFd"), rd: $("tabRd") };
        function setMode(m) {
            mode = m;
            Object.keys(tabs).forEach((k) => tabs[k].classList.toggle("active", k === m));
            $("fdFields").hidden = m !== "fd";
            $("rdFields").hidden = m !== "rd";
            result.classList.remove("show");
            err.textContent = "";
        }
        tabs.fd.addEventListener("click", () => setMode("fd"));
        tabs.rd.addEventListener("click", () => setMode("rd"));

        function run() {
            err.textContent = "";
            let r, rate;
            if (mode === "fd") {
                const p = parseFloat($("fdAmount").value);
                rate = parseFloat($("fdRate").value);
                let t = parseFloat($("fdTenure").value);
                const unit = $("fdUnit").value;
                const perYear = parseInt($("fdCompound").value, 10);
                if (!(p > 0) || !(rate >= 0) || !(t > 0)) { err.textContent = "Enter the deposit amount, interest rate and tenure."; result.classList.remove("show"); return; }
                if (rate > 30) { err.textContent = "Use an interest rate up to 30%."; result.classList.remove("show"); return; }
                if (unit === "months") t = t / 12;
                if (t > 50) { err.textContent = "Use a tenure of up to 50 years."; result.classList.remove("show"); return; }
                r = fd(p, rate, t, perYear);
                $("labelInvested").textContent = "Amount deposited";
            } else {
                const d = parseFloat($("rdAmount").value);
                rate = parseFloat($("rdRate").value);
                const months = Math.round(parseFloat($("rdMonths").value));
                if (!(d > 0) || !(rate >= 0) || !(months > 0)) { err.textContent = "Enter the monthly deposit, interest rate and number of months."; result.classList.remove("show"); return; }
                if (rate > 30 || months > 600) { err.textContent = "Use an interest rate up to 30% and up to 600 months."; result.classList.remove("show"); return; }
                r = rd(d, rate, months);
                $("labelInvested").textContent = "Total deposited";
            }
            $("invested").textContent = fmt(r.invested);
            $("interest").textContent = fmt(r.interest);
            $("maturity").textContent = fmt(r.value);
            result.classList.add("show");
        }
        $("calcBtn").addEventListener("click", run);
        $("clearBtn").addEventListener("click", () => {
            document.querySelectorAll("input[type=number]").forEach((el) => (el.value = ""));
            err.textContent = "";
            result.classList.remove("show");
        });
        document.querySelectorAll("input").forEach((el) =>
            el.addEventListener("keydown", (e) => { if (e.key === "Enter") run(); })
        );
    }
    if (typeof module !== "undefined") module.exports = { fd, rd };
})();
