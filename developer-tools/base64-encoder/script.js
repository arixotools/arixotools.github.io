const textInput = document.getElementById("textInput");
const output = document.getElementById("output");
const result = document.getElementById("result");

function encodeText() {

    const text = textInput.value;

    if (!text.trim()) {
        result.textContent = "Please enter some text first.";
        result.className = "error";
        return;
    }

    try {

        const encoded = btoa(
            unescape(
                encodeURIComponent(text)
            )
        );

        output.value = encoded;

        result.textContent = "✓ Text encoded successfully.";
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

        result.textContent = "✓ Base64 copied to clipboard.";
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