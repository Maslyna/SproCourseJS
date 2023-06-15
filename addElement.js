const addButton = document.getElementById('addButton');
const inputOfElement = document.getElementById('inputOfElement');
const output = document.getElementById("output");
addButton.textContent = 'Add';

addButton.addEventListener('click', () => {
    const newElement = {function_text : inputOfElement.value}
    if (isEvaluable(replaceMathFunctions(inputOfElement.value)) && isNotEmpty(inputOfElement.value)) {
      output.innerHTML = "";
      fetch(`http://localhost:8080/api/functions`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newElement)
          })
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error(error));
       location.reload();  
    } else {
      output.innerHTML = "Введена функція невірна!";
    }
})

function replaceMathFunctions(str) {
  const functionMap = {
    'pow': 'Math.pow',
    'abs': 'Math.abs',
    'sqrt': 'Math.sqrt',
    'tan': 'Math.tan',
    'sin': 'Math.sin',
    'cos': 'Math.cos',
    'Math.pow' : 'Math.pow',
    'Math.abs' : 'Math.abs',
    'Math.sqrt' : 'Math.sqrt',
    'Math.tan' : 'Math.tan',
    'Math.sin' : 'Math.sin',
    'Math.cos' : 'Math.cos'
  };
  const regex = new RegExp(Object.keys(functionMap).join('|'), 'g');
  return str.replace(regex, match => functionMap[match]);
}

function isEvaluable(str) {
  const x = 1;
  console.log(str)
  try {
    if (eval(str) !== NaN) {
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
}

function isNotEmpty(str) {
  return str.length !== 0;
}
