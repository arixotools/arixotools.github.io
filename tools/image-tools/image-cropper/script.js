let selectedImage = null;

let imageNaturalWidth = 0;
let imageNaturalHeight = 0;

let action = null;
let activePointerId = null;

let startX = 0;
let startY = 0;

let startLeft = 0;
let startTop = 0;

let startWidth = 0;
let startHeight = 0;

let pendingEvent = null;
let animationFrame = null;

let overlayTop = null;
let overlayBottom = null;
let overlayLeft = null;
let overlayRight = null;


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


/* =========================================
   TOUCH PERFORMANCE
========================================= */

cropArea.style.touchAction = "none";
cropArea.style.userSelect = "none";
cropArea.style.webkitUserSelect = "none";

cropBox.style.touchAction = "none";
cropBox.style.userSelect = "none";
cropBox.style.webkitUserSelect = "none";


/* =========================================
   CREATE LIGHTWEIGHT DARK OVERLAY
========================================= */

function createOverlay() {

    const commonStyle = {
        position: "absolute",
        background: "rgba(0, 0, 0, 0.46)",
        pointerEvents: "none",
        zIndex: "4"
    };

    overlayTop =
        document.createElement("div");

    overlayBottom =
        document.createElement("div");

    overlayLeft =
        document.createElement("div");

    overlayRight =
        document.createElement("div");


    [
        overlayTop,
        overlayBottom,
        overlayLeft,
        overlayRight
    ].forEach(element => {

        Object.assign(
            element.style,
            commonStyle
        );

        cropArea.appendChild(element);

    });
}


/* =========================================
   UPDATE OVERLAY
========================================= */

function updateOverlay(
    left,
    top,
    width,
    height
) {

    if (
        !overlayTop ||
        !overlayBottom ||
        !overlayLeft ||
        !overlayRight
    ) {
        return;
    }

    const areaWidth =
        cropArea.clientWidth;

    const areaHeight =
        cropArea.clientHeight;


    /* TOP */

    overlayTop.style.left =
        "0px";

    overlayTop.style.top =
        "0px";

    overlayTop.style.width =
        areaWidth + "px";

    overlayTop.style.height =
        Math.max(0, top) + "px";


    /* BOTTOM */

    overlayBottom.style.left =
        "0px";

    overlayBottom.style.top =
        (top + height) + "px";

    overlayBottom.style.width =
        areaWidth + "px";

    overlayBottom.style.height =
        Math.max(
            0,
            areaHeight - top - height
        ) + "px";


    /* LEFT */

    overlayLeft.style.left =
        "0px";

    overlayLeft.style.top =
        top + "px";

    overlayLeft.style.width =
        Math.max(0, left) + "px";

    overlayLeft.style.height =
        height + "px";


    /* RIGHT */

    overlayRight.style.left =
        (left + width) + "px";

    overlayRight.style.top =
        top + "px";

    overlayRight.style.width =
        Math.max(
            0,
            areaWidth - left - width
        ) + "px";

    overlayRight.style.height =
        height + "px";
}


/* =========================================
   LOAD IMAGE
========================================= */

function loadImage(event) {

    const file =
        event.target.files[0];

    if (!file) {
        return;
    }

    selectedImage =
        file;

    fileName.textContent =
        file.name;

    const reader =
        new FileReader();

    reader.onload =
        function(e) {

            preview.src =
                e.target.result;

            preview.onload =
                function() {

                    imageNaturalWidth =
                        preview.naturalWidth;

                    imageNaturalHeight =
                        preview.naturalHeight;

                    cropArea.style.display =
                        "block";

                    setTimeout(
                        () => {

                            resetCropBox();

                            updateCropInfo();

                        },
                        50
                    );
                };
        };

    reader.readAsDataURL(file);

    result.textContent =
        "";

    downloadBtn.style.display =
        "none";
}


/* =========================================
   RESET
========================================= */

