/**
 * fichier original de test, c'est pas tres propre :)
 */

var five = require('johnny-five');
var keypress = require('keypress');
var gamepad = require('gamepad');
var conf = require('../config');

if(conf.boardType === 'auto'){
  var board = new five.Board();
} else if (conf.boardType === 'usb'){
  var board = new five.Board({
    port : conf.boardUsb
  });
} else if (conf.boardType === 'bt'){
  var board = new five.Board({
    port : conf.boardBt
  });
}

// initialisation du modules keypress
keypress(process.stdin);

/**
 * GAMEPAD
 */
// init gamepad
gamepad.init();
// Create a game loop and poll for events
setInterval(gamepad.processEvents, 16);
// Scan for new gamepads as a slower rate
setInterval(gamepad.detectDevices, 500);


/**
 * SUMO
 */

board.on('ready', function() {

  console.log('Use Up and Down arrows for CW and CCW respectively. Space to stop.');

  // on crée les instance des 2 servos
  var servo = new five.Servo.Continuous(2).stop();
  var servo2 = new five.Servo.Continuous(3).stop();

  // on ecoute le keyboard
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.setRawMode(true);

  // Gamepad controll
  // l'evenement 'down' a lieux a chaque
  gamepad.on('down', function (id, num) {
    console.log('down', {
      id: id,
      num: num,
    });
    if(num === 4){
      servo.ccw();
      servo2.cw();
    }
    if(num === 5){
      servo.cw();
      servo2.cw();
    }
    if(num === 6){
      console.log('num 665');
      servo.cw();
      servo2.ccw();
    }
    if(num === 7){
      servo.ccw();
      servo2.ccw();
    }
    if(num === 14){
      servo.stop();
      servo2.stop();
    }
    if(num === 3){
      console.log('Quitting');
      process.exit();
    }
  });
  // keyboard event
  process.stdin.on('keypress', function(ch, key) {

    if (!key) {
      return;
    }

    if (key.name === 'q') {
      console.log('Quitting');
      process.exit();
    } else if (key.name === 'up') {
      console.log('UP');
      servo.ccw();
      servo2.cw();
    } else if (key.name === 'down') {
      console.log('DOWN');
      servo.cw();
      servo2.ccw();

    } else if (key.name === 'left') {
      console.log('LEFT');
      servo.cw();
      servo2.cw();

    } else if (key.name === 'right') {
      console.log('RIGHT');
      servo.ccw();
      servo2.ccw();

    } else if (key.name === 'space') {
      console.log('Stopping');
      servo.stop();
      servo2.stop();
    }
  });
});
