var five = require('johnny-five');
var isMoving = false;
var dirFwd = true;
var board = new five.Board(
  // {port: '/dev/tty.BLuebot-DevB'}
  {port: '/dev/tty.usbmodem1411'}
);

board.on('ready', function() {
  // define the hardware we need
  var servo = new five.Servo.Continuous(2).stop();
  var servo2 = new five.Servo.Continuous(3).stop();

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

  board.on('directionOut',function(data){
    switch(data){
      case 'up':
        up();
        break;
      case 'down':
        down();
        break;
      case 'left':
        left();
        break;
      case 'right':
        right();
        break;
      case 'stop':
        stop();
        break;
    }
  });
});

module.exports = board;