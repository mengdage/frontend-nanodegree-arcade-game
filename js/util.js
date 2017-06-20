(function(global){
  'use strict';

  // Return random integer between start(included) and end(included)
  function randomInt(start, end) {
    return Math.floor(Math.random() * (end-start+1)) + start;
  }


  global.util = {
    randomInt: randomInt
  };
})(self);
