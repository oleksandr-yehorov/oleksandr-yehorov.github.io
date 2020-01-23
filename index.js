// Initialization

const addFrame = document.querySelector('.frames__addFrame');
const framesList = document.querySelector('.frames__list');
const palleteTools = document.querySelector('.pallete__ul');
const colourPalette = document.querySelector('.first-colour');
const canvasHeight = 640;
const canvasWidth = 640;
let imageList = []
let sliderValue = 5;
let colour = '#408080';
let colourList = [colour];

const currentSelectFrame = document.querySelector('.frame-select');
const canvas = document.querySelector('.canvas-main:not(.hide-main-canvas)');
moveImageFromBCanToS(canvas, currentSelectFrame, canvasWidth, canvasHeight);


colourPalette.addEventListener("input", (event) => {
  let colourPalette = document.querySelector('.first-colour');

  if (colourPalette) {
    colourPalette.style.colour = event.target.value;
    colour = event.target.value;
    if (!colourList.includes(colour)) colourList.push(colour);
  }
});

// Add new frame

addFrame.addEventListener('click', () => {
    const currentSelectFrame = document.querySelector('.frame-select');
    currentSelectFrame.classList.remove('frame-select');
  
    let frame = document.createElement('li');
    frame.className = 'frame frame-select';
    let number = document.querySelectorAll('.frame-number').length;
    frame.innerHTML = `
      <div class="left-top-corner"><p class="frame-number">${number + 1}</p></div>
      <div class="delete-frame frame-hide-functions"><img src="assets/delete.svg" alt="Delete frame" class="frame-icons-functions"></div>
      <div class="copy-frame frame-hide-functions"><img src="assets/copy.svg" alt="Copy frame" class="frame-icons-functions"></div>
      <div class="move-frame frame-hide-functions"><img src="assets/move-dots.svg" alt="Move frame" class="frame-icons-functions"></div>
      <canvas class="frame-canvas" width="107" height="107"></canvas>`;
    framesList.appendChild(frame);

// drawing block

const drawing = document.querySelector('.drawing');
const canvas = document.createElement('canvas');
canvas.className = 'canvas-main';

canvas.setAttribute('width', canvasWidth);
canvas.setAttribute('height', canvasHeight);
canvas.getContext('2d').drawImage(canvas, 0, 0, canvasWidth, canvasHeight, 0, 0, 32, 32);

drawing.appendChild(canvas);

moveImageFromBCanToS(canvas, frame, canvasWidth, canvasHeight);

const canvasList = document.querySelectorAll('.canvas-main');
for (let i = 0; i < canvasList.length - 1; i++) {
  canvasList[i].classList.add('hide-main-canvas');
}

selectedInstrument();

});

// change frame on select

framesList.addEventListener('click', (event) => {
  let frame = event.target;

  while (!frame.classList.contains('frame')  && !frame.classList.contains('frames__list')) {
    frame = frame.parentElement;
  }


  if (frame.classList.contains('frame')) selectElement(frame, 'frame-select')

  const lastCanvas = document.querySelector('.canvas-main:not(.hide-main-canvas)');

  const canvasList = document.querySelectorAll('.canvas-main');
  canvasList[+frame.innerText - 1].classList.remove('hide-main-canvas');

  const numShownCanvas = document.querySelectorAll('.canvas-main:not(.hide-main-canvas)');
  if (lastCanvas && numShownCanvas.length === 2) {
    lastCanvas.classList.add('hide-main-canvas');
  }

  if (sliderValue === 0) {
    const animationWindow = document.querySelector('.preview__animation');
    animationWindow.style.backgroundImage = `url(${imageList[+frame.innerText  - 1]})`;
  }

  selectedInstrument();
  operationsOnFrame();
  
});

palleteTools.addEventListener('click', (event) => {
  let tool = event.target;

  while (!tool.classList.contains('instrument') && !tool.classList.contains('instruments')) {
    tool = tool.parentElement;
  }

  if (tool.classList.contains('pallete__ul--pencil')) {
    selectElement(tool, 'instrument-select');

    drawPencil();
    
  } else if (tool.classList.contains('pallete__ul--bucket')) {
    selectElement(tool, 'instrument-select');

    paintBucket();  
    
  } else if (tool.classList.contains('pallete__ul--pipette')) {
    selectElement(tool, 'instrument-select');

    eyedropper();
  } else if (tool.classList.contains('pallete__ul--eraser')) {
    selectElement(tool, 'instrument-select');

    drawPencil();
  } else if (tool.classList.contains('pallete__ul--move')) {
    selectElement(tool, 'instrument-select');

  } else if (tool.classList.contains('pallete__ul--exchange')) {
    selectElement(tool, 'instrument-select');

    const canvas = document.querySelector('.canvas-main:not(.hide-main-canvas)');
    const context = canvas.getContext('2d');

  }
});

