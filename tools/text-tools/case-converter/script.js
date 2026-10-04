const textInput =
  document.getElementById("textInput");

function toUpperCaseText() {

  textInput.value =
    textInput.value.toUpperCase();
}

function toLowerCaseText() {

  textInput.value =
    textInput.value.toLowerCase();
}

function toTitleCase() {

  textInput.value =
    textInput.value
      .toLowerCase()
      .replace(/\b\w/g, function(letter) {
        return letter.toUpperCase();
      });
}

function toSentenceCase() {

  const text =
    textInput.value.toLowerCase();

  textInput.value =
    text.replace(/(^\s*\w|[.!?]\s+\w)/g, function(letter) {
      return letter.toUpperCase();
    });
}

function clearText() {

  textInput.value = "";
}