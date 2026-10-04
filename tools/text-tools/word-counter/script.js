function countText() {

  const text =
    document.getElementById("textInput").value;

  const wordCount =
    document.getElementById("wordCount");

  const characterCount =
    document.getElementById("characterCount");

  const characterNoSpaceCount =
    document.getElementById("characterNoSpaceCount");

  // Count characters including spaces
  characterCount.textContent =
    text.length;

  // Count characters without spaces
  characterNoSpaceCount.textContent =
    text.replace(/\s/g, "").length;

  // Count words
  const words =
    text.trim().split(/\s+/);

  if (text.trim() === "") {
    wordCount.textContent = "0";
  } else {
    wordCount.textContent = words.length;
  }
}

function clearText() {

  document.getElementById("textInput").value = "";

  countText();
}