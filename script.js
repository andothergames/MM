let board;
let context;
const currentBoardState = {};

document.addEventListener("keypress", function (e) {
  switch (e.code) {
    case "Digit1":
    case "Numpad1":
      activateMeeple(meepleGreen);
      break;
    case "Digit2":
    case "Numpad2":
      activateMeeple(meepleGrey);
      break;
    case "Digit3":
    case "Numpad3":
      activateMeeple(meepleBlue);
      break;
    case "Digit4":
    case "Numpad4":
      activateMeeple(meepleBrown);
      break;
    case "Digit5":
    case "Numpad5":
      activateMeeple(meepleRed);
      break;
    case "Digit6":
    case "Numpad6":
      activateMeeple(meepleWhite);
      break;
    case "Digit7":
    case "Numpad7":
      activateMeeple(meepleYellow);
      break;
    case "Digit8":
    case "Numpad8":
      activateMeeple(meepleBlack);
      break;
  }
});

window.onload = function () {
  initialise();
  buttonSetUp();
};

function initialise() {
  board = document.getElementById("board");
  board.height = game.boardSize * game.blockSize;
  board.width = game.boardSize * game.blockSize;
  context = board.getContext("2d");
  calculateTargetPosition();
  document.addEventListener("keyup", move);
  updateVisuals();
}

function assessGameState() {
  if (targetHit()) {
    incrementScore();
    game.gameOver = checkForGameWon();
    if (game.gameOver) {
      alert('you have won!')
    }
    calculateTargetPosition();
  }
  updateVisuals();
}

function incrementScore() {
  const activeMeeple = getActiveMeeple();
    if (!activeMeeple.reachedTarget) {
      activeMeeple.reachedTarget = true;
      game.winningMeeples.push(activeMeeple.name);
      applyReachedTargetStyle(activeMeeple);
    }
}

function updateVisuals() {
  drawBoard();
  drawMeeples();
}


//findActiveAbility
function findActiveAbility() {
  for (let i = 0; i < game.meeples.length; i++) {
    if (game.meeples[i].abilityActive) {
      return game.meeples[i];
    }
  }
}

//meepleAbility
function meepleAbility() {
  const m = getActiveMeeple();

  if (m.name === "forrestjump") {
    const dir = validSquaresGreenAbility(m);
    console.log(dir);
    highlightAbilitySquares(dir);
  }
  if (m.name === "ozzymosis") {
    const dir = validSquaresGreyAbility(m);
    highlightAbilitySquares(dir);
  }
  if (m.name === "bluebeamer") {
    const dir = validSquaresBlueAbility(m);
    highlightAbilitySquares(dir);
  }
  if (m.name === "shortstop") {
    const dir = validSquaresRedAbility(m);
    highlightAbilitySquares(dir);
  }
  if (m.name === "sidestep") {
    const dir = validSquaresBrownAbility(m);
    highlightAbilitySquares(dir);
  }
  if (m.name === "skewt") {
    const dir = validSquaresWhiteAbility(m);
    highlightAbilitySquares(dir);
  }
  if (m.name === "mcedge") {
    const dir = validSquaresYellowAbility(m);
    highlightAbilitySquares(dir);
  }
  if (m.name === "carbon") {
    const dir = validSquaresBlackAbility(m);
    highlightAbilitySquares(dir);
  }
}

//ability used style
function abilityUsedStyle(m) {
  const meeplehtml = document.getElementById(`${m.name}ab`);
  meeplehtml.innerText = "★";
}

function highlightAbilitySquares(dir) {
  context.fillStyle = "pink";

  for (let key in dir) {
    context.fillRect(
      dir[key].x * game.blockSize,
      dir[key].y * game.blockSize,
      game.blockSize,
      game.blockSize
    );
  }
}

//valid squares functions

function validSquaresGreenAbility(meeple) {
  const dir = {};

  if (squareIsValid(meeple.xPos, meeple.yPos - 3)) {
    dir.up = { x: meeple.xPos, y: meeple.yPos - 3 };
  }
  if (squareIsValid(meeple.xPos, meeple.yPos + 3)) {
    dir.down = { x: meeple.xPos, y: meeple.yPos + 3 };
  }
  if (squareIsValid(meeple.xPos - 3, meeple.yPos)) {
    dir.left = { x: meeple.xPos - 3, y: meeple.yPos };
  }
  if (squareIsValid(meeple.xPos + 3, meeple.yPos)) {
    dir.right = { x: meeple.xPos + 3, y: meeple.yPos };
  }
  return dir;
}

