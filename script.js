function add(num1, num2) {
  return num1 + num2;
}

function substract(num1, num2) {
  return num1 - num2;
}
function multiply(num1, num2) {
  return num1 * num2;
}
function divide(num1, num2) {
  if (num2 === 0) {
    alert("Can't divide by zero");
    return "Error";
  }
  return num1 / num2;
}

let display = document.querySelector("#display");
let currentInput = "";
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let resultDisplayed = false;

function updateDisplay(value) {
  display.textContent = value;
}

function operate(operator, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return substract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return null;
  }
}

document.querySelectorAll(".digit").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (resultDisplayed) {
      currentInput = "";
      resultDisplayed = false;
    }
    currentInput += btn.textContent;
    updateDisplay(currentInput);
  });
});

document.querySelectorAll(".operator").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (currentInput === "") return;

    if (firstOperand !== null && currentOperator !== null) {
      secondOperand = currentInput;
      let result = operate(currentOperator, firstOperand, secondOperand);
      result =
        typeof result === "number" ? Math.round(result * 1000) / 1000 : result;
      updateDisplay(result);
      firstOperand = result;
    } else {
      firstOperand = currentInput;
    }

    currentOperator = btn.textContent;
    currentInput = "";
    resultDisplayed = false;
    updateDisplay(currentOperator);
  });
});
document.querySelector(".equal").addEventListener("click", () => {
  if (firstOperand === null || currentOperator === null || currentInput === "")
    return;

  secondOperand = currentInput;
  let result = operate(currentOperator, firstOperand, secondOperand);
  result =
    typeof result === "number" ? Math.round(result * 1000) / 1000 : result;
  updateDisplay(result);
  firstOperand = result;
  currentInput = "";
  currentOperator = null;
  resultDisplayed = true;
});

document.querySelector(".clear").addEventListener("click", () => {
  currentInput = "";
  firstOperand = null;
  secondOperand = null;
  currentOperator = null;
  resultDisplayed = false;
  updateDisplay("0");
});

document.querySelector(".backspace").addEventListener("click", () => {
  currentInput = currentInput.slice(0, -1);
  updateDisplay(currentInput || "0");
});

document.querySelector(".decimal").addEventListener("click", () => {
  if (!currentInput.includes(".")) {
    currentInput += currentInput === "" ? "0." : ".";
    updateDisplay(currentInput);
  }
});

window.addEventListener("keydown", (e) => {
    const key = e.key;
  
    if (!isNaN(key)) {
      const digitButton = Array.from(document.querySelectorAll(".digit")).find(
        (btn) => btn.textContent === key
      );
      digitButton?.click();
    } else if (["+", "-", "*", "/"].includes(key)) {
      const operatorButton = Array.from(document.querySelectorAll(".operator")).find(
        (btn) => btn.textContent === key
      );
      operatorButton?.click();
    } else if (key === "Enter" || key === "=") {
      document.querySelector(".equal")?.click();
    } else if (key === "Backspace") {
      document.querySelector(".backspace")?.click();
    } else if (key === ".") {
      document.querySelector(".decimal")?.click();
    } else if (key.toLowerCase() === "c") {
      document.querySelector(".clear")?.click();
    }
  });