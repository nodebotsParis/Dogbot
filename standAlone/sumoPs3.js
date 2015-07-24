// sumo ps3 en mode a l'arrache

var five = require('johnny-five');

var gamepad = require('gamepad');
// var Barcli = require('barcli');
var isMoving = false;
var dirFwd = true;
var board = new five.Board(
  //{port: '/dev/cu.BLuebot-DevB'}
  // {port: '/dev/tty.usbmodem1411'}
);

gamepad.init();

// Create a game loop and poll for events
setInterval(gamepad.processEvents, 16);
// Scan for new gamepads as a slower rate
setInterval(gamepad.detectDevices, 500);

// Create a game loop and poll for events
setInterval(gamepad.processEvents, 16);
// Scan for new gamepads as a slower rate
setInterval(gamepad.detectDevices, 500);

board.on('ready', function() {
  // define the hardware we need
  var servo = new five.Servo.Continuous(2).stop();
  var servo2 = new five.Servo.Continuous(3).stop();



  console.log('use the cross of your PS3 controller');

  // function to move the bot
  var up = function(){
    console.log('Bot Up');
    isMoving = true;
    servo.ccw();
    servo2.cw();
    dirFwd = true;
  };
  var down = function(){
    console.log('Bot Down');
    isMoving = true;
    dirFwd = false;
    servo.cw();
    servo2.ccw();
  };
  var right = function(){
    isMoving = true;
    console.log('Bot Right');
    servo.ccw();
    servo2.ccw();
  };
  var left = function(){
    isMoving = true;
    console.log('Bot Left');
    servo.cw();
    servo2.cw();
  };
  var stop = function () {
    isMoving = false;
    console.log('Bot Stop');
    servo.stop();
    servo2.stop();
  };

  var quit = function(){
    console.log('Quitting');
    process.exit();
  };

  // gamepad logic
  gamepad.on('down', function (id, num) {
    console.log('yo',num,'pressed');
    if(num === 4){
      up();
    }
    if(num === 5){
      right();
    }
    if(num === 6){
      down();
    }
    if(num === 7){
      left();
    }
    if(num === 14){
      stop();
    }
    if(num === 3){
      quit();
    }
  });

  // Listen for button up events on all gamepads
  gamepad.on('up', function (id, num) {
    if(num === 5 || num === 7){
      if (dirFwd === true){
        up();
      }
      else{
        down();
      }
    }
  });
});
