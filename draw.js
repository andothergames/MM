function drawBoard() {
    context.fillStyle = "lightgrey";
    context.fillRect(0, 0, board.width, board.height);
    //black corner boxes
    context.fillStyle = "black";
    context.fillRect(0, 0, game.blockSize, game.blockSize);
    context.fillRect(
        (game.boardSize - 1) * game.blockSize,
        (game.boardSize - 1) * game.blockSize,
        game.blockSize,
        game.blockSize
      );
    drawWarps();
    drawTarget();
    drawGrid();
    drawWalls();
  }
  
  function drawGrid() {
    //gridlines
    let startingX = 0;
    let startingY = 0;
    for (let i = 0; i < game.boardSize; i++) {
      drawColLine(startingX, 0, game.blockSize * game.boardSize);
      drawRowLine(startingY, 0, game.blockSize * game.boardSize);
      startingX += game.blockSize;
      startingY += game.blockSize;
    }
  }
  
  function drawTarget() {
    //target
    drawCircle("deeppink", game.targetX * game.blockSize, game.targetY * game.blockSize, game.blockSize, 2);
    drawCircle("white", game.targetX * game.blockSize, game.targetY * game.blockSize, game.blockSize, 3);
    drawCircle("deeppink", game.targetX * game.blockSize, game.targetY * game.blockSize, game.blockSize, 5);
  }
  
  function drawWarps() {
  //warp points
  drawCircle("cornflowerblue", game.warpPoint1X * game.blockSize, game.warpPoint1Y * game.blockSize, game.blockSize, 4);
  drawCircle("cornflowerblue", game.warpPoint2X * game.blockSize, game.warpPoint2Y * game.blockSize, game.blockSize, 4);
  drawCircle("cornflowerblue", game.warpPoint3X * game.blockSize, game.warpPoint3Y * game.blockSize, game.blockSize, 4);
  drawCircle("cornflowerblue", game.warpPoint4X * game.blockSize, game.warpPoint4Y * game.blockSize, game.blockSize, 4);
  }
  
  function drawWalls() {
    context.lineWidth = 3;
    context.strokeStyle = "MidnightBlue";
    for (let i = 0; i < boardStructure.length; i++) {
      wall = boardStructure[i];
      context.beginPath();
      if (wall.row) {
        context.moveTo((wall.after + 1) * game.blockSize, wall.existson * game.blockSize);
        context.lineTo(
          (wall.after + 1) * game.blockSize,
          (wall.existson + 1) * game.blockSize
        );
      } else {
        context.moveTo(wall.existson * game.blockSize, (wall.after + 1) * game.blockSize);
        context.lineTo(
          (wall.existson + 1) * game.blockSize,
          (wall.after + 1) * game.blockSize
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
    context.arc(x + game.blockSize / 2, y + game.blockSize / 2, r / div, 0, 2 * Math.PI);
    context.fill();
  }