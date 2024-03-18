//board
var blockSize = 25;
var boardSize = 18;
var board;
var context;
var boardStructure = [{row:true,existson:1,after:2},
                      {row:true,existson:0,after:14},
                      {row:true,existson:10,after:0},
                      {row:true,existson:14,after:16},
                      {row:true,existson:2,after:3}];

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

// var boardStructure = [{row:true,existson:1,between:[2,3]}];

function drawWalls() {
  context.lineWidth=3;
  context.strokeStyle = "blue";
    for (let i = 0; i < boardStructure.length; i++) {
      context.beginPath();
      context.moveTo((boardStructure[i].after + 1) * blockSize, boardStructure[i].existson * blockSize);
      context.lineTo((boardStructure[i].after + 1) * blockSize, (boardStructure[i].existson + 1) * blockSize);
      context.closePath();
      context.stroke();
    }

}

//draw line functions
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

function move(e) {
  if (e.code == "ArrowUp") {
    meepleY = 0;
  }
  else if (e.code == "ArrowDown") {
    meepleY = (boardSize - 1) * blockSize;
  }
  else if (e.code == "ArrowLeft") {
    meepleX = 0;
  }
  else if (e.code == "ArrowRight") {
    meepleX = (boardSize - 1) * blockSize;
  }
}

function placeTarget() {
  targetX = Math.floor(Math.random() * boardSize) * blockSize;
  targetY = Math.floor(Math.random() * boardSize) * blockSize;
}
