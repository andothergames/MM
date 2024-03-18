// import { boardStructure } from "./board";

//board
const blockSize = 25;
const boardSize = 18;
let board;
let context;
let boardStructure = [{row:true,existson:1,after:2},
                      {row:true,existson:0,after:14},
                      {row:true,existson:10,after:0},
                      {row:true,existson:14,after:16},
                      {row:true,existson:2,after:3},
                      {row:false,existson:0,after:2},
                      {row:false,existson:5,after:5},
                      {row:true,existson:5,after:5},
                      {row:false,existson:0,after:4},
                      {row:false,existson:10,after:5},
                      {row:false,existson:0,after:6}];

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

//randomise target
function placeTarget() {
  targetX = Math.floor(Math.random() * boardSize) * blockSize;
  targetY = Math.floor(Math.random() * boardSize) * blockSize;
}
