const amountInput = document.getElementById("amount");
const gstRateInput = document.getElementById("gstRate");
const gstTypeInput = document.getElementById("gstType");

const calculateBtn = document.getElementById("calculateBtn");
const clearBtn = document.getElementById("clearBtn");

const error = document.getElementById("error");

const finalAmount = document.getElementById("finalAmount");
const baseAmount = document.getElementById("baseAmount");
const gstAmount = document.getElementById("gstAmount");
const cgst = document.getElementById("cgst");
const sgst = document.getElementById("sgst");
const rateResult = document.getElementById("rateResult");

const formula = document.getElementById("formula");


function formatRupees(value) {

    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
}


calculateBtn.addEventListener("click", calculateGST);

clearBtn.addEventListener("click", clearCalculator);


function calculateGST() {

    error.textContent = "";

    const amount = Number(amountInput.value);
    const rate = Number(gstRateInput.value);
    const type = gstTypeInput.value;

    if (
        amountInput.value.trim() === "" ||
        !Number.isFinite(amount) ||
        amount < 0
    ) {
        error.textContent = "Please enter a valid amount.";
        return;
    }

    if (
        !Number.isFinite(rate) ||
        rate < 0
    ) {
        error.textContent = "Please select a valid GST rate.";
        return;
    }


    let base;
    let gst;
    let total;


    if (type === "exclusive") {

        /*
         * Example:
         * Amount = ₹1000
         * GST = 18%
         *
         * GST = ₹180
         * Total = ₹1180
         */

        base = amount;

        gst = base * rate / 100;

        total = base + gst;

        formula.textContent =
            `GST = ${formatRupees(base)} × ${rate}% ÷ 100`;

    } else {

        /*
         * Inclusive means the entered amount
         * already contains GST.
         */

        total = amount;

        base = total / (1 + rate / 100);

        gst = total - base;

        formula.textContent =
            `Base Amount = Inclusive Amount ÷ (1 + GST Rate ÷ 100)`;
    }


    const cgstValue = gst / 2;
    const sgstValue = gst / 2;


    baseAmount.textContent =
        formatRupees(base);

    gstAmount.textContent =
        formatRupees(gst);

    cgst.textContent =
        formatRupees(cgstValue);

    sgst.textContent =
        formatRupees(sgstValue);

    finalAmount.textContent =
        formatRupees(total);

    rateResult.textContent =
        `${rate}%`;
}


function clearCalculator() {

    amountInput.value = "";

    gstRateInput.value = "18";

    gstTypeInput.value = "exclusive";


    finalAmount.textContent =
        "₹0.00";

    baseAmount.textContent =
        "₹0.00";

    gstAmount.textContent =
        "₹0.00";

    cgst.textContent =
        "₹0.00";

    sgst.textContent =
        "₹0.00";

    rateResult.textContent =
        "0%";

    formula.textContent =
        "GST = Amount × GST Rate ÷ 100";

    error.textContent = "";
}