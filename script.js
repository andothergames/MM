//board
const blockSize = 25;
const boardSize = 18;
let board;
let context;

//meeple
let meepleX = blockSize * 5;
let meepleY = blockSize * 5;

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
  context.fillRect(meepleX, meepleY, blockSize, blockSize);

  //warp points
  drawCircle("cornflowerblue", (3 * blockSize), (3 * blockSize), blockSize, 4);
  drawCircle("cornflowerblue", (7 * blockSize), (7 * blockSize), blockSize, 4);
  drawCircle("cornflowerblue", (10 * blockSize), (10 * blockSize), blockSize, 4);
  drawCircle("cornflowerblue", (14 * blockSize), (14 * blockSize), blockSize, 4);


  //gridlines
  let startingX = 0;
  let startingY = 0;
  for (let i = 0; i < boardSize; i++) {
    drawColLine(startingX, 0, 450);
    drawRowLine(startingY, 0, 450);
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
      meepleY = (meepleX == 0) ? blockSize : boundaries.upper * blockSize;
      break;
    case "ArrowDown":
      meepleY = (meepleX == (boardSize - 1) * blockSize) ? (boardSize - 2) * blockSize : boundaries.lower * blockSize;
      break;
    case "ArrowLeft":
      meepleX = (meepleY == 0) ? blockSize : 0;
      break;
    case "ArrowRight":
      meepleX = (meepleY == (boardSize - 1) * blockSize) ? (boardSize - 2) * blockSize : (boardSize - 1) * blockSize;
      break;
  }
}

// I need to refactor some code so that we only multiply through blocksize when we want to draw
// the meeple. All calculations should be done on a zero-indexed set of rows/columns. this will
// need to start up at the initial meepleX/meepleY declarations at the top of that file.

function calculateLimits() {
  let limits = {upper:0, lower:boardSize - 1, left:0, right:boardSize - 1};
  for (let i = 0; i < boardStructure.length; i++) {
    let wall = boardStructure[i];
    if (!wall.row && wall.existson == meepleX / blockSize) {
      if (wall.after > limits.upper && wall.after < meepleY / blockSize) {
        limits.upper = wall.after + 1;
      }
      if (wall.after < limits.lower && wall.after > meepleY / blockSize) {
        limits.lower = wall.after;
        console.log(limits)
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
