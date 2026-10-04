const principalInput = document.getElementById("principal");
const rateInput = document.getElementById("rate");
const timeInput = document.getElementById("time");

const calculateBtn = document.getElementById("calculateBtn");
const clearBtn = document.getElementById("clearBtn");

const simpleInterest = document.getElementById("simpleInterest");
const principalResult = document.getElementById("principalResult");
const rateResult = document.getElementById("rateResult");
const timeResult = document.getElementById("timeResult");
const totalAmount = document.getElementById("totalAmount");

const error = document.getElementById("error");

calculateBtn.addEventListener("click", calculateSimpleInterest);

clearBtn.addEventListener("click", clearCalculator);

function formatRupees(amount) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

function calculateSimpleInterest() {

    error.textContent = "";

    const principal = parseFloat(principalInput.value);
    const rate = parseFloat(rateInput.value);
    const time = parseFloat(timeInput.value);

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

    const interest =
        (principal * rate * time) / 100;

    const total =
        principal + interest;

    simpleInterest.textContent =
        formatRupees(interest);

    principalResult.textContent =
        formatRupees(principal);

    rateResult.textContent =
        `${rate}%`;

    timeResult.textContent =
        `${time} ${time === 1 ? "Year" : "Years"}`;

    totalAmount.textContent =
        formatRupees(total);
}

function clearCalculator() {

    principalInput.value = "";
    rateInput.value = "";
    timeInput.value = "";

    simpleInterest.textContent = "₹0.00";
    principalResult.textContent = "₹0.00";
    rateResult.textContent = "0%";
    timeResult.textContent = "0 Years";
    totalAmount.textContent = "₹0.00";

    error.textContent = "";
}