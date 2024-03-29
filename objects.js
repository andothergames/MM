class Meeple {
    constructor(name, color, xPos, yPos, isActive, abilityActive, abilityUsed, reachedTarget) {
        this.name = name
        this.color = color
        this.xPos = xPos
        this.yPos = yPos
        this.isActive = isActive
        this.abilityActive = abilityActive
        this.abilityUsed = abilityUsed
        this.reachedTarget = reachedTarget
    }
}

let meepleGreen = new Meeple('forrestjump', 'aquamarine', 8, 8, false, false, false, false);
let meepleGrey = new Meeple('ozzymosis', 'lightslategrey', 6, 6, false, false, false, false);
let meepleBlue = new Meeple('bluebeamer', 'dodgerBlue', 9, 9, false, false, false, false);
let meepleBrown = new Meeple('shortstop', 'tan', 11, 11, false, false, false, false);
let meepleRed = new Meeple('sidestep', 'hotpink', 15, 15, false, false, false, false);
let meepleWhite = new Meeple('skewt', 'ghostwhite', 13, 13, false, false, false, false);
let meepleYellow = new Meeple('mcedge', 'yellow', 4, 4, false, false, false, false);
let meepleBlack = new Meeple('carbon', 'darkslategrey', 2, 2, false, false, false, false);

const game = {
    blockSize: 25,
    blockSizeOffset: 1,
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
    warpColour: "cornflowerblue",
    warps: [
      { x: 3, y: 3 },
      { x: 7, y: 7 },
      { x: 10, y: 10 },
      { x: 14, y: 14 },
    ],
    wallColour: "MidnightBlue",
    wallWidth: 4,
    winningMeeples: [],
  };

  const attempt = {
    moveCounter: 0,
    usedMeeples: []
  }