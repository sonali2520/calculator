const btn = document.querySelectorAll(".btn");
const display = document.querySelector(".display");

// Add click event listeners to buttons
btn.forEach((button) => {
  button.addEventListener("click", (e) => {
    handleButtonClick(e.target.innerText);
  });
});

// Add keydown event listener to the document
document.addEventListener("keydown", (e) => {
  // Check if the pressed key is a digit, operator, Enter, or backspace key
  const validKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "+", "-", "*", "/", "=", "Enter", "Backspace"];
  
  if (validKeys.includes(e.key)) {
    // Prevent default behavior to avoid unwanted key actions (e.g., scrolling)
    e.preventDefault();
    handleButtonClick(e.key);
  }
});

function handleButtonClick(key) {
  if (key === "=" || key === "Enter") {
    const result = eval(display.innerText);
    display.innerText = result;
    adjustFontSize(display);
  } else if (key === "ac") {
    display.innerText = "0";
    adjustFontSize(display);
  } else if (key === "Backspace") {
    // Remove the last character from the display if it's not empty
    display.innerText = display.innerText.slice(0, -1);
    if (display.innerText === "") {
      display.innerText = "0"; // Display 0 if the result is empty
    }
    adjustFontSize(display);
  } else {
    if (display.innerText === "0") {
      display.innerText = key;
    } else {
      display.innerText += key;
    }
    adjustFontSize(display);
  }
}

function adjustFontSize(element) {
  const maxWidth = element.offsetWidth; // Maximum width of the display
  const contentWidth = element.scrollWidth;

  // Calculate the new font size based on the ratio of maxWidth to contentWidth
  const ratio = maxWidth / contentWidth;
  const fontSize = Math.min(parseFloat(window.getComputedStyle(element).fontSize) * ratio, 60); // Set a maximum font size of 30px (adjust as needed)

  // Apply the new font size
  element.style.fontSize = fontSize + "px";
}
