//board
const blockSize = 25;
const boardSize = 18;
let board;
let context;

//meeples
const meeples = [
  meepleGreen,
  meepleGrey,
  meepleBlue,
  meepleBrown,
  meepleRed,
  meepleWhite,
  meepleYellow,
  meepleBlack,
];

//buttons
const buttonGreen = document.getElementById("forrestjump");
const buttonGrey = document.getElementById("ozzymosis");
const buttonBlue = document.getElementById("bluebeamer");
const buttonBrown = document.getElementById("shortstop");
const buttonRed = document.getElementById("sidestep");
const buttonWhite = document.getElementById("skewt");
const buttonYellow = document.getElementById("mcedge");
const buttonBlack = document.getElementById("carbon");

const buttonGreenab = document.getElementById("forrestjumpab");
const buttonGreyab = document.getElementById("ozzymosisab");
const buttonBlueab = document.getElementById("bluebeamerab");
const buttonBrownab = document.getElementById("shortstopab");
const buttonRedab = document.getElementById("sidestepab");
const buttonWhiteab = document.getElementById("skewtab");
const buttonYellowab = document.getElementById("mcedgeab");
const buttonBlackab = document.getElementById("carbonab");

buttonGreen.addEventListener("click", function () {
  activateMeeple(meepleGreen);
});

buttonGrey.addEventListener("click", function () {
  activateMeeple(meepleGrey);
});

buttonBlue.addEventListener("click", function () {
  activateMeeple(meepleBlue);
});

buttonBrown.addEventListener("click", function () {
  activateMeeple(meepleBrown);
});

buttonRed.addEventListener("click", function () {
  activateMeeple(meepleRed);
});

buttonWhite.addEventListener("click", function () {
  activateMeeple(meepleWhite);
});

buttonYellow.addEventListener("click", function () {
  activateMeeple(meepleYellow);
});

buttonBlack.addEventListener("click", function () {
  activateMeeple(meepleBlack);
});

document.addEventListener("keypress", function (e) {
  switch(e.code) {
    case "Digit1":
    case "Numpad1":
      activateMeeple(meepleGreen);
      break;
    case "Digit2":
    case "Numpad2":
      activateMeeple(meepleGrey);
      break;
    case "Digit3":
    case "Numpad3":
      activateMeeple(meepleBlue);
      break;
    case "Digit4":
    case "Numpad4":
      activateMeeple(meepleBrown);
      break;
    case "Digit5":
    case "Numpad5":
      activateMeeple(meepleRed);
      break;
    case "Digit6":
    case "Numpad6":
      activateMeeple(meepleWhite);
      break;
    case "Digit7":
    case "Numpad7":
      activateMeeple(meepleYellow);
      break;
    case "Digit8":
    case "Numpad8":
      activateMeeple(meepleBlack);
      break;
  }
});

//target
let targetX;
let targetY;

//gameover
let gameOver = false;

window.onload = function () {
  board = document.getElementById("board");
  tinkering();
  board.height = boardSize * blockSize;
  board.width = boardSize * blockSize;
  context = board.getContext("2d");

  placeTarget();
  document.addEventListener("keyup", move);
  setInterval(update, 1000 / 10);
};

function update() {
  //gameover
  if (targetHit()) {
    placeTarget();
  }

  //board
  context.fillStyle = "lightgrey";
  context.fillRect(0, 0, board.width, board.height);

  //warp points
  drawCircle("cornflowerblue", 3 * blockSize, 3 * blockSize, blockSize, 4);
  drawCircle("cornflowerblue", 7 * blockSize, 7 * blockSize, blockSize, 4);
  drawCircle("cornflowerblue", 10 * blockSize, 10 * blockSize, blockSize, 4);
  drawCircle("cornflowerblue", 14 * blockSize, 14 * blockSize, blockSize, 4);

  //draw meeples
  for (let i = 0; i < meeples.length; i++) {
    context.fillStyle = meeples[i].color;
    context.fillRect(
      meeples[i].xPos * blockSize,
      meeples[i].yPos * blockSize,
      blockSize,
      blockSize
    );
  }

  //target
  drawCircle("deeppink", targetX * blockSize, targetY * blockSize, blockSize, 2);
  drawCircle("white", targetX * blockSize, targetY * blockSize, blockSize, 3);
  drawCircle("deeppink", targetX * blockSize, targetY * blockSize, blockSize, 5);

  //gridlines
  let startingX = 0;
  let startingY = 0;
  for (let i = 0; i < boardSize; i++) {
    drawColLine(startingX, 0, blockSize * boardSize);
    drawRowLine(startingY, 0, blockSize * boardSize);
    startingX += blockSize;
    startingY += blockSize;
  }

  drawWalls();

  //black corner boxes
  context.fillStyle = "black";
  context.fillRect(0, 0, blockSize, blockSize);
  context.fillRect(
    (boardSize - 1) * blockSize,
    (boardSize - 1) * blockSize,
    blockSize,
    blockSize
  );
}

