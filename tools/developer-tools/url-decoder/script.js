const textInput = document.getElementById("textInput");
const output = document.getElementById("output");
const result = document.getElementById("result");

function decodeURL() {

    const text = textInput.value.trim();

    if (!text) {
        result.textContent = "Please enter encoded text first.";
        result.className = "error";
        return;
    }

    try {

        output.value = decodeURIComponent(text);

        result.textContent = "✓ URL decoded successfully.";
        result.className = "success";

    } catch (error) {

        output.value = "";

        result.textContent = "✕ Invalid URL encoding.";
        result.className = "error";
    }
}

async function copyResult() {

    if (!output.value) {
        result.textContent = "Nothing to copy.";
        result.className = "error";
        return;
    }

    try {

        await navigator.clipboard.writeText(output.value);

        result.textContent = "✓ Decoded text copied to clipboard.";
        result.className = "success";

    } catch (error) {

        result.textContent = "Copy failed. Please copy manually.";
        result.className = "error";
    }
}

function clearTool() {

    textInput.value = "";
    output.value = "";

    result.textContent = "";
    result.className = "";
}