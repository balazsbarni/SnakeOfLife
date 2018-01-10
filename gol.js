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
        if (a > -1 && b > -1 && a < ROWNUM && b < ROWNUM) {
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
    this.length = 3
    this.positions = []
    for (let i=0; i < this.length; i++) {
      this.positions.push({x: x, y: y - i})
    }
    this.fillColor = fillColor;
    this.actionKeys = 'wasd'
    this.direction = 'w'
    this.move()
  }

  move() {
    this.positions.unshift(Object.assign({}, this.positions[0]))
    let tail = this.positions[this.length]
    // console.log(this.positions)
    let head = this.positions[0]
    gameMap[tail.x][tail.y].clearCell()
    console.log(this.positions.splice(this.length, 1))
    switch(this.direction) {
      case this.actionKeys[0]:
        head.y -= 1;
        break;
      case this.actionKeys[1]:
        head.x -= 1;
        break;
      case this.actionKeys[2]:
        head.y +=1;
        break;
      case this.actionKeys[3]:
        head.x += 1;
        break;
      default:
        console.log('move error');
    }
    this.validatePos()
    gameMap[head.x][head.y].occupyCell(2, this.fillColor)
  }

  validatePos() {
    if (this.x < 0) {
      this.x = ROWNUM - 1
    } else if (this.y < 0) {
      this.y = ROWNUM - 1
    } else if (this.x === ROWNUM - 1) {
      this.x = 0
    } else if (this.y === ROWNUM - 1) {
      this.y = 0
    }
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
    snek1.direction = e.key
  })
  gameMap[5][8].occupyCell(1, 'blue')
  gameMap[6][8].occupyCell(1, 'blue')
  gameMap[7][8].occupyCell(1, 'blue')
  gameMap[7][7].occupyCell(1, 'blue')
  gameMap[6][6].occupyCell(1, 'blue')

  gameMap[15][8].occupyCell(1, 'blue')
  gameMap[16][8].occupyCell(1, 'blue')
  gameMap[17][8].occupyCell(1, 'blue')
  setInterval(function() {
    snek1.move()
    redrawMap(gameMap)
  }, 500)
}

function redrawMap (map) {
  countNeighbours(map)
  context.clearRect(0, 0, canvas.width, canvas.height);
  gameMap.forEach(function(row, x) {
    row.forEach(function(col, y) {
      if (map[x][y].occupied === 2) {
        if (map[x][y].neighbourCount === 2) {
          console.log('game over bitch')
        }
        map[x][y].fillCell()
      }
      else if (map[x][y].neighbourCount < 2) {
        map[x][y].clearCell()
      } else if (map[x][y].neighbourCount > 3) {
        map[x][y].clearCell()
      } else if (map[x][y].occupied === 0 && map[x][y].neighbourCount === 3) {
        map[x][y].occupyCell(1, 'blue' );
      } else if (map[x][y].occupied !== 0){
        map[x][y].fillCell();
      }
    })
  })
}

function countNeighbours(map) {
  gameMap.forEach(function(row, x) {
    row.forEach(function(col, y) {
      if (map[x][y].occupied === 0) {
        map[x][y].neighbourCount = map[x][y].getCount(map)
      } else if (map[x][y].occupied !== 0) {
        map[x][y].neighbourCount = map[x][y].getCount(map) - 1
      }
    })
  })
}

setup();
