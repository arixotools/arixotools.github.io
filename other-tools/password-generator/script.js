const passwordOutput = document.getElementById("passwordOutput");
const lengthInput = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

const strength = document.getElementById("strength");
const result = document.getElementById("result");

function updateLength() {
    lengthValue.textContent = lengthInput.value;
}

function generatePassword() {

    const length = Number(lengthInput.value);

    let characters = "";

    if (uppercase.checked) {
        characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }

    if (lowercase.checked) {
        characters += "abcdefghijklmnopqrstuvwxyz";
    }

    if (numbers.checked) {
        characters += "0123456789";
    }

    if (symbols.checked) {
        characters += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    }

    if (!characters) {
        result.textContent =
            "Please select at least one character type.";

        result.style.color = "#fb7185";

        return;
    }

    let password = "";

    const randomArray = new Uint32Array(length);

    crypto.getRandomValues(randomArray);

    for (let i = 0; i < length; i++) {

        password +=
            characters[randomArray[i] % characters.length];
    }

    passwordOutput.value = password;

    showStrength(password);

    result.textContent = "✓ Strong password generated.";
    result.style.color = "#4ade80";
}

function showStrength(password) {

    strength.className = "";

    let score = 0;

    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) {

        strength.textContent = "Password Strength: Weak";
        strength.className = "weak";

    } else if (score <= 4) {

        strength.textContent = "Password Strength: Medium";
        strength.className = "medium";

    } else {

        strength.textContent = "Password Strength: Strong";
        strength.className = "strong";
    }
}

async function copyPassword() {

    if (!passwordOutput.value) {

        result.textContent =
            "Generate a password first.";

        result.style.color = "#fb7185";

        return;
    }

    try {

        await navigator.clipboard.writeText(
            passwordOutput.value
        );

        result.textContent =
            "✓ Password copied to clipboard.";

        result.style.color = "#4ade80";

    } catch (error) {

        result.textContent =
            "Copy failed. Please copy manually.";

        result.style.color = "#fb7185";
    }
}

function clearTool() {

    passwordOutput.value = "";

    strength.textContent = "";

    strength.className = "";

    result.textContent = "";

    lengthInput.value = 16;

    updateLength();
}