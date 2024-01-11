function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b !== 0) {
    return a / b;
  } else {
    return "Error: Division by zero";
  }
}

function mod(a, b) {
  return a % b;
}

let expression = "";

function operate() {
  const operators = ["+", "-", "*", "/", "%"];

  // Find the operator in the expression
  for (let i = 0; i < operators.length; i++) {
    const operatorIndex = expression.indexOf(operators[i]);
    if (operatorIndex !== -1) {
      const num1 = parseFloat(expression.slice(0, operatorIndex));
      const num2 = parseFloat(expression.slice(operatorIndex + 1));
      switch (operators[i]) {
        case "+":
          result = add(num1, num2);
          break;
        case "-":
          result = subtract(num1, num2);
          break;
        case "*":
          result = multiply(num1, num2);
          break;
        case "/":
          result = divide(num1, num2);
          break;
        case "%":
          result = mod(num1, num2);
          break;
        default:
          result = "Error: Invalid operator";
      }
    }
    return result;
  }

  // If no operator is found, return the number itself
  return parseFloat(expression);
}

const btns = document.querySelectorAll("button");
const displayValue = document.querySelector(".displayValue");

btns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    if (!isNaN(btn.textContent)) {
      // If the button is a number
      if (expression.includes("=")) {
        // Reset the expression if it contains '=' (result)
        expression = btn.textContent;
      } else {
        expression += btn.textContent;
      }
      displayValue.textContent = expression;
    } else if (btn.textContent === "AC") {
      // If the button is "AC" (clear)
      expression = "";
      displayValue.textContent = "";
    } else if (btn.classList === "backspace") {
      backspace();
    } else if (btn.textContent === "=") {
      const result = operate();
      expression = `${expression}=${result}`;
      displayValue.textContent = result;
    } else {
      // If the button is an operator
      if (expression.includes("=")) {
        // If there is a result, start a new calculation
        expression = displayValue.textContent + btn.textContent;
      } else {
        expression += btn.textContent;
      }
      displayValue.textContent = expression;
    }
  });
});

function backspace() {
  let currentValue = displayValue.textContent;
  displayValue.textContent = currentValue.slice(0, -1);
}
