let selectedFile = null;

const imageInput =
  document.getElementById("imageInput");

const preview =
  document.getElementById("preview");

const previewBox =
  document.getElementById("previewBox");

const qualityBox =
  document.getElementById("qualityBox");

const quality =
  document.getElementById("quality");

const qualityValue =
  document.getElementById("qualityValue");

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

    qualityBox.style.display =
      "block";
  };

  reader.readAsDataURL(file);

  result.textContent = "";

  downloadBtn.style.display =
    "none";
}


function updateQuality() {

  qualityValue.textContent =
    quality.value + "%";
}


function convertToJPG() {

  if (!selectedFile) {

    result.textContent =
      "Please choose an image first.";

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

    /*
      JPG does not support transparency.
      Use white background for transparent images.
    */

    ctx.fillStyle =
      "#ffffff";

    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

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
           JPG Size: ${sizeKB} KB<br>
           Resolution: ${canvas.width} × ${canvas.height} px`;
      },
      "image/jpeg",
      Number(quality.value) / 100
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

  qualityBox.style.display =
    "none";

  quality.value =
    90;

  qualityValue.textContent =
    "90%";

  fileName.textContent =
    "No image selected";

  result.textContent = "";

  downloadBtn.style.display =
    "none";
}