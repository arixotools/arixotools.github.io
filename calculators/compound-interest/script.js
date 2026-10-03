const principalInput = document.getElementById("principal");
const rateInput = document.getElementById("rate");
const timeInput = document.getElementById("time");
const frequencyInput = document.getElementById("frequency");

const calculateBtn = document.getElementById("calculateBtn");
const clearBtn = document.getElementById("clearBtn");

const compoundInterest = document.getElementById("compoundInterest");
const principalResult = document.getElementById("principalResult");
const rateResult = document.getElementById("rateResult");
const timeResult = document.getElementById("timeResult");
const finalAmount = document.getElementById("finalAmount");

const error = document.getElementById("error");

calculateBtn.addEventListener("click", calculateCompoundInterest);
clearBtn.addEventListener("click", clearCalculator);

function formatRupees(amount) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

function calculateCompoundInterest() {

    error.textContent = "";

    const principal = parseFloat(principalInput.value);
    const rate = parseFloat(rateInput.value);
    const time = parseFloat(timeInput.value);
    const frequency = parseInt(frequencyInput.value);

    if (isNaN(principal) || principal <= 0) {
        error.textContent = "Please enter a valid principal amount.";
        return;
    }

    if (isNaN(rate) || rate < 0) {
        error.textContent = "Please enter a valid interest rate.";
        return;
    }

    if (isNaN(time) || time <= 0) {
        error.textContent = "Please enter a valid time.";
        return;
    }

    if (!frequency || frequency <= 0) {
        error.textContent = "Please select a compounding frequency.";
        return;
    }

    const rateDecimal = rate / 100;

    const amount =
        principal *
        Math.pow(
            1 + rateDecimal / frequency,
            frequency * time
        );

    const interest = amount - principal;

    compoundInterest.textContent =
        formatRupees(interest);

    principalResult.textContent =
        formatRupees(principal);

    rateResult.textContent =
        `${rate}%`;

    timeResult.textContent =
        `${time} ${time === 1 ? "Year" : "Years"}`;

    finalAmount.textContent =
        formatRupees(amount);
}

function clearCalculator() {

    principalInput.value = "";
    rateInput.value = "";
    timeInput.value = "";

    frequencyInput.value = "12";

    compoundInterest.textContent = "₹0.00";
    principalResult.textContent = "₹0.00";
    rateResult.textContent = "0%";
    timeResult.textContent = "0 Years";
    finalAmount.textContent = "₹0.00";

    error.textContent = "";
}