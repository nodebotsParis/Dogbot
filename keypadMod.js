/**
 * Similaire a gamepadMod, pas de commentaires ici
 */

var keypress = require('keypress');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

function KeyBoard(){

  if (!(this instanceof KeyBoard)) {return new KeyBoard();}
  EventEmitter.call(this);
  var self = this;

  keypress(process.stdin);
  // catch keybord event in stdIn of the process's terminal
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.setRawMode(true);
  process.stdin.on('keypress', function(ch, key) {

    if (!key) {
      return;
    }

    switch(key.name ){
      case 'q':
        process.exit();
        break;
      case 'up':
        self.emit('direction', 'up');
        break;
      case 'down':
        self.emit('direction', 'down');
        break;
      case 'left':
        self.emit('direction', 'left');
        break;
      case 'right':
        self.emit('direction', 'right');
        break;
      case 'space':
        self.emit('direction', 'stop');
    }
  });
}

util.inherits(KeyBoard, EventEmitter);

module.exports = KeyBoard;
