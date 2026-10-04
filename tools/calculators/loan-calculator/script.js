const loanAmountInput = document.getElementById("loanAmount");
const interestRateInput = document.getElementById("interestRate");
const loanYearsInput = document.getElementById("loanYears");

const calculateBtn = document.getElementById("calculateBtn");
const clearBtn = document.getElementById("clearBtn");

const monthlyPayment = document.getElementById("monthlyPayment");
const principalAmount = document.getElementById("principalAmount");
const totalInterest = document.getElementById("totalInterest");
const totalPayment = document.getElementById("totalPayment");
const totalMonths = document.getElementById("totalMonths");

const error = document.getElementById("error");

calculateBtn.addEventListener("click", calculateLoan);

clearBtn.addEventListener("click", clearCalculator);

function formatRupees(amount) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

function calculateLoan() {

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

    let payment;

    if (monthlyRate === 0) {

        payment = principal / months;

    } else {

        const factor = Math.pow(
            1 + monthlyRate,
            months
        );

        payment =
            (principal * monthlyRate * factor) /
            (factor - 1);
    }

    const totalPaymentAmount = payment * months;

    const totalInterestAmount =
        totalPaymentAmount - principal;

    monthlyPayment.textContent =
        formatRupees(payment);

    principalAmount.textContent =
        formatRupees(principal);

    totalInterest.textContent =
        formatRupees(totalInterestAmount);

    totalPayment.textContent =
        formatRupees(totalPaymentAmount);

    totalMonths.textContent = months;
}

function clearCalculator() {

    loanAmountInput.value = "";
    interestRateInput.value = "";
    loanYearsInput.value = "";

    monthlyPayment.textContent = "₹0.00";
    principalAmount.textContent = "₹0.00";
    totalInterest.textContent = "₹0.00";
    totalPayment.textContent = "₹0.00";
    totalMonths.textContent = "0";

    error.textContent = "";
}