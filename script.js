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
  document.addEventListener("click", useAbility);
  recordBoardState();
  updateVisuals();
}

function assessGameState() {
  if (targetHit()) {
    incrementScore();
    game.gameOver = checkForGameWon();
    if (game.gameOver) {
      alert("you have won!");
    }
  }
  updateVisuals();
}

function incrementScore() {
  const activeMeeple = getActiveMeeple();
  if (!activeMeeple.reachedTarget) {
    activeMeeple.reachedTarget = true;
    game.winningMeeples.push(activeMeeple.name);
    applyReachedTargetStyle(activeMeeple);
    calculateTargetPosition();
    recordBoardState();
  }
}

function updateVisuals() {
  drawBoard();
  drawMeeples();
  if (anAbilityIsActive()) {
    highlightAbilitySquares();
  }
}

function getValidAbilitySquares() {
  let dir = {};
  const activeMeeple = getActiveMeeple();
  let ability = "";
  for (let i = 0; i < game.meeples.length; i++) {
    if (game.meeples[i].abilityActive) {
      ability = game.meeples[i].name;
      break;
    }
  }
  switch (ability) {
    case "forrestjump":
      dir = validSquaresGreenAbility(activeMeeple);
      break;
    case "ozzymosis":
      dir = validSquaresGreyAbility(activeMeeple);
      break;
    case "bluebeamer":
      dir = validSquaresBlueAbility(activeMeeple);
      break;
    case "shortstop":
      dir = validSquaresBrownAbility(activeMeeple);
      break;
    case "sidestep":
      dir = validSquaresRedAbility(activeMeeple);
      break;
    case "skewt":
      dir = validSquaresWhiteAbility(activeMeeple);
      break;
    case "mcedge":
      dir = validSquaresYellowAbility(activeMeeple);
      break;
  }
  return dir;
}

//ability used style
function abilityUsedStyle(m) {
  const meeplehtml = document.getElementById(`${m.name}ab`);
  meeplehtml.innerText = "★";
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
  const dir = {};
  const limits = calculateLimits();

  if (limits.upper < meeple.yPos - 1) {
    dir.up = { x: meeple.xPos, y: limits.upper + 1 };
  } else {
    dir.up = { x: meeple.xPos, y: limits.upper };
  }

  if (limits.lower > meeple.yPos + 1) {
    dir.down = { x: meeple.xPos, y: limits.lower - 1 };
  } else {
    dir.down = { x: meeple.xPos, y: limits.lower };
  }

  if (limits.left < meeple.xPos - 1) {
    dir.left = { x: limits.left + 1, y: meeple.yPos };
  } else {
    dir.left = { x: limits.left, y: meeple.yPos };
  }

  if (limits.right > meeple.xPos + 1) {
    dir.right = { x: limits.right - 1, y: meeple.yPos };
  } else {
    dir.right = { x: limits.right, y: meeple.yPos };
  }

  if (limits.upper === dir.up.y) delete dir.up;
  if (limits.lower === dir.down.y) delete dir.down;
  if (limits.left === dir.left.x) delete dir.left;
  if (limits.right === dir.right.x) delete dir.right;

  for (let move in dir) {
    if (dir[move].x === meeple.xPos && dir[move].y === meeple.yPos) {
      delete dir[move];
    }
  }

  return dir;
}

function validSquaresYellowAbility(meeple) {
  const dir = {};
  const limits = calculateLimits();
  const m = getActiveMeeple();

  if (limits.upper === 0 || (limits.upper === 1 && m.xPos === 0)) {
    dir.up = { x: m.xPos, y: findBiggest(m.xPos, false) + 1 };
  }

  if (limits.lower === 17 || (limits.lower === 16 && m.xPos === 17)) {
    dir.down = { x: m.xPos, y: findSmallest(m.xPos, false) };
  }

  if (limits.left === 0 || (limits.left === 1 && m.yPos === 0)) {
    dir.left = { x: findBiggest(m.yPos, true), y: m.yPos };
  }

  if (limits.right === 17 || (limits.right === 16 && m.yPos === 17)) {
    dir.right = { x: findSmallest(m.yPos, true), y: m.yPos };
  }
  console.log(dir)
  return dir;
}

function findBiggest(n, row) {
  let biggest = 0;
  if (row) {
    for (let i = 0; i < boardStructure.length; i++) {
      let wall = boardStructure[i];
      if (wall.existson === n) {
        if (wall.after > biggest) biggest = wall.after;
      }
    }
    for (let i = 0; i < game.meeples.length; i++) {
      if (game.meeples.yPos === n) {
        if (game.meeples.yPos > biggest) biggest = game.meeples.yPos;
      }
    }
  } else {
    for (let i = 0; i < boardStructure.length; i++) {
      let wall = boardStructure[i];
      if (wall.existson === n) {
        if (wall.after > biggest) {
          biggest = wall.after;
        }
      }
    }
    for (let i = 0; i < game.meeples.length; i++) {
      if (game.meeples[i].xPos === n) {
        if (game.meeples.yPos > biggest) {
          biggest = game.meeples.yPos;
        }
      }
    }
  }
  return biggest;
}

