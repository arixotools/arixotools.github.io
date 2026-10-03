const qrInput = document.getElementById("qrInput");
const qrBox = document.getElementById("qrBox");
const result = document.getElementById("result");

let qrImage = null;

function generateQR() {

    const text = qrInput.value.trim();

    if (!text) {
        result.textContent = "Please enter text or a URL first.";
        result.className = "error";
        return;
    }

    qrBox.innerHTML = "";

    qrImage = document.createElement("img");

    qrImage.src =
        "https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=" +
        encodeURIComponent(text);

    qrImage.alt = "Generated QR Code";

    qrImage.onload = function () {

        result.textContent = "✓ QR code generated successfully.";
        result.className = "success";
    };

    qrImage.onerror = function () {

        result.textContent = "✕ Failed to generate QR code.";
        result.className = "error";
        qrImage = null;
    };

    qrBox.appendChild(qrImage);
}

function downloadQR() {

    if (!qrImage) {
        result.textContent = "Please generate a QR code first.";
        result.className = "error";
        return;
    }

    const link = document.createElement("a");

    link.href = qrImage.src;

    link.download = "arixo-qr-code.png";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    result.textContent = "✓ QR code download started.";
    result.className = "success";
}

function clearTool() {

    qrInput.value = "";

    qrBox.innerHTML =
        '<p id="qrPlaceholder">Your QR code will appear here.</p>';

    qrImage = null;

    result.textContent = "";
    result.className = "";
}