function updateNumFrames(prevFrame) {
  const framesList = document.querySelectorAll('.frame');
  const frameNumber = document.querySelectorAll('.frame-number');
  let iter = prevFrame || 0;
  if (iter !== 0) {
    iter = +prevFrame.innerText;
  }
  for (let i = iter; i < framesList.length; i++) {
    frameNumber[i].innerText = i + 1;
  } 
}

function deleteFrame(target) {

  // only one frame in a list
  if ((target.offsetParent !== null) && (framesList.childElementCount !== 1)) {
    const frame = target.offsetParent;
    const prevElement = frame.previousElementSibling;
    frame.parentNode.removeChild(frame);
    updateNumFrames(prevElement);

    if (!framesList.children[0].classList.contains('frame-select')) {
      selectFrame(prevElement)
    }

    // delete main canvas from canvas list

    if (prevElement) {
      let canvasList = document.querySelectorAll('.canvas-main');
      const deleteCanvas = canvasList[+prevElement.innerText];
      deleteCanvas.parentNode.removeChild(deleteCanvas); 

      imageList.splice(+prevElement.innerText, 1);

      canvasList = document.querySelectorAll('.canvas-main');
      canvasList[+prevElement.innerText-1].classList.remove('hide-main-canvas');

    } else {
      const canvasList = document.querySelectorAll('.canvas-main');
      canvasList[1].classList.remove('hide-main-canvas');
      canvasList[0].parentNode.removeChild(canvasList[0]); 

      imageList.shift(0 ,1);

    }
  }
}

function copyFrame(target) {
  if (target.offsetParent.classList.contains('frame-select')) {
    const currentFrame = target.offsetParent;
    const parent = currentFrame.parentNode;
    const number = +currentFrame.querySelector('.frame-number').innerText;
    const prevCanvasFrame = currentFrame.querySelector('.frame-canvas');

    const canvasList = document.querySelectorAll('.canvas-main');
    const parentCanvasMain = document.querySelector('.drawing');
    const prevCanvasMain = canvasList[number - 1];
    prevCanvasMain.classList.add('hide-main-canvas');

    const newFrame = document.createElement('li');
    newFrame.className = 'frame frame-select';
    newFrame.innerHTML = `
      <div class="left-top-corner"><p class="frame-number">${number + 1}</p></div>
      <div class="delete-frame frame-hide-functions"><img src="assets/delete.svg" alt="Delete frame" class="frame-icons-functions"></div>
      <div class="copy-frame frame-hide-functions"><img src="assets/copy.svg" alt="Copy frame" class="frame-icons-functions"></div>
      <div class="move-frame frame-hide-functions"><img src="assets/move-dots.svg" alt="Move frame" class="frame-icons-functions"></div>
      <canvas class="frame-canvas" width="107" height="107"></canvas>`;
      
    currentFrame.classList.remove('frame-select');

    parent.insertBefore(newFrame, currentFrame.nextSibling);

    updateNumFrames(newFrame);

    const mainCanvas = document.createElement('canvas');
    mainCanvas.className = 'canvas-main';

    mainCanvas.width = canvasWidth;
    mainCanvas.height = canvasHeight;

    parentCanvasMain.insertBefore(mainCanvas, prevCanvasMain.nextSibling);

    mainCanvas.getContext('2d').drawImage(prevCanvasMain, 0, 0);
    newFrame.querySelector('.frame-canvas').getContext('2d').drawImage(prevCanvasFrame, 0, 0);

    const prevImage = imageList[number - 1];

    imageList.splice(number - 1, 0, prevImage);

    selectedInstrument();
  }
}

