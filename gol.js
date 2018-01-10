'use strict';

var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");
context.strokeStyle = "grey";
const TILESIZE = 15;
const ROWNUM = canvas.width / TILESIZE
const gameMap = [];
let snek1 = null


//     ***************   TILE class START  ***************

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

//     ***************   SNEK class START  ***************

  class Snek {
    constructor(x, y, fillColor) {
      this.x = x;
      this.y = y;
      this.fillColor = fillColor;
      this.actionKeys = 'wasd'
      this.occupyTile(this.x, this.y)
    }

    move(key) {
      this.clearTile();
      switch(key) {
        case this.actionKeys[0]:
          this.y -= 1;
          break;
        case this.actionKeys[1]:
          this.x -= 1;
          break;
        case this.actionKeys[2]:
          this.y +=1;
          break;
        case this.actionKeys[3]:
          this.x += 1;
          break;
        default:
          console.log('move error');
      }
      this.occupyTile(this.x, this.y);
    }

    occupyTile(x, y) {
      gameMap[this.x][this.y].fillColor = this.fillColor
      fillCell(this.x, this.y)
    }

    clearTile() {
      gameMap[this.x][this.y].fillColor = 'white'
      fillCell(this.x, this.y)
    }

  }

//     ***************   SNEK class START  ***************

function drawMap(gameMap) {
  for (let x = 0; x < ROWNUM; x++) {
    gameMap.push([])
    for (let y = 0; y < ROWNUM; y++) {
      context.strokeRect(x * TILESIZE, y * TILESIZE, TILESIZE, TILESIZE);
      gameMap[x][y] = new Tile(x, y, 'blue', 0)
    }
  }
}

function setup () {
  drawMap(gameMap);
  snek1 = new Snek(15, 15, 'green')
  document.addEventListener('keypress', function(e) {
    snek1.move(e.key)
  })

}


function fillCell(x, y) {
  context.fillStyle = gameMap[x][y].fillColor;
  context.fillRect(gameMap[x][y].getCords().x, gameMap[x][y].getCords().y, TILESIZE, TILESIZE);
  gameMap[x][y].occupied = 1;
}

function getCount(x, y) {
  let count = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let a = x + i;
      let b = y + j;
      console.log(gameMap[a][b])
      fillCell(a, b);
    }
  }
}

setup();
// fillCell(0,0)
// console.log(gameMap[0][0]);
console.log(getCount(gameMap[5][5].x, gameMap[5][5].y));
