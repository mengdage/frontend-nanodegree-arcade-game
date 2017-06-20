(function(global) {
  'use strict';
  var manager;
  var canvas = document.getElementsByTagName('canvas')[0];
  // var player = global.player;

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
    }
  };

  // render the buttons and character pictures
  // return true if render happens
  // return false if rendering is not needed
  function render() {
    if(!config.characterChosen.active) { // check if rendering is needed
      return false;
    }
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
    return true;
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

  // add event listener to canvas
  // mousemove
  //
  function addEventToCanvas() {
    canvas.addEventListener('mousemove', onCanvasMouseMove);
    canvas.addEventListener('click', onCanvasClick);
  }

  function onCanvasClick(e) {
    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left,
        y = e.clientY - rect.top,
        buttons = config.characterChosen.buttons;
    if(config.characterChosen.active) { // check if in the character chosen interface
      for( var btn in buttons) { // check each button
        if(buttons.hasOwnProperty(btn)) {
          var button = buttons[btn];
          if(x>button.x && x<button.x+button.width && y>button.y && y<button.y+button.height) { // check if mouse on the button
            button.callback();
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
    gameState.userImage = characterSprites[id];

  }
  // change button's hover property to true if mouse move over the button
  function onCanvasMouseMove(e) {
    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left,
        y = e.clientY - rect.top,
        buttons = config.characterChosen.buttons;
    if(config.characterChosen.active) { // check if in the character chosen interface

      for( var btn in buttons) { // check each button
        if(buttons.hasOwnProperty(btn)) {
          var button = buttons[btn];
          if(x>button.x && x<button.x+button.width && y>button.y && y<button.y+button.height) { // check if mouse on the button
            button.hover = true;
          } else {
            if(button.hover) {
              button.hover = false;
            }
          }

        }
      }
    }
  }

  function init() {
  }
  addEventToCanvas();
  manager = {
    render: render
  };
  global.gameState = gameState;
  global.manager = manager;
})(self);
