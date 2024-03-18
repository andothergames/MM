//board
var blockSize = 25;
var boardSize = 18;
var board;
var context;

//meeple
var meepleX = blockSize * 5;
var meepleY = blockSize * 5;
var velocityX = 0;
var velocityY = 0;

//target
var targetX;
var targetY;

//gameover
var gameOver = false;

window.onload = function () {
  board = document.getElementById("board");
  board.height = boardSize * blockSize;
  board.width = boardSize * blockSize;
  context = board.getContext("2d"); //used for drawing on the board

  placeTarget();
  document.addEventListener("keyup", move);
  update();
};

//draw line functions

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

function update() {
  //gameover
  if (gameOver) {
    return;
  }

  //board
  context.fillStyle = "lightgrey";
  context.fillRect(0, 0, board.width, board.height);
  

  //target
  context.fillStyle = "deeppink";
  context.fillRect(targetX, targetY, blockSize, blockSize);
  // context.arc(targetX, targetY, 50, 0, 2 * Math.PI);

  //meeple
  context.fillStyle = "aquamarine";
  context.fillRect(meepleX, meepleY, blockSize, blockSize);

  //col lines
  let startingX = 0;
  for (let i = 0; i < boardSize; i++) {
    drawColLine(startingX, 0, 450)
    startingX += blockSize; 
  }

  //row lines
  let startingY = 0;
  for (let i = 0; i < boardSize; i++) {
    drawRowLine(startingY, 0, 450)
    startingY += blockSize; 
  }


  //white corner boxes
  context.fillStyle = "white";
  context.fillRect(0, 0, blockSize, blockSize);
  context.fillRect(
    (boardSize - 1) * blockSize,
    (boardSize - 1) * blockSize,
    blockSize,
    blockSize
  );

}

function move(e) {
  // if (e.code == "ArrowUp" && velocityY != 1) {
  //     velocityX  = 0;
  //     velocityY  = -1;
  // }
  // else if (e.code == "ArrowDown" && velocityY != -1) {
  //     velocityX  = 0;
  //     velocityY  = +1;
  // }
  // else if (e.code == "ArrowLeft"  && velocityX != 1) {
  //     velocityX  = -1;
  //     velocityY  = 0;
  // }
  // else if (e.code == "ArrowRight"  && velocityX != -1) {
  //     velocityX  = 1;
  //     velocityY  = 0;
  // }
}

function placeTarget() {
  targetX = Math.floor(Math.random() * boardSize) * blockSize;
  targetY = Math.floor(Math.random() * boardSize) * blockSize;
}
