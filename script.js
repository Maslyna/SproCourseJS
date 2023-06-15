const elementList = document.getElementById('elementList');

fetch('http://localhost:8080/api/functions')
  .then(response => response.json())
  .then(data => {
    data.forEach(element => {
      const li = document.createElement('li');
      const input = document.createElement('input');
      const updateButton = document.createElement('button');
      const drawButton = document.createElement('button');
      const deleteButton = document.createElement('button');
      
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
          output.innerHTML = "Введена функція невірна!";
        }
      });
      
      drawButton.textContent = 'Draw Graph';
      drawButton.addEventListener('click', () => {
        const value = element.function_text;
        drawGraphic(replaceMathFunctions(value));
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
      elementList.appendChild(li);
    });
  })
  .catch(error => console.error(error));


function drawGraphic(value) {
  console.log(value);
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  const xMin = -10; // minimum x value
  const xMax = 10; // maximum x value
  const step = 0.1; // step size for x
  const scale = 30; // pixels per unit
  const originX = canvas.width / 2; // x coordinate of the origin
  const originY = canvas.height / 2; // y coordinate of the origin

  // draw x and y axes
  ctx.beginPath();
  ctx.moveTo(0, originY);
  ctx.lineTo(canvas.width, originY);
  ctx.moveTo(originX, 0);
  ctx.lineTo(originX, canvas.height);
  ctx.stroke();

  // draw x and y axis labels
  ctx.font = "12px Arial";
  ctx.fillText("x", canvas.width - 10, originY - 10);
  ctx.fillText("y", originX + 10, 10);

  // draw x tick marks and labels
  for (let x = -canvas.width / 2; x <= canvas.width / 2; x++) {
    const xCoord = originX + x * scale;
    ctx.moveTo(xCoord, originY - 5);
    ctx.lineTo(xCoord, originY + 5);
    ctx.stroke();
    if (x !== 0) {
      ctx.fillText(x.toString(), xCoord - 3, originY + 15);
    } else {
      ctx.fillText(x.toString(), xCoord + 5, originY + 15)
    }
  }

  // draw y tick marks and labels
  for (let y = -canvas.height / 2; y <= canvas.height / 2; y++) {
    const yCoord = originY - y * scale;
    ctx.moveTo(originX - 5, yCoord);
    ctx.lineTo(originX + 5, yCoord);
    ctx.stroke();
    if (y !== 0) {
      ctx.fillText(y.toString(), originX + 10, yCoord + 3);
    }
  }

  // draw the graph
  ctx.beginPath();
  let x = -canvas.width * 2;
  ctx.moveTo(-canvas.width * 2, -canvas.height * 2);
  for (let i = -canvas.width / 2; i <= canvas.width / 2; i += step) {
    let x = i;
    if (isEvaluable(x)) {
      ctx.lineTo(originX + x * scale, originY - eval(value) * scale);
    }
    console.log(`x = ${x} y = ${eval(value)}`)
  }
  ctx.stroke();
}


