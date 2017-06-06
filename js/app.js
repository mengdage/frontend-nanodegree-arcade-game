(function(global){
  'use strict';
  // Enemies our player must avoid
  var Enemy = function() {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.newSpeed();
    this.newRow();
    this.initCol();
  };

  // reset the enemy's speed
  Enemy.prototype.newSpeed = function() {
    this.speed = Math.round((Math.random()*5+2)*100);
    // console.log('speed: '+this.speed);
  };

  // reset the enemy's row position
  Enemy.prototype.newRow= function() {
    this.row = Math.floor(Math.random()*3)+1;
    this.y = this.row*83-21;
    // console.log('row: ' + this.y);
  };

  // initialize the enemy's row position
  Enemy.prototype.initCol = function() {
    this.col = 0;
    this.x = -101;
  };

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  Enemy.prototype.update = function(dt) {
      // You should multiply any movement by the dt parameter
      // which will ensure the game runs at the same speed for
      // all computers.
      if(this.x < 505) {
        // if the enemy is in the screen, increase the enemy's x position value
        this.x += this.speed * dt;
      } else {
        // if the enemy is outside the screen, reset the enemy's speed, row position and x position value
        this.newSpeed();
        this.newRow();
        this.initCol();
      }
  };

  // Draw the enemy on the screen, required method for game
  Enemy.prototype.render = function() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

  // The player class
  var Player = function(){
    this.sprite = 'images/char-pink-girl.png';
    this.reset();
  };

  /* Set the player's initial location
   * put the player at row 4 column 2.
   */
  Player.prototype.reset = function() {
    this.row = 4;
    this.col = 2;
    this.x = 505/5*this.col;
    this.y = 83*this.row-7;
  };

  // Update the player's state if necessary
  Player.prototype.update = function(dt) {
    // if the play wins, increase the score and reset the player
    if(this.checkWin()) {
      console.log('you win!');
      scoreBoard.update(1);
      this.reset();
    }
  };

  // Draw the player on the screen at (x, y)
  Player.prototype.render= function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
  // Check if player has winned by checking if player
  // has reached row 0
  Player.prototype.checkWin = function() {
    if(this.row === 0) {
      return true;
    } else {
      return false;
    }
  };

  // Change the player's position according to the user's input
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
    }
  };

  // The score board class
  var Score = function() {
    this.oldValue = -1;
    this.value = 0;
    // (x, y) is the position where to print the score on the screen
    this.x = 10;
    this.y = 38;
  };

  // Update the score value by adding parameter v to the value
  Score.prototype.update = function(v) {
    this.oldValue = this.value;
    this.value += v;
  };

  // If the score value is changed, update the score on screen
  Score.prototype.render = function() {
    if(this.value !== this.oldValue) {

      this.oldValue = this.value;
      ctx.font = '36px Impact';
      ctx.fillStyle = '#000';

      ctx.clearRect(0, 0, 505, 39);
      ctx.fillText('score: ' + this.value, this.x, this.y);
    }
  };

  // Place all enemy objects in an array called allEnemies
  var allEnemies = [];
  allEnemies.push(new Enemy());
  allEnemies.push(new Enemy());
  allEnemies.push(new Enemy());

  // Place the player object in a variable called player
  var player = new Player();
  // The score board object
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

  global.allEnemies = allEnemies;
  global.player = player;
  global.scoreBoard = scoreBoard;

})(this);
