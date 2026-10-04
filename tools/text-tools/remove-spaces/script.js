const textInput =
  document.getElementById("textInput");

function updateText() {
  // Keeps the text ready for processing
}

function removeAllSpaces() {

  textInput.value =
    textInput.value.replace(/\s/g, "");
}

function removeExtraSpaces() {

  textInput.value =
    textInput.value
      .replace(/\s+/g, " ")
      .trim();
}

function removeLineSpaces() {

  textInput.value =
    textInput.value
      .replace(/[\r\n]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
}

function clearText() {

  textInput.value = "";
}