function selectFrame(prevElement) {
  let frames = document.querySelectorAll('.frame');
  
  // if delete first element previous element equals null
  if (prevElement) {
    prevElement.classList.add('frame-select');
  } else if (prevElement === null) {
    framesList.firstElementChild.classList.add('frame-select');
  }
  
  // add function on frame click to change selection
  for (let i = 0; i < frames.length; i++) {
    frames[i].addEventListener('click', (event) => {
      const lastSelectFrame = document.querySelector('.frame-select');

      const currentSelectFrame = event.currentTarget;
      currentSelectFrame.classList.add('frame-select');

      const numSelectFrames = document.querySelectorAll('.frame-select');
      if (lastSelectFrame && numSelectFrames.length === 2) {
        lastSelectFrame.classList.remove('frame-select');
      }


      const lastCanvas = document.querySelector('.canvas-main:not(.hide-main-canvas)');

      const canvasList = document.querySelectorAll('.canvas-main');
      canvasList[+currentSelectFrame.innerText - 1].classList.remove('hide-main-canvas');

      const numShownCanvas = document.querySelectorAll('.canvas-main:not(.hide-main-canvas)');
      if (lastCanvas && numShownCanvas.length === 2) {
        lastCanvas.classList.add('hide-main-canvas');
      }

    });
  }
}

function selectElement(tool, styleClass) {
  const selectedTool = document.querySelector(`.${styleClass}`);

  if (selectedTool) selectedTool.classList.remove(styleClass);
  tool.classList.add(styleClass);
};

function operationsOnFrame() {
  const framesList = document.querySelector('.frames__list');
  let target = event.target;

  while (!target.classList.contains('frames__list') || target === null) {
    if (target.classList.contains('copy-frame')) {
      copyFrame(target);
    } else if (target.classList.contains('delete-frame')) {
      deleteFrame(target);
    } else if (target.classList.contains('move-frame')) {
      // TODO
      console.log('move');
    }
    target = target.parentNode || framesList.children[0].parentNode;
  }
};

// INSTRUMENTS

function selectedInstrument() {
  const selectedInstrument = document.querySelector('.instrument-select');
  if (selectedInstrument.classList.contains('pallete__ul--pencil')) {
    drawPencil();
  } else if (selectedInstrument.classList.contains('pallete__ul--bucket')) {
    paintBucket();
  } else if (selectedInstrument.classList.contains('pallete__ul--pipette')) {
    eyedropper();
  }
};

function rgbToHex(rgb) {
  let red = rgb.data[0];
  let green = rgb.data[1];
  let blue = rgb.data[2];
  let alpha = rgb.data[3];

  if (red === 0 && green === 0 && blue === 0 && alpha === 0) {
    return false
  } else {
    red.toString(16).length < 2 ? red = `0${red.toString(16)}` : red = `${red.toString(16)}`
    green.toString(16).length < 2 ? green = `0${green.toString(16)}` : green = `${green.toString(16)}`
    blue.toString(16).length < 2 ? blue = `0${blue.toString(16)}` : blue = `${blue.toString(16)}`

    return `#${red}${green}${blue}`;
  }
  
};

function moveImageFromBCanToS(mainCanvas, frame, w, h) {
  const resizeCnavas = document.createElement('canvas');
  resizeCnavas.width = 270;
  resizeCnavas.height = 270;
  const resizeContext = resizeCnavas.getContext('2d');
  resizeContext.drawImage(mainCanvas, 0, 0, w, h, 0, 0, 270, 270);

  imageList[+frame.innerText - 1] = resizeCnavas.toDataURL();
};

function drawPencil() {
  const canvas = document.querySelector('.canvas-main:not(.hide-main-canvas)');
  let isDrawing;

  let coordinates = document.querySelector('.coordinates');
  let sXCurrent = -1;
  let sYCurrent = -1;
  let sXLast = 0;
  let sYLast = 0;

  canvas.addEventListener('mousemove', (event) => {
    let ctx = canvas.getContext('2d');
    let x = event.offsetX;
    let y = event.offsetY;
    let squareX = Math.floor(x / 20);
    let squareY = Math.floor(y / 20);

    sXLast = sXCurrent;
    sYLast = sYCurrent;

    sXCurrent = squareX;
    sYCurrent = squareY;
    coordinates.innerHTML = `${squareX}:${squareY}`

    if ((sXCurrent !== sXLast || sYCurrent !== sYLast) && !isDrawing) {
      let colourCurrent = ctx.getImageData(sXCurrent*20, sYCurrent*20, 1, 1);
      let pixelColourCurrent = `rgba(${colourCurrent.data[0]},${colourCurrent.data[1]},${colourCurrent.data[2]},1)`
      let colourPrevious = ctx.getImageData(sXLast*20, sYLast*20, 1, 1);
      let pixelColourPrevious = `rgba(${colourPrevious.data[0]},${colourPrevious.data[1]},${colourPrevious.data[2]},1)`
      if (colourList.includes(pixelColourCurrent) && colourList.includes(pixelColourPrevious)) {
        ctx.clearRect(sXLast * 20, sYLast * 20, 20, 20);
        ctx.fillStyle = 'rgba(201,201,201, 0.1)';
        ctx.fillRect(sXCurrent * 20, sYCurrent * 20, 20, 20);
      }  
    }
  });

  canvas.removeEventListener('click', paintBucketAction);
  canvas.removeEventListener('click', eyedropperAction);
  canvas.addEventListener('mousedown', pencilDrawAction);
};

