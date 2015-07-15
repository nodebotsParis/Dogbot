/**
 * le sumobot lui meme !
 */

var five = require('johnny-five');

// on initialise une connection serie avec l'arduino
var board = new five.Board(
  // {port: '/dev/tty.BLuebot-DevB'} // bluetooth
  {port: '/dev/tty.usbmodem1411'} // usb
  // si fournie sans port il essaye les port disponibles
);

// quand la connection serie est initialisée cet event est produit
board.on('ready', function() {

  // on crée nos servos
  var servo = new five.Servo.Continuous(2).stop();
  var servo2 = new five.Servo.Continuous(3).stop();

  // Fonctions de mouvement du bot
  var up = function(){
    console.log('Bot Up');
    // cw: clockwise
    // ccw : counter clockwise
    servo.ccw();
    servo2.cw();
  };
  var down = function(){
    console.log('Bot Down');
    servo.cw();
    servo2.ccw();
  };
  var right = function(){
    console.log('Bot Right');
    servo.ccw();
    servo2.ccw();
  };
  var left = function(){
    console.log('Bot Left');
    servo.cw();
    servo2.cw();
  };
  var stop = function () {
    console.log('Bot Stop');
    servo.stop();
    servo2.stop();
  };

  // écoute les evénement que le module index produit
  board.on('directionOut',function(data){
    switch(data){
      case 'up':
        // et envoie la fonction selon la donnée reçue
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

// on export la board
module.exports = board;