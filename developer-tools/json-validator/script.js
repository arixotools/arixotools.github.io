const input = document.getElementById("jsonInput");
const result = document.getElementById("result");

function validateJSON() {
    const value = input.value.trim();

    if (!value) {
        result.textContent = "Please paste JSON first.";
        result.className = "error";
        return;
    }

    try {
        JSON.parse(value);

        result.textContent = "✓ Valid JSON — No errors found.";
        result.className = "success";

    } catch (error) {
        result.textContent = "✕ Invalid JSON: " + error.message;
        result.className = "error";
    }
}

function formatJSON() {
    const value = input.value.trim();

    if (!value) {
        result.textContent = "Please paste JSON first.";
        result.className = "error";
        return;
    }

    try {
        const parsedJSON = JSON.parse(value);

        input.value = JSON.stringify(parsedJSON, null, 2);

        result.textContent = "✓ Valid JSON — Formatted successfully.";
        result.className = "success";

    } catch (error) {
        result.textContent = "✕ Invalid JSON: " + error.message;
        result.className = "error";
    }
}

async function copyJSON() {
    const value = input.value.trim();

    if (!value) {
        result.textContent = "Nothing to copy.";
        result.className = "error";
        return;
    }

    try {
        await navigator.clipboard.writeText(input.value);

        result.textContent = "✓ JSON copied to clipboard.";
        result.className = "success";

    } catch (error) {
        result.textContent = "Copy failed. Please copy manually.";
        result.className = "error";
    }
}

function clearTool() {
    input.value = "";
    result.textContent = "";
    result.className = "";
}