const game = {
  blockSize: 25,
  boardSize: 18,
  targetX: 0,
  targetY: 0,
  gameOver: false,
  meeples: [
    meepleGreen,
    meepleGrey,
    meepleBlue,
    meepleBrown,
    meepleRed,
    meepleWhite,
    meepleYellow,
    meepleBlack,
  ],
  warps: [
    { x: 3, y: 3 },
    { x: 7, y: 7 },
    { x: 10, y: 10 },
    { x: 14, y: 14 },
  ],
  winningMeeples: [],
  buttons: [],
};

let board;
let context;

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
  tinkering();
  board.height = game.boardSize * game.blockSize;
  board.width = game.boardSize * game.blockSize;
  context = board.getContext("2d");
  calculateTargetPosition();
  document.addEventListener("keyup", move);
  update();
}

function update() {
  //gameover
  if (targetHit()) {
    const reachedMeeple = findActive();
    reachedMeeple.abilityUsed = true;
    game.winningMeeples.push(reachedMeeple.name);
    reachedTargetStyle(reachedMeeple);
    win();
    calculateTargetPosition();
  }

  //board
  drawBoard();

  //draw game.meeples
  for (let i = 0; i < game.meeples.length; i++) {
    context.fillStyle = game.meeples[i].color;
    context.fillRect(
      game.meeples[i].xPos * game.blockSize,
      game.meeples[i].yPos * game.blockSize,
      game.blockSize,
      game.blockSize
    );
  }
}

function buttonSetUp() {
  for (let i = 0; i < game.meeples.length; i++) {
    const selectionButton = document.getElementById(game.meeples[i].name);
    const abilityButton = document.getElementById(`${game.meeples[i].name}ab`);

    selectionButton.addEventListener("click", function () {
      activateMeeple(game.meeples[i]);
    });

    abilityButton.addEventListener("click", function () {
      activateMeeple(game.meeples[i]);
      meepleAbility();
    });
  }
}

//movement
function move(e) {
  let m = findActive();

  let boundaries = calculateLimits();
  switch (e.code) {
    case "ArrowUp":
      m.yPos = boundaries.upper;
      break;
    case "ArrowDown":
      m.yPos = boundaries.lower;
      break;
    case "ArrowLeft":
      m.xPos = boundaries.left;
      break;
    case "ArrowRight":
      m.xPos = boundaries.right;
      break;
  }
  update();
}

function calculateLimits() {
  let m = findActive();
  let r = m.yPos;
  let c = m.xPos;
  let limits = {
    upper: 0,
    lower: game.boardSize - 1,
    left: 0,
    right: game.boardSize - 1,
  };
  if (m.xPos == 0) limits.upper = 1;
  if (m.xPos == game.boardSize - 1) limits.lower = game.boardSize - 2;
  if (m.yPos == 0) limits.left = 1;
  if (m.yPos == game.boardSize - 1) limits.right = game.boardSize - 2;

  for (let i = 0; i < boardStructure.length; i++) {
    let wall = boardStructure[i];
    //columns
    if (!wall.row && wall.existson == m.xPos) {
      if (wall.after >= limits.upper && wall.after < m.yPos) {
        limits.upper = wall.after + 1;
      }
      if (wall.after < limits.lower && wall.after >= m.yPos) {
        limits.lower = wall.after;
      }
    }

    //rows
    if (wall.row && wall.existson == m.yPos) {
      if (wall.after >= limits.left && wall.after < m.xPos) {
        limits.left = wall.after + 1;
      }
      if (wall.after < limits.right && wall.after >= m.xPos) {
        limits.right = wall.after;
      }
    }
  }

  for (let i = 0; i < game.meeples.length; i++) {
    if (!game.meeples[i].isActive) {
      //columns
      if (game.meeples[i].xPos === c) {
        if (game.meeples[i].yPos >= limits.upper && game.meeples[i].yPos < r) {
          limits.upper = game.meeples[i].yPos + 1;
        }
        if (game.meeples[i].yPos <= limits.lower && game.meeples[i].yPos > r) {
          limits.lower = game.meeples[i].yPos - 1;
        }
      }
      //rows
      if (game.meeples[i].yPos === r) {
        if (game.meeples[i].xPos >= limits.left && game.meeples[i].xPos < c) {
          limits.left = game.meeples[i].xPos + 1;
        }
        if (game.meeples[i].xPos <= limits.right && game.meeples[i].xPos > c) {
          limits.right = game.meeples[i].xPos - 1;
        }
      }
    }
  }
  return limits;
}

