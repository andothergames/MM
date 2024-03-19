//board
const blockSize = 25;
const boardSize = 18;
let board;
let context;

//meeple
let meepleX = 5;
let meepleY = 5;

//target
let targetX;
let targetY;

//gameover
let gameOver = false;



window.onload = function () {
  board = document.getElementById("board");
  board.height = boardSize * blockSize;
  board.width = boardSize * blockSize;
  context = board.getContext("2d"); //used for drawing on the board

  placeTarget();
  document.addEventListener("keyup", move);
  setInterval(update, 1000 / 10);
};

function update() {
  //gameover
  if (gameOver) {
    return;
  }

  //board
  context.fillStyle = "lightgrey";
  context.fillRect(0, 0, board.width, board.height);

  //target
  drawCircle("deeppink", targetX, targetY, blockSize, 2);
  drawCircle("white", targetX, targetY, blockSize, 3);
  drawCircle("deeppink", targetX, targetY, blockSize, 5);

  //meeple
  context.fillStyle = "aquamarine";
  context.fillRect(meepleX * blockSize, meepleY * blockSize, blockSize, blockSize);

  //warp points
  drawCircle("cornflowerblue", (3 * blockSize), (3 * blockSize), blockSize, 4);
  drawCircle("cornflowerblue", (7 * blockSize), (7 * blockSize), blockSize, 4);
  drawCircle("cornflowerblue", (10 * blockSize), (10 * blockSize), blockSize, 4);
  drawCircle("cornflowerblue", (14 * blockSize), (14 * blockSize), blockSize, 4);


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

function drawWalls() {
  context.lineWidth=3;
  context.strokeStyle = "blue";
    for (let i = 0; i < boardStructure.length; i++) {
      wall = boardStructure[i];
      context.beginPath();
      if(wall.row) {
        context.moveTo((wall.after + 1) * blockSize, wall.existson * blockSize);
        context.lineTo((wall.after + 1) * blockSize, (wall.existson + 1) * blockSize);
      } else {
        context.moveTo(wall.existson * blockSize, (wall.after + 1) * blockSize);
        context.lineTo((wall.existson + 1) * blockSize, (wall.after + 1) * blockSize);
      }
      context.closePath();
      context.stroke();
    }

}

//FUNCTIONS

//gridlines
function drawColLine(x, startY, endY) {
  context.lineWidth=1;
  context.strokeStyle = "black";
  context.beginPath();
  context.moveTo(x, startY);
  context.lineTo(x, endY);
  context.stroke();
}

function drawRowLine(y, startX, endX) {
  context.lineWidth=1;
  context.strokeStyle = "black";
  context.beginPath();
  context.moveTo(startX, y);
  context.lineTo(endX, y);
  context.stroke();
}

//target circle
function drawCircle(color, x, y, r, div) {
  context.fillStyle = color;
  context.beginPath();
  context.arc(x + 12.5, y + 12.5, r / div, 0, 2 * Math.PI);
  context.fill();
}

//movement
function move(e) {
  
  let boundaries = calculateLimits();
  switch (e.code) {
    case "ArrowUp":
      meepleY = boundaries.upper;
      break;
    case "ArrowDown":
      meepleY = boundaries.lower;
      break;
    case "ArrowLeft":
      meepleX = boundaries.left;
      break;
    case "ArrowRight":
      meepleX = boundaries.right;
      break;
  }
}

function calculateLimits() {
  let limits = {upper:0, lower:boardSize - 1, left:0, right:boardSize - 1};
  if (meepleX == 0) limits.upper = 1;
  if (meepleX == boardSize - 1) limits.lower = boardSize - 2;
  if (meepleY == 0) limits.left = 1;
  if (meepleY == boardSize - 1) limits.right = boardSize - 2;
  

  for (let i = 0; i < boardStructure.length; i++) {
    let wall = boardStructure[i];
    if (!wall.row && wall.existson == meepleX) {
      if (wall.after >= limits.upper && wall.after < meepleY) {
        limits.upper = wall.after + 1;
      }
      if (wall.after < limits.lower && wall.after >= meepleY) {
        limits.lower = wall.after;
      }
    }
    if (wall.row && wall.existson == meepleY) {
      if (wall.after >= limits.left && wall.after < meepleX) {
        limits.left = wall.after + 1;
      }
      if (wall.after < limits.right && wall.after >= meepleX) {
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