function findSmallest(n, row) {
  //wip
  let smallest = 17;
  if (row) {
    for (let i = 0; i < boardStructure.length; i++) {
      let wall = boardStructure[i];
      if (wall.existson === n) {
        if (wall.after < smallest) smallest = wall.after;
      }
    }
    for (let i = 0; i < game.meeples.length; i++) {
      if (game.meeples.yPos === n) {
        if (game.meeples.yPos < smallest) smallest = game.meeples.yPos;
      }
    }
  } else {
    for (let i = 0; i < boardStructure.length; i++) {
      let wall = boardStructure[i];
      if (wall.existson === n) {
        if (wall.after < smallest) {
          smallest = wall.after;
        }
      }
    }
    for (let i = 0; i < game.meeples.length; i++) {
      if (game.meeples[i].xPos === n) {
        if (game.meeples.yPos < smallest) {
          smallest = game.meeples.yPos;
        }
      }
    }
  }
  return smallest;

}

function meepleBetweenEdgeAndWallCol(col, cell) {
  for (let i = game.meeples.length; i > 0; i--) {
    if (game.meeple[i].xPos === col && game.meeple[i].yPos >= cell) {
      return game.meeple[i].yPos;
    }
  }
}

function validSquaresBlackAbility(meeple) {
  console.log(meeple.name);
}

function attemptToReachTarget() {
  recordBoardState();
  while (!targetHit) {}
}

function recordBoardState() {
  currentBoardState.moveCounter = attempt.moveCounter;
  currentBoardState.targetX = game.targetX;
  currentBoardState.targetY = game.targetY;
  currentBoardState.meepleGreenX = meepleGreen.xPos;
  currentBoardState.meepleGreenY = meepleGreen.yPos;
  currentBoardState.meepleGreyY = meepleGrey.yPos;
  currentBoardState.meepleGreyX = meepleGrey.xPos;
  currentBoardState.meepleBlueX = meepleBlue.xPos;
  currentBoardState.meepleBlueY = meepleBlue.yPos;
  currentBoardState.meepleBrownX = meepleBrown.xPos;
  currentBoardState.meepleBrownY = meepleBrown.yPos;
  currentBoardState.meepleRedX = meepleRed.xPos;
  currentBoardState.meepleRedY = meepleRed.yPos;
  currentBoardState.meepleWhiteX = meepleWhite.xPos;
  currentBoardState.meepleWhiteY = meepleWhite.yPos;
  currentBoardState.meepleYellowX = meepleYellow.xPos;
  currentBoardState.meepleYellowY = meepleYellow.yPos;
  currentBoardState.meepleBlackX = meepleBlack.xPos;
  currentBoardState.meepleBlackY = meepleBlack.yPos;
}

//changes visual moveCounter
function updateCounterVisual() {
  const moveCounterHtml = document.getElementById("counter");
  moveCounterHtml.innerText = attempt.moveCounter;
}

function resetBoardState() {
  deactivateMeepleAbilities();
  game.targetX = currentBoardState.targetX;
  game.targetY = currentBoardState.targetY;
  attempt.moveCounter = currentBoardState.moveCounter;
  meepleGreen.xPos = currentBoardState.meepleGreenX;
  meepleGreen.yPos = currentBoardState.meepleGreenY;
  meepleGrey.xPos = currentBoardState.meepleGreyY;
  meepleGrey.yPos = currentBoardState.meepleGreyX;
  meepleBlue.xPos = currentBoardState.meepleBlueX;
  meepleBlue.yPos = currentBoardState.meepleBlueY;
  meepleBrown.xPos = currentBoardState.meepleBrownX;
  meepleBrown.yPos = currentBoardState.meepleBrownY;
  meepleRed.xPos = currentBoardState.meepleRedX;
  meepleRed.yPos = currentBoardState.meepleRedY;
  meepleWhite.xPos = currentBoardState.meepleWhiteX;
  meepleWhite.yPos = currentBoardState.meepleWhiteY;
  meepleYellow.xPos = currentBoardState.meepleYellowX;
  meepleYellow.yPos = currentBoardState.meepleYellowY;
  meepleBlack.xPos = currentBoardState.meepleBlackX;
  meepleBlack.yPos = currentBoardState.meepleBlackY;
  //empty used meeples array for this attempt
  updateVisuals();
}

function highlightAbilitySquares() {
  const dir = getValidAbilitySquares();
  // const dir = {
  //   up: { x: 8, y: 5 },
  //   down: { x: 8, y: 11 },
  //   left: { x: 5, y: 8 },
  //   right: { x: 11, y: 8 }
  // };
  context.fillStyle = "lightPink";

  for (let key in dir) {
    context.fillRect(
      dir[key].x * game.blockSize + game.blockSizeOffset,
      dir[key].y * game.blockSize + game.blockSizeOffset,
      game.blockSize - game.blockSizeOffset * 2,
      game.blockSize - game.blockSizeOffset * 2
    );
  }
}

function useAbility(e) {
  const dir = getValidAbilitySquares();
  if (Object.keys(dir).length === 0) return;

  const m = getActiveMeeple();

  const cursorX = Math.floor(e.offsetX / game.blockSize);
  const cursorY = Math.floor(e.offsetY / game.blockSize);

  for (let key in dir) {
    if (dir[key].x === cursorX && dir[key].y === cursorY) {
      console.log("in range");
      m.xPos = cursorX;
      m.yPos = cursorY;
      m.abilityUsed = true;
      attempt.moveCounter++;
      deactivateMeepleAbilities();
      updateVisuals();
      break;
    }
  }
}
