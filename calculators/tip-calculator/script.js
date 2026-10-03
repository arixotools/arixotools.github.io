const billAmountInput = document.getElementById("billAmount");
const tipPercentInput = document.getElementById("tipPercent");
const peopleInput = document.getElementById("people");

const calculateBtn = document.getElementById("calculateBtn");
const clearBtn = document.getElementById("clearBtn");

const error = document.getElementById("error");

const perPerson = document.getElementById("perPerson");
const billResult = document.getElementById("billResult");
const tipAmount = document.getElementById("tipAmount");
const totalBill = document.getElementById("totalBill");
const tipResult = document.getElementById("tipResult");
const peopleResult = document.getElementById("peopleResult");


function formatRupees(value) {

    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
}


calculateBtn.addEventListener("click", calculateTip);

clearBtn.addEventListener("click", clearCalculator);


function calculateTip() {

    error.textContent = "";

    const bill = Number(billAmountInput.value);
    const tipPercent = Number(tipPercentInput.value);
    const people = Number(peopleInput.value);


    if (
        billAmountInput.value.trim() === "" ||
        !Number.isFinite(bill) ||
        bill <= 0
    ) {

        error.textContent =
            "Please enter a valid bill amount.";

        return;
    }


    if (
        tipPercentInput.value.trim() === "" ||
        !Number.isFinite(tipPercent) ||
        tipPercent < 0
    ) {

        error.textContent =
            "Please enter a valid tip percentage.";

        return;
    }


    if (
        peopleInput.value.trim() === "" ||
        !Number.isFinite(people) ||
        people < 1
    ) {

        error.textContent =
            "Number of people must be at least 1.";

        return;
    }


    const tip = bill * tipPercent / 100;

    const total = bill + tip;

    const amountPerPerson = total / people;


    billResult.textContent =
        formatRupees(bill);


    tipAmount.textContent =
        formatRupees(tip);


    totalBill.textContent =
        formatRupees(total);


    perPerson.textContent =
        formatRupees(amountPerPerson);


    tipResult.textContent =
        `${tipPercent}%`;


    peopleResult.textContent =
        people;
}


function clearCalculator() {

    billAmountInput.value = "";

    tipPercentInput.value = "10";

    peopleInput.value = "1";


    perPerson.textContent =
        "₹0.00";


    billResult.textContent =
        "₹0.00";


    tipAmount.textContent =
        "₹0.00";


    totalBill.textContent =
        "₹0.00";


    tipResult.textContent =
        "0%";


    peopleResult.textContent =
        "0";


    error.textContent = "";
}