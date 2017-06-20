(function(global){
  // Enemies our player must avoid
  var Enemy = function() {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.newSpeed(gameState.level);
    this.newRow();
    this.initCol();
  };

  // reset the enemy's speed
  Enemy.prototype.newSpeed = function(level) {
    level = level || 1;
    var baseLowerSpeed = 100,
        baseUpperSpeed = 300,
        levelDepExtraSpeed = 100;
    var speedLowerBound = baseLowerSpeed + (level-1)*levelDepExtraSpeed;
    var speedUpperBound = baseUpperSpeed + (level-1)*levelDepExtraSpeed;
    this.speed = util.randomInt(speedLowerBound, speedUpperBound);
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
        this.newSpeed(gameState.level);
        this.newRow();
        this.initCol();
      }
  };

  // Draw the enemy on the screen, required method for game
  Enemy.prototype.render = function() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
  // Place all enemy objects in an array called allEnemies
  var allEnemies = [];
  allEnemies.push(new Enemy());
  allEnemies.push(new Enemy());
  allEnemies.push(new Enemy());

  global.allEnemies = allEnemies;
})(self);
