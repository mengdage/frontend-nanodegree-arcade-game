(function(global){
  // The player class
  var Player = function(sprite){
    // in case users forgetting new keyword
    if(!(this instanceof Player)) {
      return new Player();
    }

    this.sprite = sprite;
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
    this.image = Resources.get(this.sprite);
  };

  Player.prototype.changeSprite = function(newSprite) {
    this.sprite = newSprite;
    this.image = Resources.get(this.sprite);
  };

  // Update the player's state if necessary
  Player.prototype.update = function(dt) {
    // if the play wins, increase the score and reset the player
    // if(this.checkWin()) {
    //   console.log('you win!');
    //   manager.updateScore(100);
    //   this.reset();
    // }
  };

  // Draw the player on the screen at (x, y)
  Player.prototype.render= function() {
    ctx.drawImage(this.image, this.x, this.y);
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

  // add keydown listen
  Player.prototype.listenDirectionOps = function() {
    var centerX = ctx.boundingRect.left + ctx.boundingRect.width/2,
        centerY = ctx.boundingRect.top + ctx.boundingRect.height/2;
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    // This listens for key presses and sends the keys to your
    // Player.handleInput() method. You don't need to modify this.
    document.addEventListener('keydown', function(e) {
      if(allowedKeys[e.keyCode]){
        playSound('buttonPressed');
      }
      player.handleInput(allowedKeys[e.keyCode]);
    });
    document.addEventListener('touchstart', function(e){
      var touch = e.changedTouches[0];
      var x = touch.pageX-ctx.boundingRect.left, y = touch.pageY-ctx.boundingRect.top;
      // console.log(`(${x},${y})`);
      // console.log(`(${player.x}, ${player.y})`);
      var direction = '';
      playSound('buttonPressed');
      if(x<player.x) {
        direction = 'left';
      } else if(x>player.x+101){
        direction = 'right';
      } else {
        if(y<player.y+60) {
          direction = 'up';
        } else if(y>player.y+145) {
          direction = 'down';
        }
      }
      player.handleInput(direction);
    });
    document.addEventListener('touchend', function(e){
      e.preventDefault(); // prevent double touch zoom
    });
    document.addEventListener('click', function(e){
      var x = e.pageX-ctx.boundingRect.left, y = e.pageY-ctx.boundingRect.top;
      // console.log(`(${x},${y})`);
      // console.log(`(${player.x}, ${player.y})`);
      var direction = '';
      playSound('buttonPressed');
      if(x<player.x) {
        direction = 'left';
      } else if(x>player.x+101){
        direction = 'right';
      } else {
        if(y<player.y+60) {
          direction = 'up';
        } else if(y>player.y+145) {
          direction = 'down';
        }
      }
      player.handleInput(direction);
    });


  };

  global.Player = Player;
  global.player = null;
})(self);
