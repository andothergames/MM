class Meeple {
    constructor(name, color, xPos, yPos, isActive, abilityUsed) {
        this.name = name
        this.color = color
        this.xPos = xPos
        this.yPos = yPos
        this.isActive = isActive
        this.abilityUsed = abilityUsed
        this.reachedTarget = reachedTarget
    }
}

let meepleGreen = new Meeple('forrestjump', 'aquamarine', 8, 8, false, false, false);
//testing
//let meepleGreen = new Meeple('forrestjump', 'aquamarine', 6, 9, false, false, false);
let meepleGrey = new Meeple('ozzymosis', 'lightslategrey', 6, 6, false, false, false);
let meepleBlue = new Meeple('bluebeamer', 'dodgerBlue', 9, 9, false, false, false);
let meepleBrown = new Meeple('shortstop', 'tan', 11, 11, false, false, false);
let meepleRed = new Meeple('sidestep', 'hotpink', 15, 15, false, false, false);
//testing
//let meepleRed = new Meeple('sidestep', 'hotpink', 2, 4, false, false, false);
let meepleWhite = new Meeple('skewt', 'ghostwhite', 13, 13, false, false, false);
let meepleYellow = new Meeple('mcedge', 'yellow', 4, 4, false, false, false);
let meepleBlack = new Meeple('carbon', 'darkslategrey', 2, 2, false, false, false);