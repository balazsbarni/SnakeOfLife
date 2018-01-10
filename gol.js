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
  constructor(x, y, fillColor) {
    this.x = x;
    this.y = y;
    this.fillColor = fillColor;
    this.occupied = 0;
    this.neighbourCount = 0
  }
  
  getCords() {
    return {
      x: this.x * TILESIZE,
      y: this.y * TILESIZE
    }
  }

  fillCell() {
    context.fillStyle = this.fillColor;
    context.fillRect(this.x * TILESIZE, this.y * TILESIZE, TILESIZE, TILESIZE);
  }

  clearCell() {
    this.occupied = 0
    context.strokeStyle = 'grey';
    context.strokeRect(this.x * TILESIZE, this.y * TILESIZE, TILESIZE, TILESIZE);
  }
  
  occupyCell(what, color) {
    this.occupied = what;
    this.fillColor = color;
    this.fillCell()
  }
  
  getCount(map) {
    let count = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let a = this.x + i;
        let b = this.y + j;
        if (a >= 0 && b >= 0 && a < ROWNUM && b < ROWNUM) {
          if (map[a][b].occupied === 1) {
            count++
          }
        }
      }
    }
    return count;
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
      gameMap[this.x][this.y].fillCell()
    }

    clearTile() {
      gameMap[this.x][this.y].fillColor = 'white'
      gameMap[this.x][this.y].fillCell()

    }

  }

//     ***************   SNEK class START  ***************

function drawMap(gameMap) {
  for (let x = 0; x < ROWNUM; x++) {
    gameMap.push([])
    for (let y = 0; y < ROWNUM; y++) {
      context.strokeRect(x * TILESIZE, y * TILESIZE, TILESIZE, TILESIZE);
      gameMap[x][y] = new Tile(x, y, 'white')
    }
  }
}

function setup () {
  drawMap(gameMap);
  snek1 = new Snek(15, 15, 'green')
  document.addEventListener('keypress', function(e) {
    snek1.move(e.key)
  })
  gameMap[5][8].occupyCell(1, 'blue')
  gameMap[6][8].occupyCell(1, 'blue')
  gameMap[7][8].occupyCell(1, 'blue')
  setInterval(() => redrawMap(gameMap), 500)
  // console.log(gameMap[3][8].getCount(gameMap))

}

function redrawMap (map) {
  countNeighbours(map)
  context.clearRect(0, 0, canvas.width, canvas.height);
  gameMap.forEach(function(row, x) {
    row.forEach(function(col, y) {
      if (map[x][y].neighbourCount < 2) {
        map[x][y].clearCell()
      } else if (map[x][y].neighbourCount > 3) {
        map[x][y].clearCell()
      } else if (map[x][y].neighbourCount === 3) {
        map[x][y].occupyCell(1, 'blue' );
      }
    })
  })
}

function countNeighbours(map) {
  gameMap.forEach(function(row, x) {
    row.forEach(function(col, y) {
      map[x][y].neighbourCount = map[x][y].getCount(map)
      console.log(map[x][y].neighbourCount)
      /* const count = map[x][y].getCount(map);
      if (count < 2) {
        map[x][y].clearCell()
      } else if (count > 3) {
        map[x][y].clearCell()
      } else if (count === 3) {
        map[x][y].occupyCell(1, 'blue');
      }
      console.log(count)
      */
    })
  }) 
}

setup();




