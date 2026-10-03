let selectedImage = null;

let imageNaturalWidth = 0;
let imageNaturalHeight = 0;

let action = null;

let startX = 0;
let startY = 0;

let startLeft = 0;
let startTop = 0;

let startWidth = 0;
let startHeight = 0;

const imageInput =
  document.getElementById("imageInput");

const preview =
  document.getElementById("preview");

const cropArea =
  document.getElementById("cropArea");

const cropBox =
  document.getElementById("cropBox");

const fileName =
  document.getElementById("fileName");

const cropWidth =
  document.getElementById("cropWidth");

const cropHeight =
  document.getElementById("cropHeight");

const result =
  document.getElementById("result");

const downloadBtn =
  document.getElementById("downloadBtn");


/* LOAD IMAGE */

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

      imageNaturalWidth =
        preview.naturalWidth;

      imageNaturalHeight =
        preview.naturalHeight;

      cropArea.style.display =
        "block";

      setTimeout(() => {

        resetCropBox();

        updateCropInfo();

      }, 50);
    };
  };

  reader.readAsDataURL(file);

  result.textContent = "";

  downloadBtn.style.display =
    "none";
}


/* RESET */

function resetCropBox() {

  cropBox.style.left =
    "10%";

  cropBox.style.top =
    "10%";

  cropBox.style.width =
    "50%";

  cropBox.style.height =
    "50%";
}


/* UPDATE SIZE */

function updateCropInfo() {

  const imageRect =
    preview.getBoundingClientRect();

  const cropRect =
    cropBox.getBoundingClientRect();

  if (
    imageRect.width === 0 ||
    imageRect.height === 0
  ) {
    return;
  }

  const scaleX =
    imageNaturalWidth /
    imageRect.width;

  const scaleY =
    imageNaturalHeight /
    imageRect.height;

  const width =
    Math.round(
      cropRect.width * scaleX
    );

  const height =
    Math.round(
      cropRect.height * scaleY
    );

  cropWidth.textContent =
    width;

  cropHeight.textContent =
    height;
}


/* HANDLE ACTION */

document.querySelectorAll(".handle")
  .forEach(handle => {

    handle.addEventListener(
      "pointerdown",
      function(event) {

        event.preventDefault();

        event.stopPropagation();

        action =
          handle.dataset.direction;

        startX =
          event.clientX;

        startY =
          event.clientY;

        startLeft =
          cropBox.offsetLeft;

        startTop =
          cropBox.offsetTop;

        startWidth =
          cropBox.offsetWidth;

        startHeight =
          cropBox.offsetHeight;

        handle.setPointerCapture(
          event.pointerId
        );
      }
    );

  });


/* CROP BOX MOVE */

cropBox.addEventListener(
  "pointerdown",
  function(event) {

    if (
      event.target.classList.contains("handle")
    ) {
      return;
    }

    event.preventDefault();

    action =
      "move";

    startX =
      event.clientX;

    startY =
      event.clientY;

    startLeft =
      cropBox.offsetLeft;

    startTop =
      cropBox.offsetTop;

    startWidth =
      cropBox.offsetWidth;

    startHeight =
      cropBox.offsetHeight;

    cropBox.setPointerCapture(
      event.pointerId
    );
  }
);


/* POINTER MOVE */

document.addEventListener(
  "pointermove",
  function(event) {

    if (!action) {
      return;
    }

    const areaWidth =
      cropArea.clientWidth;

    const areaHeight =
      cropArea.clientHeight;

    const dx =
      event.clientX - startX;

    const dy =
      event.clientY - startY;

    const minSize = 50;

    let left =
      startLeft;

    let top =
      startTop;

    let width =
      startWidth;

    let height =
      startHeight;


    /* MOVE */

    if (action === "move") {

      left =
        startLeft + dx;

      top =
        startTop + dy;

      left =
        Math.max(
          0,
          Math.min(
            left,
            areaWidth - width
          )
        );

      top =
        Math.max(
          0,
          Math.min(
            top,
            areaHeight - height
          )
        );
    }


    /* NORTH */

    if (action.includes("n")) {

      const newTop =
        Math.max(
          0,
          Math.min(
            startTop + dy,
            startTop + startHeight - minSize
          )
        );

      top =
        newTop;

      height =
        startHeight +
        (startTop - newTop);
    }


    /* SOUTH */

    if (action.includes("s")) {

      height =
        Math.max(
          minSize,
          Math.min(
            startHeight + dy,
            areaHeight - startTop
          )
        );
    }


    /* WEST */

    if (action.includes("w")) {

      const newLeft =
        Math.max(
          0,
          Math.min(
            startLeft + dx,
            startLeft + startWidth - minSize
          )
        );

      left =
        newLeft;

      width =
        startWidth +
        (startLeft - newLeft);
    }


    /* EAST */

    if (action.includes("e")) {

      width =
        Math.max(
          minSize,
          Math.min(
            startWidth + dx,
            areaWidth - startLeft
          )
        );
    }


    cropBox.style.left =
      left + "px";

    cropBox.style.top =
      top + "px";

    cropBox.style.width =
      width + "px";

    cropBox.style.height =
      height + "px";

    updateCropInfo();
  }
);


/* POINTER UP */

document.addEventListener(
  "pointerup",
  function() {

    action = null;
  }
);


/* CROP IMAGE */

function cropImage() {

  if (!selectedImage) {

    result.textContent =
      "Please choose an image first.";

    return;
  }

  const imageRect =
    preview.getBoundingClientRect();

  const cropRect =
    cropBox.getBoundingClientRect();

  const scaleX =
    imageNaturalWidth /
    imageRect.width;

  const scaleY =
    imageNaturalHeight /
    imageRect.height;

  const sourceX =
    (cropRect.left - imageRect.left) *
    scaleX;

  const sourceY =
    (cropRect.top - imageRect.top) *
    scaleY;

  const sourceWidth =
    cropRect.width *
    scaleX;

  const sourceHeight =
    cropRect.height *
    scaleY;

  const image =
    new Image();

  image.onload = function() {

    const canvas =
      document.createElement("canvas");

    canvas.width =
      Math.round(sourceWidth);

    canvas.height =
      Math.round(sourceHeight);

    const ctx =
      canvas.getContext("2d");

    ctx.drawImage(
      image,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      0,
      0,
      canvas.width,
      canvas.height
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
          `Cropped size: ${canvas.width} × ${canvas.height} px`;
      },
      "image/jpeg",
      0.92
    );
  };

  image.src =
    URL.createObjectURL(selectedImage);
}


/* CLEAR */

function clearTool() {

  imageInput.value = "";

  selectedImage = null;

  imageNaturalWidth = 0;
  imageNaturalHeight = 0;

  action = null;

  preview.src = "";

  cropArea.style.display =
    "none";

  fileName.textContent =
    "No image selected";

  cropWidth.textContent =
    "0";

  cropHeight.textContent =
    "0";

  result.textContent = "";

  downloadBtn.style.display =
    "none";
}