function paintBucket() {
  const canvas = document.querySelector('.canvas-main:not(.hide-main-canvas)');

  canvas.removeEventListener('click', eyedropperAction);
  canvas.removeEventListener('mousedown', pencilDrawAction);
  canvas.removeEventListener('mouseup', pencilDrawAction);

  canvas.addEventListener('click', paintBucketAction); 
}


function paintBucketAction(event) {
  const canvas = document.querySelector('.canvas-main:not(.hide-main-canvas)');
  const context = canvas.getContext('2d');

  let x = event.offsetX;
  let y = event.offsetY;
  let squareX = Math.floor(x / 20);
  let squareY = Math.floor(y / 20);

  let turnsList = [];
  turnsList.push([squareX, squareY]);
  
  while (turnsList.length) {
    newPos = turnsList.pop();
    squareX = newPos[0];
    squareY = newPos[1];
    let pixelList = context.getImageData(squareX * 20, squareY * 20, 1, 1);
    let colourBorder = rgbToHex(pixelList);
    let reachLeft = false;
    let reachRight = false;
    let leftSquareCheck = squareX - 1;
    let colorLeftSquare = '';
    let rightSquareCheck = squareX + 1;
    let colorRightSquare = '';
    while (!colourList.includes(colourBorder) && squareY !== 0) {
      squareY--;
      pixelList = context.getImageData(squareX * 20, squareY * 20, 1, 1);
      colourBorder = rgbToHex(pixelList);
    }
    pixelList = context.getImageData(squareX * 20, squareY * 20, 1, 1);
    colourBorder = rgbToHex(pixelList);
    if (colourList.includes(colourBorder)) squareY++;

    
    colourBorder = "";
    while (!colourList.includes(colourBorder) && squareY !== 32) {
      pixelList = context.getImageData(squareX * 20, squareY * 20, 1, 1);
      colourBorder = rgbToHex(pixelList);

      if (!colourList.includes(colourBorder)) {
        context.fillStyle = colour;
        context.fillRect(squareX * 20, squareY * 20, 20, 20);
      }

      // left side
      let pixelListLeft = context.getImageData(leftSquareCheck * 20, squareY * 20, 1, 1);
      colorLeftSquare = rgbToHex(pixelListLeft);
      if (!colourList.includes(colorLeftSquare)) {
        if (!reachLeft && leftSquareCheck !== -1) {
          turnsList.push([leftSquareCheck, squareY]);
          reachLeft = true;
        }   
      } else if (reachLeft) {
        reachLeft = false;
      }

      // right side
      let pixelListRight = context.getImageData(rightSquareCheck * 20, squareY * 20, 1, 1);
      colorRightSquare = rgbToHex(pixelListRight);
      if (!colourList.includes(colorRightSquare)) {
        if (!reachRight && rightSquareCheck !== 32) {
          turnsList.push([rightSquareCheck, squareY]);
          reachRight = true;
        }   
      } else if (reachRight) {
        reachRight = false;
      }
      squareY++;
      pixelList = context.getImageData(squareX * 20, squareY * 20, 1, 1);
      colourBorder = rgbToHex(pixelList);
    }
  }
  drawOnCanvases();
}

