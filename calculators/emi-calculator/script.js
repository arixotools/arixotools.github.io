const loanAmountInput = document.getElementById("loanAmount");
const interestRateInput = document.getElementById("interestRate");
const loanYearsInput = document.getElementById("loanYears");

const calculateBtn = document.getElementById("calculateBtn");
const clearBtn = document.getElementById("clearBtn");

const monthlyEmi = document.getElementById("monthlyEmi");
const totalInterest = document.getElementById("totalInterest");
const totalPayment = document.getElementById("totalPayment");

const error = document.getElementById("error");

calculateBtn.addEventListener("click", calculateEMI);

clearBtn.addEventListener("click", clearCalculator);

function formatRupees(amount) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

function calculateEMI() {

    error.textContent = "";

    const principal = parseFloat(loanAmountInput.value);
    const annualRate = parseFloat(interestRateInput.value);
    const years = parseFloat(loanYearsInput.value);

    if (!principal || principal <= 0) {
        error.textContent = "Please enter a valid loan amount.";
        return;
    }

    if (isNaN(annualRate) || annualRate < 0) {
        error.textContent = "Please enter a valid interest rate.";
        return;
    }

    if (!years || years <= 0) {
        error.textContent = "Please enter a valid loan tenure.";
        return;
    }

    const months = Math.round(years * 12);

    const monthlyRate = annualRate / 12 / 100;

    let emi;

    // If interest rate is 0%
    if (monthlyRate === 0) {

        emi = principal / months;

    } else {

        const power = Math.pow(1 + monthlyRate, months);

        emi =
            (principal * monthlyRate * power) /
            (power - 1);
    }

    const totalPaymentAmount = emi * months;

    const totalInterestAmount =
        totalPaymentAmount - principal;

    monthlyEmi.textContent =
        formatRupees(emi);

    totalInterest.textContent =
        formatRupees(totalInterestAmount);

    totalPayment.textContent =
        formatRupees(totalPaymentAmount);
}

function clearCalculator() {

    loanAmountInput.value = "";
    interestRateInput.value = "";
    loanYearsInput.value = "";

    monthlyEmi.textContent = "₹0.00";
    totalInterest.textContent = "₹0.00";
    totalPayment.textContent = "₹0.00";

    error.textContent = "";
}