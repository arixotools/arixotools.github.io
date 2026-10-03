let selectedImage = null;

const imageInput =
  document.getElementById("imageInput");

const preview =
  document.getElementById("preview");

const fileName =
  document.getElementById("fileName");

const quality =
  document.getElementById("quality");

const qualityValue =
  document.getElementById("qualityValue");

const result =
  document.getElementById("result");

const downloadBtn =
  document.getElementById("downloadBtn");


function loadImage(event) {

  const file = event.target.files[0];

  if (!file) {
    return;
  }

  selectedImage = file;

  fileName.textContent =
    file.name;

  const reader =
    new FileReader();

  reader.onload = function(e) {

    preview.src =
      e.target.result;

    document.querySelector(".preview-box")
      .style.display = "block";

    document.querySelector(".quality-box")
      .style.display = "block";

    result.textContent = "";

    downloadBtn.style.display = "none";
  };

  reader.readAsDataURL(file);
}


function updateQuality() {

  qualityValue.textContent =
    quality.value + "%";
}


function compressImage() {

  if (!selectedImage) {

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
      image.width;

    canvas.height =
      image.height;

    const ctx =
      canvas.getContext("2d");

    ctx.drawImage(
      image,
      0,
      0
    );

    const compression =
      Number(quality.value) / 100;

    canvas.toBlob(
      function(blob) {

        if (!blob) {
          return;
        }

        const originalSize =
          (selectedImage.size / 1024).toFixed(2);

        const compressedSize =
          (blob.size / 1024).toFixed(2);

        const oldUrl =
          downloadBtn.href;

        if (oldUrl) {
          URL.revokeObjectURL(oldUrl);
        }

        const downloadUrl =
          URL.createObjectURL(blob);

        downloadBtn.href =
          downloadUrl;

        downloadBtn.style.display =
          "block";

        result.innerHTML =
          `Original: ${originalSize} KB<br>
           Compressed: ${compressedSize} KB`;

      },
      "image/jpeg",
      compression
    );
  };

  image.src =
    URL.createObjectURL(selectedImage);
}


function clearTool() {

  imageInput.value = "";

  selectedImage = null;

  preview.src = "";

  fileName.textContent =
    "No image selected";

  result.textContent = "";

  downloadBtn.style.display =
    "none";

  document.querySelector(".preview-box")
    .style.display = "none";

  document.querySelector(".quality-box")
    .style.display = "none";
}