function resetCropBox() {

    cropBox.style.left =
        "10%";

    cropBox.style.top =
        "10%";

    cropBox.style.width =
        "50%";

    cropBox.style.height =
        "50%";

    cropBox.style.transform =
        "translate3d(0, 0, 0)";

    requestAnimationFrame(() => {

        const left =
            cropBox.offsetLeft;

        const top =
            cropBox.offsetTop;

        const width =
            cropBox.offsetWidth;

        const height =
            cropBox.offsetHeight;

        updateOverlay(
            left,
            top,
            width,
            height
        );
    });
}


/* =========================================
   UPDATE SIZE INFO
========================================= */

function updateCropInfo() {

    const imageRect =
        preview.getBoundingClientRect();

    const cropRect =
        cropBox.getBoundingClientRect();

    if (
        imageRect.width <= 0 ||
        imageRect.height <= 0
    ) {
        return;
    }

    const scaleX =
        imageNaturalWidth /
        imageRect.width;

    const scaleY =
        imageNaturalHeight /
        imageRect.height;

    cropWidth.textContent =
        Math.round(
            cropRect.width * scaleX
        );

    cropHeight.textContent =
        Math.round(
            cropRect.height * scaleY
        );
}


/* =========================================
   START ACTION
========================================= */

function startAction(
    event,
    newAction,
    target
) {

    event.preventDefault();
    event.stopPropagation();

    action =
        newAction;

    activePointerId =
        event.pointerId;

    startX =
        event.clientX;

    startY =
        event.clientY;


    /*
       Read layout only once.
    */

    startLeft =
        cropBox.offsetLeft;

    startTop =
        cropBox.offsetTop;

    startWidth =
        cropBox.offsetWidth;

    startHeight =
        cropBox.offsetHeight;


    try {

        target.setPointerCapture(
            event.pointerId
        );

    } catch (error) {
        // Ignore
    }
}


/* =========================================
   HANDLES
========================================= */

document
    .querySelectorAll(".handle")
    .forEach(handle => {

        handle.addEventListener(
            "pointerdown",
            event => {

                startAction(
                    event,
                    handle.dataset.direction,
                    handle
                );

            },
            {
                passive: false
            }
        );

    });


/* =========================================
   CROP BOX MOVE
========================================= */

cropBox.addEventListener(
    "pointerdown",
    event => {

        if (
            event.target.classList.contains(
                "handle"
            )
        ) {
            return;
        }

        startAction(
            event,
            "move",
            cropBox
        );

    },
    {
        passive: false
    }
);


/* =========================================
   APPLY MOVEMENT
========================================= */

function applyMovement(event) {

    if (
        !action ||
        event.pointerId !== activePointerId
    ) {
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

    const minSize =
        50;

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
            Math.max(
                0,
                Math.min(
                    startLeft + dx,
                    areaWidth - width
                )
            );

        top =
            Math.max(
                0,
                Math.min(
                    startTop + dy,
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
                    startTop +
                    startHeight -
                    minSize
                )
            );

        top =
            newTop;

        height =
            startHeight +
            startTop -
            newTop;
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
                    startLeft +
                    startWidth -
                    minSize
                )
            );

        left =
            newLeft;

        width =
            startWidth +
            startLeft -
            newLeft;
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


    /*
       Keep layout position fixed and
       use GPU transform for movement.
    */

    cropBox.style.left =
        startLeft + "px";

    cropBox.style.top =
        startTop + "px";

    cropBox.style.width =
        width + "px";

    cropBox.style.height =
        height + "px";


    cropBox.style.transform =
        `translate3d(
            ${left - startLeft}px,
            ${top - startTop}px,
            0
        )`;


    /*
       Overlay follows the crop box.
    */

    updateOverlay(
        left,
        top,
        width,
        height
    );
}


/* =========================================
   POINTER MOVE
========================================= */

function handlePointerMove(event) {

    if (
        !action ||
        event.pointerId !== activePointerId
    ) {
        return;
    }

    event.preventDefault();

    pendingEvent =
        event;

    if (
        animationFrame !== null
    ) {
        return;
    }

    animationFrame =
        requestAnimationFrame(() => {

            animationFrame =
                null;

            if (
                pendingEvent &&
                action
            ) {

                applyMovement(
                    pendingEvent
                );
            }

            pendingEvent =
                null;
        });
}