//randomise target
function calculateTargetPosition() {
  game.targetX = Math.floor(Math.random() * game.boardSize);
  game.targetY = Math.floor(Math.random() * game.boardSize);
  if(!squareIsEmpty(game.targetX, game.targetY)){
      calculateTargetPosition();
    }
  }

//findActiveMeeple
function findActive() {
  for (let i = 0; i < game.meeples.length; i++) {
    if (game.meeples[i].isActive) {
      return game.meeples[i];
    }
  }
}

//activateMeeples
function activateMeeple(m) {
  for (let i = 0; i < game.meeples.length; i++) {
    game.meeples[i].isActive = m === game.meeples[i];
    game.meeples[i].isActive
      ? document.getElementById(game.meeples[i].name).classList.add("active")
      : document
          .getElementById(game.meeples[i].name)
          .classList.remove("active");
          console.log(m.name);
  }
}

function targetHit() {
  let active = findActive();
  if (active === undefined) return false;
  if (active.reachedTarget) return false;
  let x = active.xPos;
  let y = active.yPos;
  return x === game.targetX && y === game.targetY;
}

//target reached style
function reachedTargetStyle(m) {
  const meeplehtml = document.getElementById(`${m.name}t`);
  meeplehtml.style.opacity = 1;
}

//meepleAbility
function meepleAbility() {
  const m = findActive();
  
  if (m.name === "forrestjump") {
    const dir = validSquaresGreenAbility(m)
    console.log(dir);
    highlightAbilitySquares(dir);
  };
  if (m.name === "ozzymosis") {
    const dir = validSquaresGreyAbility(m)
    highlightAbilitySquares(dir);
  };
  if (m.name === "bluebeamer") {
    const dir = validSquaresBlueAbility(m)
    highlightAbilitySquares(dir);
  };
  if (m.name === "shortstop") {
    const dir = validSquaresRedAbility(m)
    highlightAbilitySquares(dir);
  };
  if (m.name === "sidestep") {
    const dir = validSquaresBrownAbility(m)
    highlightAbilitySquares(dir);
  };
  if (m.name === "skewt") {
    const dir = validSquaresWhiteAbility(m)
    highlightAbilitySquares(dir);
  };
  if (m.name === "mcedge") {
    const dir = validSquaresYellowAbility(m)
    highlightAbilitySquares(dir);
  };
  if (m.name === "carbon") {
    const dir = validSquaresBlackAbility(m)
    highlightAbilitySquares(dir);
  };
  
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
  };
}

//winningDisplay
function win() {
  console.log(game.winningMeeples);
  if (game.winningMeeples.length === 6) {
    game.gameOver = true;
    alert("you have won!");
  }
  return;
}

function tinkering() {
  board.addEventListener("click", function (e) {
    let x = Math.floor(e.offsetX / game.blockSize);
    let y = Math.floor(e.offsetY / game.blockSize);
    if (x === game.targetX && y === game.targetY) {
      let successSound = new Audio("success.mp3");
      successSound.play();
    }
    for (let i = 0; i < game.meeples.length; i++) {
      if (game.meeples[i].xPos === x && game.meeples[i].yPos === y) {
        activateMeeple(game.meeples[i]);
        break;
      }
    }
    console.log(x + " - " + y);
  });
}

//function for checking square is legal
function squareIsValid(x, y) {
  return squareIsEmpty(x, y); 
  //&& squareIsInBounds(x, y);
}

//function for iterating over meeples coords to see if square empty
function squareIsEmpty(x, y) {
  for (let i = 0; i < game.meeples.length; i++) {
    if (game.meeples[i].xPos === x && game.meeples[i].yPos === y) {
      return false;
    }
  }
  return true;
}

//function for checking if in wall bounds
function squareIsInBounds(x, y) {}

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
  console.log('shouldnt be in here')
}

function validSquaresBrownAbility(meeple) {
  console.log(meeple.name)
}

function validSquaresYellowAbility(meeple) {
  console.log(meeple.name)
}

function validSquaresBlackAbility(meeple) {
  console.log(meeple.name)
}
