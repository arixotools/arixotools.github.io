const textInput =
  document.getElementById("textInput");

function reverseText() {

  textInput.value =
    [...textInput.value].reverse().join("");
}

function reverseWords() {

  const text =
    textInput.value.trim();

  if (text === "") {
    return;
  }

  textInput.value =
    text.split(/\s+/).reverse().join(" ");
}

function clearText() {

  textInput.value = "";
}