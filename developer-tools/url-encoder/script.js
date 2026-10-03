const textInput = document.getElementById("textInput");
const output = document.getElementById("output");
const result = document.getElementById("result");

function encodeURL() {

    const text = textInput.value;

    if (!text.trim()) {
        result.textContent = "Please enter text or URL first.";
        result.className = "error";
        return;
    }

    try {

        output.value = encodeURIComponent(text);

        result.textContent = "✓ URL encoded successfully.";
        result.className = "success";

    } catch (error) {

        result.textContent = "✕ Encoding failed.";
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

        result.textContent = "✓ Encoded URL copied to clipboard.";
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