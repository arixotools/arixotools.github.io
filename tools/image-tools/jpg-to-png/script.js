let selectedFile = null;

const imageInput =
  document.getElementById("imageInput");

const preview =
  document.getElementById("preview");

const previewBox =
  document.getElementById("previewBox");

const fileName =
  document.getElementById("fileName");

const result =
  document.getElementById("result");

const downloadBtn =
  document.getElementById("downloadBtn");


function loadImage(event) {

  const file =
    event.target.files[0];

  if (!file) {
    return;
  }

  if (
    file.type !== "image/jpeg" &&
    file.type !== "image/jpg"
  ) {

    result.textContent =
      "Please choose a JPG or JPEG image.";

    imageInput.value = "";

    return;
  }

  selectedFile = file;

  fileName.textContent =
    file.name;

  const reader =
    new FileReader();

  reader.onload = function(e) {

    preview.src =
      e.target.result;

    previewBox.style.display =
      "block";
  };

  reader.readAsDataURL(file);

  result.textContent = "";

  downloadBtn.style.display =
    "none";
}


function convertToPNG() {

  if (!selectedFile) {

    result.textContent =
      "Please choose a JPG image first.";

    return;
  }

  const image =
    new Image();

  image.onload = function() {

    const canvas =
      document.createElement("canvas");

    canvas.width =
      image.naturalWidth;

    canvas.height =
      image.naturalHeight;

    const ctx =
      canvas.getContext("2d");

    ctx.drawImage(
      image,
      0,
      0
    );

    canvas.toBlob(
      function(blob) {

        if (!blob) {

          result.textContent =
            "Conversion failed.";

          return;
        }

        const oldUrl =
          downloadBtn.href;

        if (oldUrl) {

          URL.revokeObjectURL(
            oldUrl
          );
        }

        const downloadUrl =
          URL.createObjectURL(blob);

        downloadBtn.href =
          downloadUrl;

        downloadBtn.style.display =
          "block";

        const sizeKB =
          (blob.size / 1024).toFixed(1);

        result.innerHTML =
          `Converted successfully!<br>
           PNG Size: ${sizeKB} KB<br>
           Resolution: ${canvas.width} × ${canvas.height} px`;
      },
      "image/png"
    );
  };

  image.src =
    URL.createObjectURL(selectedFile);
}


function clearTool() {

  imageInput.value = "";

  selectedFile = null;

  preview.src = "";

  previewBox.style.display =
    "none";

  fileName.textContent =
    "No image selected";

  result.textContent = "";

  downloadBtn.style.display =
    "none";
}