const base64Input = document.getElementById("base64Input");
const output = document.getElementById("output");
const result = document.getElementById("result");

function decodeText() {

    const value = base64Input.value.trim();

    if (!value) {
        result.textContent = "Please enter Base64 text first.";
        result.className = "error";
        return;
    }

    try {

        const binary = atob(value);

        const bytes = Uint8Array.from(
            binary,
            char => char.charCodeAt(0)
        );

        const decoded = new TextDecoder().decode(bytes);

        output.value = decoded;

        result.textContent = "✓ Base64 decoded successfully.";
        result.className = "success";

    } catch (error) {

        output.value = "";

        result.textContent = "✕ Invalid Base64 text.";
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

    base64Input.value = "";
    output.value = "";

    result.textContent = "";
    result.className = "";
}