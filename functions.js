export default function drawGraphic(value) {
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
    ctx.moveTo(originX + x * scale, originY - eval(value) * scale);
    for (let x = -canvas.width / 2; x <= canvas.width / 2; x += step) {
      if (isEvaluable(value)) {
        ctx.lineTo(originX + x * scale, originY - eval(value) * scale);
      }
      console.log(`x = ${x} y = ${eval(value)}`)
    }
    ctx.stroke();
}

export default function replaceMathFunctions(str) {
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
  
export default function isEvaluable(str) {
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
  
export default function isNotEmpty(str) {
    return str.length !== 0;
}
  