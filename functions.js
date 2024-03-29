//add event listeners to selection and ability buttons
function buttonSetUp() {
    for (let i = 0; i < game.meeples.length; i++) {
      const selectionButton = document.getElementById(game.meeples[i].name);
      const abilityButton = document.getElementById(`${game.meeples[i].name}ab`);
  
      selectionButton.addEventListener("click", function () {
        activateMeeple(game.meeples[i]);
      });
  
      abilityButton.addEventListener("click", function () {
        activateMeepleAbility(game.meeples[i]);
      });
    }
    const resetButton = document.getElementById("resetButton");
    resetButton.addEventListener("click", resetBoardState);
  }

//activate meeple passed as argument, deactivate others, adjust html classes for visuals
function activateMeeple(m) {
  for (let i = 0; i < game.meeples.length; i++) {
    game.meeples[i].isActive = m === game.meeples[i];
    game.meeples[i].isActive
      ? document.getElementById(game.meeples[i].name).classList.add("active")
      : document
          .getElementById(game.meeples[i].name)
          .classList.remove("active");
  }
}

//activate meeple's ability passed as argument, deactivate others, call activate meeple
function activateMeepleAbility(m) {
  activateMeeple(m);
  for (let i = 0; i < game.meeples.length; i++) {
    game.meeples[i].abilityActive = m === game.meeples[i];
  }
}

//returns active meeple
function getActiveMeeple() {
    for (let i = 0; i < game.meeples.length; i++) {
      if (game.meeples[i].isActive) {
        return game.meeples[i];
      }
    }
  }

  //returns false if no active meeple or meeple had already hit target, otherwise checks if target was hit by active meeple
function targetHit() {
    let m = getActiveMeeple();
    if (m === undefined) return false;
    if (m.reachedTarget) return false;
    return (m.xPos === game.targetX) && (m.yPos === game.targetY);
  }

//changes opacity of target image when meeple reaches target
function applyReachedTargetStyle(m) {
  const meeplehtml = document.getElementById(`${m.name}t`);
  meeplehtml.style.opacity = 1;
}

//checks for winningMeeples array length being six
function checkForGameWon() {
  console.log(game.winningMeeples);
  return game.winningMeeples.length === 6;
}

//randomly positions target in valid square
function calculateTargetPosition() {
  
  game.targetX = Math.floor(Math.random() * game.boardSize);
  game.targetY = Math.floor(Math.random() * game.boardSize);
  // if (!squareIsValid(game.targetX, game.targetY)) {
  if (!squareIsValid(game.targetX, game.targetY)) {
    calculateTargetPosition();
  }
}

//function for checking square is legal
function squareIsValid(x, y) {
  return squareIsEmpty(x, y) && squareIsInBounds(x, y);
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
function squareIsInBounds(x, y) {
  if (x < 0 || y < 0 || x > game.boardSize - 1 || y > game.boardSize - 1) {
    return false;
  }
  if (x === 0 && y === 0) {
    return false;
  }
  
  if (x === game.boardSize - 1 && y === game.boardSize - 1) {
    return false;
  }
  return true;
}

function calculateLimits() {
  let m = getActiveMeeple();
  let r = m.yPos;
  let c = m.xPos;
  let limits = {
    upper: 0,
    lower: game.boardSize - 1,
    left: 0,
    right: game.boardSize - 1,
  };
  if (c == 0) limits.upper = 1;
  if (c == game.boardSize - 1) limits.lower = game.boardSize - 2;
  if (r == 0) limits.left = 1;
  if (r == game.boardSize - 1) limits.right = game.boardSize - 2;

  for (let i = 0; i < boardStructure.length; i++) {
    let wall = boardStructure[i];
    //columns
    if (!wall.row && wall.existson == c) {
      if (wall.after >= limits.upper && wall.after < r) {
        limits.upper = wall.after + 1;
      }
      if (wall.after < limits.lower && wall.after >= r) {
        limits.lower = wall.after;
      }
    }

    //rows
    if (wall.row && wall.existson == r) {
      if (wall.after >= limits.left && wall.after < c) {
        limits.left = wall.after + 1;
      }
      if (wall.after < limits.right && wall.after >= c) {
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


function move(e) {
  let m = getActiveMeeple();
  if (m === undefined) {
    alert('select a meeple')
  }
  let boundaries = calculateLimits();

  switch (e.code) {
    case "ArrowUp":
      m.yPos = boundaries.upper;
      attempt.moveCounter++;
      break;
    case "ArrowDown":
      m.yPos = boundaries.lower;
      attempt.moveCounter++;
      break;
    case "ArrowLeft":
      m.xPos = boundaries.left;
      attempt.moveCounter++;
      break;
    case "ArrowRight":
      m.xPos = boundaries.right;
      attempt.moveCounter++;
      break;
  }
  assessGameState();
}