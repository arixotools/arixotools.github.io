function countCharacters() {

  const text =
    document.getElementById("textInput").value;

  // Total characters
  document.getElementById("totalCharacters").textContent =
    text.length;

  // Characters without spaces
  document.getElementById("withoutSpaces").textContent =
    text.replace(/\s/g, "").length;

  // Letters
  document.getElementById("letters").textContent =
    (text.match(/[a-zA-Z]/g) || []).length;

  // Numbers
  document.getElementById("numbers").textContent =
    (text.match(/[0-9]/g) || []).length;

  // Spaces
  document.getElementById("spaces").textContent =
    (text.match(/\s/g) || []).length;
}

function clearText() {

  document.getElementById("textInput").value = "";

  countCharacters();
}