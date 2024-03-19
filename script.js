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

buttonGreen.addEventListener("click", function () {
  activeMeeple(meepleGreen);
});

buttonGrey.addEventListener("click", function () {
  activeMeeple(meepleGrey);
});

buttonBlue.addEventListener("click", function () {
  activeMeeple(meepleBlue);
});

buttonBrown.addEventListener("click", function () {
  activeMeeple(meepleBrown);
});

buttonRed.addEventListener("click", function () {
  activeMeeple(meepleRed);
});

buttonWhite.addEventListener("click", function () {
  activeMeeple(meepleWhite);
});

buttonYellow.addEventListener("click", function () {
  activeMeeple(meepleYellow);
});

buttonBlack.addEventListener("click", function () {
  activeMeeple(meepleBlack);
});

//meeple
let meepleX = 2;
let meepleY = 2;

//target
let targetX;
let targetY;

//gameover
let gameOver = false;

window.onload = function () {
  board = document.getElementById("board");
  board.height = boardSize * blockSize;
  board.width = boardSize * blockSize;
  context = board.getContext("2d");

  placeTarget();
  document.addEventListener("keyup", move);
  setInterval(update, 1000 / 10);
};

function update() {
  //gameover
  if (gameOver) {
    return;
  }

  //gamewin
  if (targetX == meepleX && targetY == meepleY) {
    alert("you win!");
  }

  //board
  context.fillStyle = "lightgrey";
  context.fillRect(0, 0, board.width, board.height);

  //warp points
  drawCircle("cornflowerblue", 3 * blockSize, 3 * blockSize, blockSize, 4);
  drawCircle("cornflowerblue", 7 * blockSize, 7 * blockSize, blockSize, 4);
  drawCircle("cornflowerblue", 10 * blockSize, 10 * blockSize, blockSize, 4);
  drawCircle("cornflowerblue", 14 * blockSize, 14 * blockSize, blockSize, 4);

  //target
  drawCircle("deeppink", targetX, targetY, blockSize, 2);
  drawCircle("white", targetX, targetY, blockSize, 3);
  drawCircle("deeppink", targetX, targetY, blockSize, 5);

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

function drawWalls() {
  context.lineWidth = 3;
  context.strokeStyle = "blue";
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
  context.arc(x + 12.5, y + 12.5, r / div, 0, 2 * Math.PI);
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
    if (!wall.row && wall.existson == m.xPos) {
      if (wall.after >= limits.upper && wall.after < m.yPos) {
        limits.upper = wall.after + 1;
      }
      if (wall.after < limits.lower && wall.after >= m.yPos) {
        limits.lower = wall.after;
      }
    }
    if (wall.row && wall.existson == m.yPos) {
      if (wall.after >= limits.left && wall.after < m.xPos) {
        limits.left = wall.after + 1;
      }
      if (wall.after < limits.right && wall.after >= m.xPos) {
        limits.right = wall.after;
      }
    }
  }
  return limits;
}

//randomise target
function placeTarget() {
  targetX = Math.floor(Math.random() * boardSize) * blockSize;
  targetY = Math.floor(Math.random() * boardSize) * blockSize;
}

//findActiveMeeple
function findActive() {
  for (let i = 0; i < meeples.length; i++) {
    if (meeples[i].isActive) {
      return meeples[i];
    }
  }
}


//activeMeeples
function activeMeeple(m) {
  for (let i = 0; i < meeples.length; i++) {
    meeples[i].isActive = (m === meeples[i]);
  }  
}
