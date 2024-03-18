//board
var blockSize = 25;
var boardSize = 18;
var board;
var context;

//meeple
var meepleX = blockSize * 5;
var meepleY = blockSize * 5;


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
  setInterval(update, 1000/10);
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
  context.fillStyle = "deeppink";
  context.beginPath();
  context.arc(targetX + 12.5, targetY + 12.5, blockSize / 2, 0, 2 * Math.PI);
  context.fill();
  
  context.fillStyle = "white";
  context.beginPath();
  context.arc(targetX + 12.5, targetY + 12.5, blockSize / 3, 0, 2 * Math.PI);
  context.fill();

  context.fillStyle = "deeppink";
  context.beginPath();
  context.arc(targetX + 12.5, targetY + 12.5, blockSize / 5, 0, 2 * Math.PI);
  context.fill();


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
  context.fillStyle = "black";
  context.fillRect(0, 0, blockSize, blockSize);
  context.fillRect(
    (boardSize - 1) * blockSize,
    (boardSize - 1) * blockSize,
    blockSize,
    blockSize
  );

}

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

function move(e) {
  switch (e.code) {
    case "ArrowUp":
      meepleY = (meepleX == 0) ? blockSize : 0;
      break;
    case "ArrowDown":
      meepleY = (meepleX == (boardSize - 1) * blockSize) ? (boardSize - 2) * blockSize : (boardSize - 1) * blockSize;
      break;
    case "ArrowLeft":
      meepleX = (meepleY == 0) ? blockSize : 0;
      break;
    case "ArrowRight":
      meepleX = (meepleY == (boardSize - 1) * blockSize) ? (boardSize - 2) * blockSize : (boardSize - 1) * blockSize;
      break;
  }
  
}

function placeTarget() {
  targetX = Math.floor(Math.random() * boardSize) * blockSize;
  targetY = Math.floor(Math.random() * boardSize) * blockSize;
}
