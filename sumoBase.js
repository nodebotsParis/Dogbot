/**
 * fichier original de test, c'est pas tres propre :)
 */

var five = require('johnny-five');
var keypress = require('keypress');
var gamepad = require('gamepad');
var Barcli = require('barcli');
keypress(process.stdin);
var board = new five.Board(
  {port: '/dev/cu.BLuebot-DevB'} // port bluetooth
  // {port: '/dev/tty.usbmodem1411'} // port usb
);


/**
 * GAMEPAD
 */
// init gamepad
gamepad.init();
// Create a game loop and poll for events
setInterval(gamepad.processEvents, 16);
// Scan for new gamepads as a slower rate
setInterval(gamepad.detectDevices, 500);

// Create a game loop and poll for events
setInterval(gamepad.processEvents, 16);
// Scan for new gamepads as a slower rate
setInterval(gamepad.detectDevices, 500);

// Listen for move events on all gamepads
gamepad.on('move', function (id, axis, value) {
  if (axis === 0){
    leftX.update(value);
  }
  if (axis === 1){
    leftY.update(value);
  }
  if (axis === 2){
    rightX.update(value);
  }
  if (axis === 3){
    rightY.update(value);
  }
});

// Listen for button up events on all gamepads
gamepad.on('up', function (id, num) {
  console.log('up', {
    id: id,
    num: num,
  });
});

// creation des barres pour le stick analogique
var leftX = new Barcli({ label: 'left X', range: [-1, 1],precision:2});
var leftY = new Barcli({ label: 'left Y', range: [-1, 1],precision:2});var rightX = new Barcli({ label: 'right X', range: [-1, 1],precision:2});
var rightY = new Barcli({ label: 'right Y', range: [-1, 1],precision:2});

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