function drawOnCanvases() {
  const currentCanvas = document.querySelector('.canvas-main:not(.hide-main-canvas)');
  const currentFrame = document.querySelector('.frame-select');

  const canvasStyle = window.getComputedStyle(currentCanvas);
  const widthCanvas = parseInt(canvasStyle.getPropertyValue('width'));
  const heightCanvas = parseInt(canvasStyle.getPropertyValue('height'));

  let canvasFrame = currentFrame.lastElementChild;
  let canvasFrameContext = canvasFrame.getContext('2d');
  
  canvasFrameContext.clearRect(0,0,107,107);
  canvasFrameContext.drawImage(currentCanvas, 0, 0, widthCanvas, heightCanvas, 0, 0, 107, 107);
  moveImageFromBCanToS(currentCanvas, currentFrame, widthCanvas, heightCanvas);
};

function pencilDrawAction() { 
  const selectedInstrument = document.querySelector('.instrument-select');
  const canvas = document.querySelector('.canvas-main:not(.hide-main-canvas)');
  const context = canvas.getContext('2d'); 
  let isDrawing = true;
  
  canvas.addEventListener('mousemove', (event) => {
    if (isDrawing) {
      let x = event.offsetX;
      let y = event.offsetY;
      let squareX = Math.floor(x / 20);
      let squareY = Math.floor(y / 20);

      sXCurrent = squareX;
      sYCurrent = squareY;
      if (selectedInstrument.classList.contains('pallete__ul--pencil')) {
        context.fillStyle = colour;
        context.fillRect(sXCurrent * 20, sYCurrent * 20, 20, 20);
      } else if (selectedInstrument.classList.contains('pallete__ul--eraser')) {
        context.clearRect(sXCurrent * 20, sYCurrent * 20, 20, 20);
      }
    }
  });

  canvas.addEventListener('mouseup', (event) => {
    isDrawing = false;   
    drawOnCanvases();
  });
  canvas.addEventListener('click', drawOneSquare);
};

function eyedropper() {
  const canvas = document.querySelector('.canvas-main:not(.hide-main-canvas)');

  canvas.removeEventListener('click', drawOneSquare);
  canvas.removeEventListener('click', paintBucketAction); 
  canvas.removeEventListener('mouseup', pencilDrawAction);
  canvas.removeEventListener('mousedown', pencilDrawAction);
  
  canvas.addEventListener('click', eyedropperAction);
};

function eyedropperAction() {
  const canvas = document.querySelector('.canvas-main:not(.hide-main-canvas)');
  const context = canvas.getContext('2d');

  let x = event.offsetX;
  let y = event.offsetY;
  let squareX = Math.floor(x / 20);
  let squareY = Math.floor(y / 20);

  let pixelList = context.getImageData(squareX * 20, squareY * 20, 1, 1);
  let currentColour = rgbToHex(pixelList);

  if (currentColour !== false) {
    const colorPalette1st = document.querySelector('.first-colour');
    colorPalette1st.value = currentColour;
    colour = currentColour;
  }
};

function drawOneSquare(event) {
  const selectedInstrument = document.querySelector('.instrument-select');
  const canvas = document.querySelector('.canvas-main:not(.hide-main-canvas)');
  const context = canvas.getContext('2d'); 

  let x = event.offsetX;
  let y = event.offsetY;
  let squareX = Math.floor(x / 20);
  let squareY = Math.floor(y / 20);

  sXCurrent = squareX;
  sYCurrent = squareY;
  if (selectedInstrument.classList.contains('pallete__ul--pencil')) {
    context.fillStyle = colour;
    context.fillRect(sXCurrent * 20, sYCurrent * 20, 20, 20);
  } else if (selectedInstrument.classList.contains('pallete__ul--eraser')) {
    context.clearRect(sXCurrent * 20, sYCurrent * 20, 20, 20);
  }

  drawOnCanvases();
}

let numAnimation = imageList.length;
let currentAnimation = 0;

const slider = document.querySelector('.slider');
const fps = document.querySelector('.fps-number');
slider.addEventListener('click', (event) => {
  sliderValue = +event.target.value;
  fps.innerHTML = sliderValue;
  if (sliderValue === 0) {
    clearInterval(interval);
  } else {
    clearInterval(interval);
    interval = setInterval(animate, 1000/sliderValue);
  }
});

function animate() {
  const animationWindow = document.querySelector('.preview__animation');
  numAnimation = imageList.length;

  if (currentAnimation >= numAnimation) {
    currentAnimation = 0;
  }

  if (numAnimation !== 0) {
    animationWindow.style.backgroundImage = `url(${imageList[currentAnimation]})`;

    currentAnimation++; 
  }
}

let interval = setInterval(animate, 1000/sliderValue);