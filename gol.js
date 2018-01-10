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
  constructor(x, y, fillColor, occupied) {
    this.x = x;
    this.y = y;
    this.fillColor = fillColor;
    this.occupied = occupied;
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
      gameMap[x][y] = new Tile(x, y, 'black', 0)
    }
  }
}

function drawMap(gameMap) {
  context.clearRect(0, 0, canvas.width, canvas.width);
}

// context.fillStyle = gameMap[0][1].fillColor;
function fillCell(x, y) {
  context.fillRect(gameMap[x][y].getCords().x, gameMap[x][y].getCords().y, TILESIZE, TILESIZE);
  gameMap[x][y].occupied = 1;
}

function getCount(x, y) {
  let count = 0;
  for (i = -1; i < 2; i++) {
    for (j = -1; j < 2; j++) {
      let a = x + i;
      let b = y + j;
      console.log(gameMap[a][b])
      fillCell(a, b);
    }
  }
}

setup();
fillCell(0,0)
console.log(gameMap[0][0]);
console.log(getCount(gameMap[5][5].x, gameMap[5][5].y));