document.addEventListener(
    "pointermove",
    handlePointerMove,
    {
        passive: false
    }
);


/* =========================================
   END ACTION
========================================= */

function endAction(event) {

    if (
        activePointerId !== null &&
        event.pointerId !== activePointerId
    ) {
        return;
    }


    if (
        pendingEvent &&
        action
    ) {

        applyMovement(
            pendingEvent
        );
    }


    pendingEvent =
        null;


    if (
        animationFrame !== null
    ) {

        cancelAnimationFrame(
            animationFrame
        );

        animationFrame =
            null;
    }


    /*
       Commit transform back to
       normal left/top position.
    */

    if (action) {

        const currentLeft =
            cropBox.offsetLeft;

        const currentTop =
            cropBox.offsetTop;

        const transform =
            getComputedStyle(
                cropBox
            ).transform;

        let finalLeft =
            startLeft;

        let finalTop =
            startTop;


        if (
            transform &&
            transform !== "none"
        ) {

            const matrix =
                new DOMMatrix(
                    transform
                );

            finalLeft =
                startLeft + matrix.m41;

            finalTop =
                startTop + matrix.m42;
        }


        cropBox.style.left =
            finalLeft + "px";

        cropBox.style.top =
            finalTop + "px";

        cropBox.style.transform =
            "translate3d(0, 0, 0)";


        updateOverlay(
            finalLeft,
            finalTop,
            cropBox.offsetWidth,
            cropBox.offsetHeight
        );

        updateCropInfo();
    }


    action =
        null;

    activePointerId =
        null;
}


document.addEventListener(
    "pointerup",
    endAction
);

document.addEventListener(
    "pointercancel",
    endAction
);


/* =========================================
   CROP IMAGE
========================================= */

function cropImage() {

    if (!selectedImage) {

        result.textContent =
            "Please choose an image first.";

        return;
    }


    /*
       Make sure transform is committed.
    */

    const transform =
        getComputedStyle(
            cropBox
        ).transform;

    if (
        transform &&
        transform !== "none"
    ) {

        const matrix =
            new DOMMatrix(
                transform
            );

        cropBox.style.left =
            (
                cropBox.offsetLeft +
                matrix.m41
            ) + "px";

        cropBox.style.top =
            (
                cropBox.offsetTop +
                matrix.m42
            ) + "px";

        cropBox.style.transform =
            "translate3d(0, 0, 0)";
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
        (
            cropRect.left -
            imageRect.left
        ) * scaleX;

    const sourceY =
        (
            cropRect.top -
            imageRect.top
        ) * scaleY;


    const sourceWidth =
        cropRect.width *
        scaleX;

    const sourceHeight =
        cropRect.height *
        scaleY;


    const image =
        new Image();

    const imageUrl =
        URL.createObjectURL(
            selectedImage
        );


    image.onload =
        function() {

            const canvas =
                document.createElement(
                    "canvas"
                );

            canvas.width =
                Math.round(
                    sourceWidth
                );

            canvas.height =
                Math.round(
                    sourceHeight
                );


            const ctx =
                canvas.getContext(
                    "2d"
                );


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

                    URL.revokeObjectURL(
                        imageUrl
                    );

                    if (!blob) {
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
                        URL.createObjectURL(
                            blob
                        );


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
        imageUrl;
}


/* =========================================
   CLEAR
========================================= */

function clearTool() {

    imageInput.value =
        "";

    selectedImage =
        null;

    imageNaturalWidth =
        0;

    imageNaturalHeight =
        0;

    action =
        null;

    activePointerId =
        null;

    pendingEvent =
        null;


    if (
        animationFrame !== null
    ) {

        cancelAnimationFrame(
            animationFrame
        );

        animationFrame =
            null;
    }


    preview.src =
        "";

    cropArea.style.display =
        "none";


    fileName.textContent =
        "No image selected";


    cropWidth.textContent =
        "0";

    cropHeight.textContent =
        "0";

    result.textContent =
        "";

    downloadBtn.style.display =
        "none";
}


/* =========================================
   INITIALIZE
========================================= */

createOverlay();