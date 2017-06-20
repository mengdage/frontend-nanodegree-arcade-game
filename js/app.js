(function(global){
  'use strict';
  var util = global.util;

  // track the game state
  var gameState = {
    level: 0, // game level
    score: 0,
    initialStat: {
      level: 0,
      score: 0
    }
  };


  // The score board
  var scoreBoard = {
    needUpdate: true,
    // (posX, posY) is the position where to print the score on the game screen
    posX: 10,
    posY: 38,
    init: function() {
      this.needUpdate = true;
      // update gameState
      gameState.score = gameState.initialStat.score;
      gameState.level = gameState.initialStat.level;
    },
    // Update the score value by adding v to the value
    updateScore: function(v) {
      this.needUpdate = true;
      // update score
      gameState.score+= v;
      // update level
      gameState.level = Math.max(Math.floor(gameState.score/100), 0);
    },
    // If update is needed, update the score on screen
    render: function() {
      if(this.needUpdate) { // need update
        ctx.save();
        ctx.font = '36px Impact';
        ctx.fillStyle = '#000';

        ctx.clearRect(0, 0, 505, 39);
        ctx.fillText('Score: ' + gameState.score + '  Level: ' + gameState.level, this.posX, this.posY);
        ctx.restore();

        this.needUpdate = false;

      }
    }
  };

  global.scoreBoard = scoreBoard;

})(this);
