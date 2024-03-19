class Meeple {
    constructor(name, color, xPos, yPos, isActive, abilityUsed) {
        this.name = name
        this.color = color
        this.xPos = xPos
        this.yPos = yPos
        this.isActive = isActive
        this.abilityUsed = abilityUsed
    }
}

let meepleGreen = new Meeple('forrestjump', 'aquamarine', 9, 9, false, false);
let meepleGrey = new Meeple('ozzymosis', 'lightslategrey', 7, 7, false, false);
let meepleBlue = new Meeple('bluebeamer', 'dodgerBlue', 10, 10, false, false);
let meepleBrown = new Meeple('shortstop', 'tan', 12, 12, false, false);
let meepleRed = new Meeple('sidestep', 'hotpink', 16, 16, false, false);
let meepleWhite = new Meeple('skewt', 'ghostwhite', 14, 14, false, false);
let meepleYellow = new Meeple('mcedge', 'yellow', 5, 5, false, false);
let meepleBlack = new Meeple('carbon', 'darkslategrey', 3, 3, false, false);

