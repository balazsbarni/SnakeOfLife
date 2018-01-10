var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");
context.strokeStyle = "grey";
TILESIZE = 15;
ROWNUM = canvas.width / TILESIZE
gameMap = [];

// for (x = 0; x < 600; x+= TILESIZE) {
//   gameMap.push([]);
//   for (y = 0; y < 600; y+= TILESIZE) {
//     context.strokeRect(x, y, TILESIZE, TILESIZE);

//   }
// }

class Tile {
  constructor(x, y, fillColor) {
    this.x = x;
    this.y = y;
    this.fillColor = fillColor
  }

  getCords() {
    return {
      x: this.x * TILESIZE,
      y: this.y * TILESIZE
    }
  }
}

function setup () {
  for (x = 0; x < ROWNUM; x++) {
    gameMap.push([])
    for (y = 0; y < ROWNUM; y++) {
      context.strokeRect(x * TILESIZE, y * TILESIZE, TILESIZE, TILESIZE);
      gameMap[x][y] = new Tile(x, y, 'black')
    }
  }
}

setup();
context.fillStyle = gameMap[0][1].fillColor;
context.fillRect(gameMap[0][1].getCords().x, gameMap[0][1].getCords().y, TILESIZE, TILESIZE)