//FUNCTIONS
// 
function drawWalls() {
  context.lineWidth = 3;
  context.strokeStyle = "MidnightBlue";
  for (let i = 0; i < boardStructure.length; i++) {
    wall = boardStructure[i];
    context.beginPath();
    if (wall.row) {
      context.moveTo((wall.after + 1) * blockSize, wall.existson * blockSize);
      context.lineTo(
        (wall.after + 1) * blockSize,
        (wall.existson + 1) * blockSize
      );
    } else {
      context.moveTo(wall.existson * blockSize, (wall.after + 1) * blockSize);
      context.lineTo(
        (wall.existson + 1) * blockSize,
        (wall.after + 1) * blockSize
      );
    }
    context.closePath();
    context.stroke();
  }
}

//gridlines
function drawColLine(x, startY, endY) {
  context.lineWidth = 1;
  context.strokeStyle = "black";
  context.beginPath();
  context.moveTo(x, startY);
  context.lineTo(x, endY);
  context.stroke();
}

function drawRowLine(y, startX, endX) {
  context.lineWidth = 1;
  context.strokeStyle = "black";
  context.beginPath();
  context.moveTo(startX, y);
  context.lineTo(endX, y);
  context.stroke();
}

//circles
function drawCircle(color, x, y, r, div) {
  context.fillStyle = color;
  context.beginPath();
  context.arc(x + blockSize / 2, y + blockSize / 2, r / div, 0, 2 * Math.PI);
  context.fill();
}

//movement
function move(e) {
  let m = findActive();

  let boundaries = calculateLimits();
  switch (e.code) {
    case "ArrowUp":
      m.yPos = boundaries.upper;
      break;
    case "ArrowDown":
      m.yPos = boundaries.lower;
      break;
    case "ArrowLeft":
      m.xPos = boundaries.left;
      break;
    case "ArrowRight":
      m.xPos = boundaries.right;
      break;
  }
}

function calculateLimits() {
  let m = findActive();
  let r = m.yPos;
  let c = m.xPos;
  let limits = {
    upper: 0,
    lower: boardSize - 1,
    left: 0,
    right: boardSize - 1,
  };
  if (m.xPos == 0) limits.upper = 1;
  if (m.xPos == boardSize - 1) limits.lower = boardSize - 2;
  if (m.yPos == 0) limits.left = 1;
  if (m.yPos == boardSize - 1) limits.right = boardSize - 2;

  for (let i = 0; i < boardStructure.length; i++) {
    let wall = boardStructure[i];
    //columns
    if (!wall.row && wall.existson == m.xPos) {
      if (wall.after >= limits.upper && wall.after < m.yPos) {
        limits.upper = wall.after + 1;
      }
      if (wall.after < limits.lower && wall.after >= m.yPos) {
        limits.lower = wall.after;
      }
    }

    //rows
    if (wall.row && wall.existson == m.yPos) {
      if (wall.after >= limits.left && wall.after < m.xPos) {
        limits.left = wall.after + 1;
      }
      if (wall.after < limits.right && wall.after >= m.xPos) {
        limits.right = wall.after;
      }
    }
  }

  for (let i = 0; i < meeples.length; i++) {
    if (!meeples[i].isActive) {
      //columns
      if (meeples[i].xPos === c) {
      if (meeples[i].yPos >= limits.upper && meeples[i].yPos < r) {
        limits.upper = meeples[i].yPos + 1;
      }
      if (meeples[i].yPos <= limits.lower && meeples[i].yPos > r) {
        limits.lower = meeples[i].yPos - 1;
      }
    }
     //rows
    if (meeples[i].yPos === r) {

      if (meeples[i].xPos >= limits.left && meeples[i].xPos < c) {
        limits.left = meeples[i].xPos + 1;
      }
      if (meeples[i].xPos <= limits.right && meeples[i].xPos > c) {
        limits.right = meeples[i].xPos - 1;
      }
    }    
  }
  }
  return limits;
}

//randomise target
function placeTarget() {
  targetX = Math.floor(Math.random() * boardSize);
  targetY = Math.floor(Math.random() * boardSize);
}

//findActiveMeeple
function findActive() {
  for (let i = 0; i < meeples.length; i++) {
    if (meeples[i].isActive) {
      return meeples[i];
    }
  }
}


//activateMeeples
function activateMeeple(m) {
  for (let i = 0; i < meeples.length; i++) {
    meeples[i].isActive = (m === meeples[i]);
    meeples[i].isActive ? document.getElementById(meeples[i].name).classList.add('active') : document.getElementById(meeples[i].name).classList.remove('active')
  }  
}

function targetHit() {
  let active = findActive();
  if (active === undefined) return false;
  let x = active.xPos;
  let y = active.yPos;
  return x === targetX && y === targetY;
}

//ability used style
function abilityUsedStyle(m) {
  const meeplehtml = document.getElementById(`${m.name}ab`)
  meeplehtml.innerText = '&starf';
}

function tinkering() {
  board.addEventListener('click', function(e) {
    let x = Math.floor(e.offsetX / blockSize);
    let y = Math.floor(e.offsetY / blockSize);
    if (x === targetX && y === targetY) {
      console.log("you hit the target");
    }
    for (let i = 0; i < meeples.length; i++) {
      if (meeples[i].xPos === x && meeples[i].yPos === y) {
        activateMeeple(meeples[i]);
        break;
      }
    }
    console.log(x + " - " + y);
  })
}