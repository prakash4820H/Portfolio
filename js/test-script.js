document.addEventListener("DOMContentLoaded", function () {
  console.log("Test script loaded successfully!");

  // Create a visible element to confirm script execution
  const testElement = document.createElement("div");
  testElement.style.position = "fixed";
  testElement.style.top = "10px";
  testElement.style.left = "10px";
  testElement.style.padding = "10px";
  testElement.style.background = "red";
  testElement.style.color = "white";
  testElement.style.zIndex = "10000";
  testElement.textContent = "Test script working!";

  document.body.appendChild(testElement);
});
