let selectedImage = null;

let originalWidth = 0;
let originalHeight = 0;

const imageInput =
  document.getElementById("imageInput");

const preview =
  document.getElementById("preview");

const fileName =
  document.getElementById("fileName");

const widthInput =
  document.getElementById("width");

const heightInput =
  document.getElementById("height");

const keepRatio =
  document.getElementById("keepRatio");

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

  selectedImage = file;

  fileName.textContent =
    file.name;

  const reader =
    new FileReader();

  reader.onload = function(e) {

    preview.src =
      e.target.result;

    preview.onload = function() {

      originalWidth =
        preview.naturalWidth;

      originalHeight =
        preview.naturalHeight;

      widthInput.value =
        originalWidth;

      heightInput.value =
        originalHeight;

      document.querySelector(".preview-box")
        .style.display = "block";

      document.querySelector(".resize-box")
        .style.display = "grid";

      document.querySelector(".checkbox")
        .style.display = "block";

      document.getElementById("dimensions")
        .textContent =
        `Original size: ${originalWidth} × ${originalHeight} px`;

    };

  };

  reader.readAsDataURL(file);

  result.textContent = "";

  downloadBtn.style.display = "none";
}


widthInput.addEventListener(
  "input",
  function() {

    if (!keepRatio.checked) {
      return;
    }

    if (originalWidth === 0) {
      return;
    }

    const newWidth =
      Number(widthInput.value);

    const newHeight =
      Math.round(
        newWidth *
        originalHeight /
        originalWidth
      );

    heightInput.value =
      newHeight;
  }
);


heightInput.addEventListener(
  "input",
  function() {

    if (!keepRatio.checked) {
      return;
    }

    if (originalHeight === 0) {
      return;
    }

    const newHeight =
      Number(heightInput.value);

    const newWidth =
      Math.round(
        newHeight *
        originalWidth /
        originalHeight
      );

    widthInput.value =
      newWidth;
  }
);


function resizeImage() {

  if (!selectedImage) {

    result.textContent =
      "Please choose an image first.";

    return;
  }

  const newWidth =
    Number(widthInput.value);

  const newHeight =
    Number(heightInput.value);

  if (
    newWidth <= 0 ||
    newHeight <= 0
  ) {

    result.textContent =
      "Please enter valid width and height.";

    return;
  }

  const image =
    new Image();

  image.onload = function() {

    const canvas =
      document.createElement("canvas");

    canvas.width =
      newWidth;

    canvas.height =
      newHeight;

    const ctx =
      canvas.getContext("2d");

    ctx.drawImage(
      image,
      0,
      0,
      newWidth,
      newHeight
    );

    canvas.toBlob(
      function(blob) {

        if (!blob) {
          return;
        }

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

        result.textContent =
          `New size: ${newWidth} × ${newHeight} px`;

      },
      "image/jpeg",
      0.92
    );

  };

  image.src =
    URL.createObjectURL(selectedImage);
}


function clearTool() {

  imageInput.value = "";

  selectedImage = null;

  originalWidth = 0;
  originalHeight = 0;

  preview.src = "";

  fileName.textContent =
    "No image selected";

  widthInput.value = "";
  heightInput.value = "";

  result.textContent = "";

  downloadBtn.style.display =
    "none";

  document.querySelector(".preview-box")
    .style.display = "none";

  document.querySelector(".resize-box")
    .style.display = "none";

  document.querySelector(".checkbox")
    .style.display = "none";
}