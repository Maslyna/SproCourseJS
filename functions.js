/*
export function drawGraphic(value) {
    console.log(value);
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    // clear the old graph
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "orange"; // graphic color line
    ctx.lineWidth = 2; // width of line
    ctx.font = "12px Arial"; // font
  
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

    ctx.strokeStyle = "#45a049"; // graphic color line
    // draw the graph
    ctx.beginPath();
    let x = -canvas.width * 2;
    ctx.moveTo(originX + x * scale, originY - eval(value) * scale);
    for (let x = -canvas.width / 2; x <= canvas.width / 2; x += step) {
      if (isEvaluable(value)) {
        ctx.lineTo(originX + x * scale, originY - eval(value) * scale);
        console.log(`x = ${x} y = ${eval(value)}`)
      }
    }
    ctx.stroke();
} */

export function drawGraphic(value) {
  console.log(value);
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // styles for graphic
  ctx.strokeStyle = "orange"; // graphic color line
  ctx.lineWidth = 2; // width of line
  ctx.font = "12px Arial"; // font

  const xMin = -20; // minimum x value
  const xMax = 20; // maximum x value
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

  let x = xMin;
  ctx.strokeStyle = "#45a049";

  function drawFrame() {
    if (x <= xMax) {
      ctx.moveTo(originX + x * scale, originY - eval(value) * scale);
      x += step;
      ctx.lineTo(originX + x * scale, originY - eval(value) * scale);
      ctx.stroke();

      requestAnimationFrame(drawFrame);
    }
  }

  drawFrame();
}


export function replaceMathFunctions(str) {
  const functionMap = {
    'pow': 'Math.pow',
    'abs': 'Math.abs',
    'sqrt': 'Math.sqrt',
    'tan': 'Math.tan',
    'sin': 'Math.sin',
    'cos': 'Math.cos',
    'exp': 'Math.exp',
    'log': 'Math.log',
    'log10': 'Math.log10',
    'cbrt': 'Math.cbrt',
    'sinh': 'Math.sinh',
    'cosh': 'Math.cosh',
    'tanh': 'Math.tanh',
    'asin': 'Math.asin',
    'acos': 'Math.acos',
    'atan': 'Math.atan',
    'random' : 'Math.random',
    'Math.pow': 'Math.pow',
    'Math.abs': 'Math.abs',
    'Math.sqrt': 'Math.sqrt',
    'Math.tan': 'Math.tan',
    'Math.sin': 'Math.sin',
    'Math.cos': 'Math.cos',
    'Math.exp' : 'Math.exp',
    'Math.log' : 'Math.log',
    'Math.log10' : 'Math.log10',
    'Math.cbrt' : 'Math.cbrt',
    'Math.sinh' : 'Math.sinh',
    'Math.cosh' : 'Math.cosh',
    'Math.tanh' : 'Math.tanh',
    'Math.asin' : 'Math.asin',
    'Math.acos' : 'Math.acos',
    'Math.atan' : 'Math.atan',
    'Math.random' : 'Math.random'
  };
  const regex = new RegExp(Object.keys(functionMap).join('|'), 'g');
  return str.replace(regex, match => functionMap[match]);
}

export function isEvaluable(str) {
  let x = 1;
  console.log(str)
  try {
    if (eval(str) !== NaN && eval(str) !== Infinity) {
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
}

export function isNotEmpty(str) {
  return str.length !== 0;
}