function validSquaresRedAbility(meeple) {
  const dir = {};

  if (squareIsValid(meeple.xPos, meeple.yPos - 1)) {
    dir.up = { x: meeple.xPos, y: meeple.yPos - 1 };
  }
  if (squareIsValid(meeple.xPos, meeple.yPos + 1)) {
    dir.down = { x: meeple.xPos, y: meeple.yPos + 1 };
  }
  if (squareIsValid(meeple.xPos - 1, meeple.yPos)) {
    dir.left = { x: meeple.xPos - 1, y: meeple.yPos };
  }
  if (squareIsValid(meeple.xPos + 1, meeple.yPos)) {
    dir.right = { x: meeple.xPos + 1, y: meeple.yPos };
  }
  return dir;
}

function validSquaresWhiteAbility(meeple) {
  const dir = {};

  if (squareIsValid(meeple.xPos + 1, meeple.yPos - 1)) {
    dir.up = { x: meeple.xPos + 1, y: meeple.yPos - 1 };
  }
  if (squareIsValid(meeple.xPos + 1, meeple.yPos + 1)) {
    dir.down = { x: meeple.xPos + 1, y: meeple.yPos + 1 };
  }
  if (squareIsValid(meeple.xPos - 1, meeple.yPos + 1)) {
    dir.left = { x: meeple.xPos - 1, y: meeple.yPos + 1 };
  }
  if (squareIsValid(meeple.xPos - 1, meeple.yPos - 1)) {
    dir.right = { x: meeple.xPos - 1, y: meeple.yPos - 1 };
  }
  return dir;
}

function validSquaresBlueAbility(meeple) {
  const dir = {};

  if (squareIsValid(game.warps[0].x, game.warps[0].y)) {
    dir.up = { x: game.warps[0].x, y: game.warps[0].y };
  }
  if (squareIsValid(game.warps[1].x, game.warps[1].y)) {
    dir.down = { x: game.warps[1].x, y: game.warps[1].y };
  }
  if (squareIsValid(game.warps[2].x, game.warps[2])) {
    dir.left = { x: game.warps[2].x, y: game.warps[2].y };
  }
  if (squareIsValid(game.warps[3].x, game.warps[3].y)) {
    dir.right = { x: game.warps[3].x, y: game.warps[3].y };
  }
  return dir;
}

function validSquaresGreyAbility(meeple) {
  console.log("shouldnt be in here");
}

function validSquaresBrownAbility(meeple) {
  console.log(meeple.name);
}

function validSquaresYellowAbility(meeple) {
  console.log(meeple.name);
}

function validSquaresBlackAbility(meeple) {
  console.log(meeple.name);
}

function attemptToReachTarget() {
  recordBoardState();
  while (!targetHit) {}
}

function recordBoardState() {
  currentBoardState.moveCounter = moveCounter;
  currentBoardState.targetX = game.targetX;
  currentBoardState.targetY = game.targetY;
  currentBoardState.meepleGreenX = game.meeples.meepleGreen.xPos;
  currentBoardState.meepleGreenY = game.meeples.meepleGreen.yPos;
  currentBoardState.meepleGreyY = game.meeples.meepleGrey.yPos;
  currentBoardState.meepleGreyX = game.meeples.meepleGrey.xPos;
  currentBoardState.meepleBlueX = game.meeples.meepleBlue.xPos;
  currentBoardState.meepleBlueY = game.meeples.meepleBlue.yPos;
  currentBoardState.meepleBrownX = game.meeples.meepleBrown.xPos;
  currentBoardState.meepleBrownY = game.meeples.meepleBrown.yPos;
  currentBoardState.meepleRedX = game.meeples.meepleRed.xPos;
  currentBoardState.meepleRedY = game.meeples.meepleRed.yPos;
  currentBoardState.meepleWhiteX = game.meeples.meepleWhite.xPos;
  currentBoardState.meepleWhiteY = game.meeples.meepleWhite.yPos;
  currentBoardState.meepleYellowX = game.meeples.meepleYellow.xPos;
  currentBoardState.meepleYellowY = game.meeples.meepleYellow.yPos;
  currentBoardState.meepleBlackX = game.meeples.meepleBlack.xPos;
  currentBoardState.meepleBlackY = game.meeples.meepleBlack.yPos;
}

//changes visual moveCounter
function updateCounterVisual() {
  const moveCounterHtml = document.getElementById("counter");
  moveCounterHtml.innerText = attempt.moveCounter;
}