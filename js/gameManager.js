(function(global) {
  'use strict';
  var manager;
  // buttons on characterChosen
  var canvas = document.getElementsByTagName('canvas')[0];
  var util = global.util;
  var characterSprites = [
    'images/char-boy.png',
    'images/char-pink-girl.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-princess-girl.png'
  ];
  // track the game state
  var gameState = {
    level: 0, // game level
    score: 0,
    initialStat: {
      level: 0,
      score: 0
    },
    maxEnemies: 4,
    userImg: ''
  };
  // config statistics
  var config = {
    characterChosen: {
      active: true,
      buttons: {
        leftBtn: {
          x: canvas.width/2-50-20-100,
          y: 350,
          width: 100,
          height: 50,
          hover: false,
          color: '#d6d6d6',
          hoverColor: '#777',
          content: '←',
          callback: prevCharacter
        },
        rightBtn: {
          x: canvas.width/2+50+20,
          y: 350,
          width: 100,
          height: 50,
          hover: false,
          color: '#d6d6d6',
          hoverColor: '#777',
          content: '→',
          callback: nextCharacter
        },
        startBtn: {
          x: canvas.width/2,
          y: 450,
          width: 100,
          height: 50,
          hover: false,
          color: '#d6d6d6',
          hoverColor: '#777',
          content: 'Go!',
          callback: startGame
        }
      },
      characterPic: {
        curIdx: 0,
        x: canvas.width/2-50,
        y: 229,
        width: 101,
        height: 171
      }
    },
    scoreBoard: {
      needUpdate: true,
      x: 10,
      y: 30
    }
  };
  var chButtons = config.characterChosen.buttons;

  // Check if any collision between player and enemies
  // return true if there is a collision
  function checkCollisions() {
    var playerLeft = player.x;
    var playerRight = player.x + 101;
    for(var i = 0; i < allEnemies.length; i++) {
      var enemy = allEnemies[i];
      // 1. check if the enemy is in the same row with the player
      // 2. check if collision
      if((enemy.row === player.row) && (enemy.x<playerRight && (enemy.x+101)>playerLeft)){
        return true;
      }
    }
    return false;
  }
  // manage updating player and allEnemies
  // return true: need updating other objects
  // return false: dont need updating other objects
  function update() {
    if(!config.characterChosen.active) { // check if updating player, enemies are needed
      if(!player) {
        player = new Player(gameState.userImg);
        player.listenDirectionOps();
      }
      if(checkCollisions()) {
        console.log('you lost');
        updateScore(-100);
        player.reset();
      }
      if(player.checkWin()) {
        console.log('you win!');
        updateScore(100);
        player.reset();
      }
      if(allEnemies.length != (gameState.level+1)) {
        var enemiesNum = Math.min(gameState.level+1, gameState.maxEnemies);
        enemies.setEnemiesNum(enemiesNum);
      }
      return true;
    } else {
      return false;
    }
  }

  // render the buttons and character pictures
  // return true if other renderings are needed
  // return false if other rendering are not needed
  function render() {
    var scoreBoard = config.scoreBoard;
    if(config.characterChosen.active) { // check if rendering is needed
      // the buttons object which contains all buttons to be drawn
      var buttons = config.characterChosen.buttons;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // draw all buttons
      for(var btn in buttons) {
        if(buttons.hasOwnProperty(btn)) {
          var button = buttons[btn];
          drawBtn(button);
        }
      }
      // draw character
      drawInitialCharacter();
      return false;
    } else {
      // If update is needed, update the score on screen
      if(scoreBoard.needUpdate) {
        ctx.save();
        ctx.font = '36px Impact';
        ctx.fillStyle = '#000';

        ctx.clearRect(0, 0, 505, 39);
        ctx.fillText('Score: ' + gameState.score + '  Level: ' + gameState.level, scoreBoard.x, scoreBoard.y);
        ctx.restore();

        scoreBoard.needUpdate = false;
      }
      return true;
    }
  }
  // draw the given button on the canvas
  function drawBtn(button) {
    var x = 0,
        y = 0,
        width = 0,
        height = 0;
    ctx.save();
    if(button.hover) {
      ctx.fillStyle = button.hoverColor;
    } else {
      ctx.fillStyle = button.color;
    }
    ctx.strokeStyle = '#000';
    x = button.x;
    y = button.y;
    width = button.width;
    height = button.height;
    // draw button
    ctx.fillRect(x, y, width, height);
    ctx.strokeRect(x, y, width, height);
    // draw content on button
    ctx.lineWidth = 20;
    ctx.fillStyle = '#000';
    ctx.font= '24px serif';
    ctx.fillText(button.content, x+width/2-15, y+height/2+5);
    ctx.restore();
  }
  function drawInitialCharacter() {
    var characterPic = config.characterChosen.characterPic;
    var x = characterPic.x,
        y = characterPic.y,
        width = characterPic.width,
        height = characterPic.height,
        charIdx = characterPic.curIdx;
    ctx.save();
    var charImg = self.Resources.get(characterSprites[charIdx]);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.drawImage(charImg, x, y);
    ctx.strokeRect(x, y, width, height);

    ctx.restore();
  }

  // add event listeners to canvas on character selection
  function addEventToCanvas() {
    canvas.addEventListener('mousemove', onCanvasMouseMove);
    canvas.addEventListener('click', onCanvasClick);
    canvas.addEventListener('touchstart', onCanvasTouchStart);
    canvas.addEventListener('touchend', onCanvasTouchEnd);
  }
  // remove event listeners to canvas on character selection
  function deleteEventToCanvas() {
    canvas.removeEventListener('mousemove', onCanvasMouseMove);
    canvas.removeEventListener('click', onCanvasClick);
    canvas.removeEventListener('touchstart', onCanvasTouchStart);
    canvas.removeEventListener('touchend', onCanvasTouchEnd);
  }
  // check if a position is on the element in the canvas
  function checkIfPosOnBtn(posX, posY, elem) {
    // get the (x,y) relative to the canvas
    var x = posX - ctx.boundingRect.left,
        y = posY - ctx.boundingRect.top;
    if(x>elem.x && x<elem.x+elem.width && y>elem.y && y<elem.y+elem.height) { // check if (x,y) on the button
      return true;
    }
    return false;
  }
  // check if characterChosen active
  function checkIfCharChosen() {
    return config.characterChosen.active;
  }
  var nn = 0;
  function onCanvasTouchEnd(e) {
    // console.log('touch end');
    if(checkIfCharChosen()) {
      for(var btn in chButtons) {
        if(chButtons.hasOwnProperty(btn)){
          var button = chButtons[btn];
          for(var touchId = 0, touchLength=e.changedTouches.length; touchId < touchLength; touchId += 1) {
            if(checkIfPosOnBtn(e.changedTouches[touchId].clientX, e.changedTouches[touchId].clientY, button)) {
              button.hover = false;
              // console.log(button);
            }
          }
        }
      }
    }
  }

  function onCanvasTouchStart(e) {
    // console.log('touch start');
    if(checkIfCharChosen()) {
      for(var btn in chButtons) {
        if(chButtons.hasOwnProperty(btn)){
          var button = chButtons[btn];
          for(var touchId = 0, touchLength=e.changedTouches.length; touchId < touchLength; touchId += 1) {
            if(checkIfPosOnBtn(e.changedTouches[touchId].clientX, e.changedTouches[touchId].clientY, button)){
              button.hover = true;
              // console.log(button);
            }
          }
        }
      }
    }
  }

  // invoke the button's callback if clicking the button
  function onCanvasClick(e) {
    if(checkIfCharChosen()) {
      for(var btn in chButtons) {
        var button = chButtons[btn];
        if(chButtons.hasOwnProperty(btn) && checkIfPosOnBtn(e.clientX, e.clientY, button)) {
          button.callback();
        }
      }
    }
  }
  // change button's hover property to true if mouse move over the button
  function onCanvasMouseMove(e) {
    if(checkIfCharChosen()) {
      for(var btn in chButtons) {
        var button = chButtons[btn];
        if(chButtons.hasOwnProperty(btn) && checkIfPosOnBtn(e.clientX, e.clientY, button)) {
          if(!button.hover) {
            button.hover = true;
          }
        } else {
          if(button.hover) {
            button.hover = false;
          }
        }
      }
    }
  }
  // change character picture to the previous one
  function prevCharacter() {
    var charLen = characterSprites.length;
    var id = config.characterChosen.characterPic.curIdx;
    config.characterChosen.characterPic.curIdx = (id+charLen-1)%charLen;
  }
  // change character picture to the next one
  function nextCharacter() {
    var charLen = characterSprites.length;
    var id = config.characterChosen.characterPic.curIdx;
    config.characterChosen.characterPic.curIdx = (id+1)%charLen;
  }
  function startGame() {
    var id = config.characterChosen.characterPic.curIdx;
    // player.changeSprite(characterSprites[id]);
    config.characterChosen.active = false;
    deleteEventToCanvas();
    gameState.userImg = characterSprites[id];

  }

  function initScore() {
    var scoreBoard = config.scoreBoard;
    scoreBoard.needUpdate = true;
    // update gameState
    gameState.score = gameState.initialStat.score;
    gameState.level = gameState.initialStat.level;
  }
  // Update the score value by adding v to the value
  function updateScore(v) {
    var scoreBoard = config.scoreBoard;
    scoreBoard.needUpdate = true;
    // update score
    gameState.score+= v;
    // update level
    gameState.level = Math.max(Math.floor(gameState.score/100), 0);
  }

  addEventToCanvas();
  manager = {
    render: render,
    update: update
  };
  global.gameState = gameState;
  global.manager = manager;
})(self);
