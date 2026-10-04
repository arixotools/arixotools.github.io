const originalPriceInput =
    document.getElementById("originalPrice");

const discountPercentInput =
    document.getElementById("discountPercent");

const calculateBtn =
    document.getElementById("calculateBtn");

const clearBtn =
    document.getElementById("clearBtn");

const discountAmount =
    document.getElementById("discountAmount");

const finalPrice =
    document.getElementById("finalPrice");

const youSave =
    document.getElementById("youSave");

const message =
    document.getElementById("message");


calculateBtn.addEventListener("click", calculateDiscount);


clearBtn.addEventListener("click", clearAll);


function calculateDiscount() {

    const priceValue = originalPriceInput.value;
    const discountValue = discountPercentInput.value;

    message.textContent = "";


    if (priceValue === "" || discountValue === "") {

        message.textContent =
            "Please enter the original price and discount percentage.";

        return;
    }


    const price = Number(priceValue);
    const discount = Number(discountValue);


    if (!Number.isFinite(price) || !Number.isFinite(discount)) {

        message.textContent =
            "Please enter valid numbers.";

        return;
    }


    if (price < 0) {

        message.textContent =
            "Original price cannot be negative.";

        return;
    }


    if (discount < 0 || discount > 100) {

        message.textContent =
            "Discount must be between 0% and 100%.";

        return;
    }


    const amount = price * (discount / 100);

    const final = price - amount;


    discountAmount.textContent =
        formatCurrency(amount);

    finalPrice.textContent =
        formatCurrency(final);

    youSave.textContent =
        formatCurrency(amount);
}


function formatCurrency(value) {

    return "₹" + value.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}


function clearAll() {

    originalPriceInput.value = "";

    discountPercentInput.value = "";

    discountAmount.textContent = "₹0.00";

    finalPrice.textContent = "₹0.00";

    youSave.textContent = "₹0.00";

    message.textContent = "";
}