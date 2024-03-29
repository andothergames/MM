function drawBoard() {
  context.fillStyle = "lightgrey";
  context.fillRect(0, 0, board.width, board.height);
  context.fillStyle = "black";
  context.fillRect(0, 0, game.blockSize, game.blockSize);
  context.fillRect(
    (game.boardSize - 1) * game.blockSize,
    (game.boardSize - 1) * game.blockSize,
    game.blockSize,
    game.blockSize
  );
  drawTarget();
  drawWarps();
  drawGrid();
  drawWalls();
  updateCounterVisual()
}

function drawTarget() {
  const sizes = [2, 3, 5];
  const colors = ["deeppink", "white", "deeppink"]
  for (let i = 0; i < sizes.length; i++) {
    drawCircle(
      colors[i],
      game.targetX * game.blockSize,
      game.targetY * game.blockSize,
      game.blockSize,
      sizes[i]
    );
  }
}

function drawWarps() {
  for (let i = 0; i < game.warps.length; i++) {
    drawCircle(
      game.warpColour,
      game.warps[i].x * game.blockSize,
      game.warps[i].y * game.blockSize,
      game.blockSize,
      4
      );
  }
}

function drawGrid() {
  let startingX = 0;
  let startingY = 0;
  for (let i = 0; i < game.boardSize; i++) {
    drawColLine(startingX, 0, game.blockSize * game.boardSize);
    drawRowLine(startingY, 0, game.blockSize * game.boardSize);
    startingX += game.blockSize;
    startingY += game.blockSize;
  }
}

function drawWalls() {
  context.lineWidth = game.wallWidth;
  context.strokeStyle = game.wallColour;
  for (let i = 0; i < boardStructure.length; i++) {
    wall = boardStructure[i];
    context.beginPath();
    if (wall.row) {
      context.moveTo(
        (wall.after + 1) * game.blockSize,
        wall.existson * game.blockSize
      );
      context.lineTo(
        (wall.after + 1) * game.blockSize,
        (wall.existson + 1) * game.blockSize
      );
    } else {
      context.moveTo(
        wall.existson * game.blockSize,
        (wall.after + 1) * game.blockSize
      );
      context.lineTo(
        (wall.existson + 1) * game.blockSize,
        (wall.after + 1) * game.blockSize
      );
    }
    context.closePath();
    context.stroke();
  }
}

//draws meeples with updated coords on board, blockSizeOffset used to make space for gridline pixels
function drawMeeples() {
  for (let i = 0; i < game.meeples.length; i++) {
    context.fillStyle = game.meeples[i].color;
    context.fillRect(
      game.meeples[i].xPos * game.blockSize + game.blockSizeOffset,
      game.meeples[i].yPos * game.blockSize + game.blockSizeOffset,
      game.blockSize - game.blockSizeOffset * 2,
      game.blockSize - game.blockSizeOffset * 2
    );
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
  context.arc(
    x + game.blockSize / 2,
    y + game.blockSize / 2,
    r / div,
    0,
    2 * Math.PI
  );
  context.fill();
}
