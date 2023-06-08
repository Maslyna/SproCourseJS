import {drawGraphic, replaceMathFunctions, isEvaluable, isNotEmpty} from './functions.js';

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
