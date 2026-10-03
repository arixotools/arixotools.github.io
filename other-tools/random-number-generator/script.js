const minInput = document.getElementById("min");
const maxInput = document.getElementById("max");
const quantityInput = document.getElementById("quantity");

const allowDuplicates = document.getElementById("allowDuplicates");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");

const output = document.getElementById("output");
const result = document.getElementById("result");


function generateNumbers() {

    const min = Number(minInput.value);
    const max = Number(maxInput.value);
    const quantity = Number(quantityInput.value);

    result.className = "";

    // Validation
    if (!Number.isFinite(min) || !Number.isFinite(max)) {
        result.textContent = "Please enter valid minimum and maximum numbers.";
        result.className = "error";
        return;
    }

    if (min > max) {
        result.textContent = "Minimum number cannot be greater than maximum number.";
        result.className = "error";
        return;
    }

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 100) {
        result.textContent = "Quantity must be between 1 and 100.";
        result.className = "error";
        return;
    }

    const range = max - min + 1;

    if (!allowDuplicates.checked && quantity > range) {
        result.textContent =
            "Cannot generate that many unique numbers from this range.";

        result.className = "error";
        return;
    }

    const numbers = [];

    // Allow duplicates
    if (allowDuplicates.checked) {

        for (let i = 0; i < quantity; i++) {

            const randomNumber =
                Math.floor(Math.random() * range) + min;

            numbers.push(randomNumber);
        }

    }

    // No duplicates
    else {

        const uniqueNumbers = new Set();

        while (uniqueNumbers.size < quantity) {

            const randomNumber =
                Math.floor(Math.random() * range) + min;

            uniqueNumbers.add(randomNumber);
        }

        numbers.push(...uniqueNumbers);
    }

    output.value = numbers.join(", ");

    result.textContent =
        `${quantity} random number${quantity > 1 ? "s" : ""} generated successfully.`;

    result.className = "success";
}


// Copy
copyBtn.addEventListener("click", async () => {

    if (!output.value) {
        result.textContent = "Nothing to copy.";
        result.className = "error";
        return;
    }

    try {

        await navigator.clipboard.writeText(output.value);

        result.textContent = "Copied successfully!";
        result.className = "success";

    } catch (error) {

        output.select();

        document.execCommand("copy");

        result.textContent = "Copied successfully!";
        result.className = "success";
    }
});


// Clear
clearBtn.addEventListener("click", () => {

    output.value = "";

    result.textContent = "";

    result.className = "";

    minInput.value = 1;
    maxInput.value = 100;
    quantityInput.value = 1;

    allowDuplicates.checked = true;
});


// Generate
generateBtn.addEventListener("click", generateNumbers);