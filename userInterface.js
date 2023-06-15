import {drawGraphic, replaceMathFunctions, isEvaluable, isNotEmpty} from './functions.js';

const elementList = document.getElementById('elementList');
const graphicDialog = document.getElementById('graphicDialog');


fetch('http://localhost:8080/api/functions')
  .then(response => response.json())
  .then(data => {
    data.forEach(element => {
      const li = document.createElement('li');
      const input = document.createElement('input');
      const updateButton = document.createElement('button');
      const drawButton = document.createElement('button');
      const deleteButton = document.createElement('button');
      const errorElement = document.createElement('p')
      const errorText = document.createTextNode("");
      
      errorElement.appendChild(errorText);
      errorElement.classList.add('errorTextStyle');
      
      input.type = 'text';
      input.value = element.function_text;
      
      updateButton.textContent = 'Update';
      updateButton.addEventListener('click', () => {
        const updatedElement = {id: element.id, function_text: input.value};
        if (isEvaluable(replaceMathFunctions(input.value))) {
          output.innerHTML = "";
          fetch(`http://localhost:8080/api/functions/${element.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedElement)
          })
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error(error));
          location.reload();
        } else {
          errorText.textContent = "*Введена функція невірна!";
        }
      });
      
      drawButton.textContent = 'Draw Graph';
      drawButton.addEventListener('click', () => {
        const value = element.function_text;
        if (isEvaluable(replaceMathFunctions(value))) {
          drawGraphic(replaceMathFunctions(value));
          graphicDialog.style.display = "block";
        } else {
          errorText.textContent = "*Введена функція невірна!";
        }
      });

      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
      fetch(`http://localhost:8080/api/functions/${element.id}`, {
          method: 'DELETE',
      })
      .then(response => {
        location.reload();  
        if (response.ok) {
          console.log('User deleted successfully');
        } else {
          console.error('Delete request failed');
        }
      })
      .catch(error => {
          console.error('Error occurred while sending DELETE request', error);
        });
      });
      
      li.textContent = `f(x): `;
      li.appendChild(input);
      li.appendChild(updateButton);
      li.appendChild(drawButton);
      li.appendChild(deleteButton);
      li.appendChild(errorElement);
      elementList.appendChild(li);
    });
  })
  .catch(error => console.error(error));





