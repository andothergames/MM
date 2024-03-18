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

  //gridlines
  let startingX = 0;
  let startingY = 0;
  for (let i = 0; i < boardSize; i++) {
    drawColLine(startingX, 0, 450);
    drawRowLine(startingY, 0, 450);
    startingX += blockSize;
    startingY += blockSize;
  }

  //white corner boxes
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

//gridlines
function drawColLine(x, startY, endY) {
  context.beginPath();
  context.moveTo(x, startY);
  context.lineTo(x, endY);
  context.stroke();
}

function drawRowLine(y, startX, endX) {
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
  if (e.code == "ArrowUp") {
    meepleY = 0;
  } else if (e.code == "ArrowDown") {
    meepleY = (boardSize - 1) * blockSize;
  } else if (e.code == "ArrowLeft") {
    meepleX = 0;
  } else if (e.code == "ArrowRight") {
    meepleX = (boardSize - 1) * blockSize;
  }
}

//randomise target
function placeTarget() {
  targetX = Math.floor(Math.random() * boardSize) * blockSize;
  targetY = Math.floor(Math.random() * boardSize) * blockSize;
}
