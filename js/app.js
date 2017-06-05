// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.newSpeed();
    this.newRow();
    this.initCol();
};

Enemy.prototype.newSpeed = function() {
  this.speed = Math.round((Math.random()*5+2)*100);
  // console.log('speed: '+this.speed);
}
Enemy.prototype.newRow= function() {
  this.row = Math.floor(Math.random()*3)+1;
  this.y = this.row*83-21;
  // console.log('row: ' + this.y);
}
Enemy.prototype.initCol = function() {
  this.x = -101;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // console.log(ctx.width);
    if(this.x < 505) {
      this.x += this.speed * dt;
    } else {
      this.newSpeed();
      this.newRow();
      this.initCol();
    }
    // console.log(this.x);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
  this.sprite = 'images/char-pink-girl.png';
  // this.sprite = 'images/char-boy.png';
  this.reset();
}

Player.prototype.reset = function() {
  this.row = 4;
  this.col = 2;
  this.x = 505/5*this.col;
  this.y = 83*this.row-7;

}
Player.prototype.update = function(dt) {

}

Player.prototype.render= function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(direction) {
  switch (direction) {
    case 'left':
      if(this.col>0){
        this.col -= 1;
        this.x -= 101;
      }
      break;
    case 'right':
      if(this.col<4) {
        this.col += 1;
        this.x += 101;
      }
      break;
    case 'up':
      if(this.row>0){
        this.row -= 1;
        this.y -= 83;
      }
      break;
    case 'down':
      if(this.row<5){
        this.row += 1;
        this.y += 83;
      }
      break;
    default:
      // console.log('unknow direction unput');
  }
}
var Score = function() {
  this.oldValue = -1;
  this.value = 0;
  this.x = 10;
  this.y = 38;
};
Score.prototype.update = function(v) {
  this.oldValue = this.value;
  this.value += v;
}
Score.prototype.render = function() {
  if(this.value !== this.oldValue) {

    this.oldValue = this.value;
    ctx.font = '36px Impact';
    ctx.fillStyle = '#000';

    ctx.clearRect(0, 0, 505, 39);
    ctx.fillText('score: ' + this.value, this.x, this.y);
  }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());
// allEnemies.push(new Enemy());
// Place the player object in a variable called player
var player = new Player();
var scoreBoard = new Score();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
