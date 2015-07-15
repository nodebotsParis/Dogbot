// ficher de test d'un gamepad ps3, connectez votre pad ps3 a l'ordi et appuyez sur le bouton ps3 une fois pairé si vous avez le bluetooth et que vous voyez le stick vous pouvez enlever le cordon

var gamepad = require('gamepad');
var Barcli = require('barcli');

// Initialize the library
gamepad.init();

// List the state of all currently attached devices
for (var i = 0, l = gamepad.numDevices(); i < l; i++) {
  console.log(i, gamepad.deviceAtIndex());
}
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

// Listen for button down events on all gamepads
gamepad.on('down', function (id, num) {
  console.log('down', {
    id: id,
    num: num,
  });
});

// visal bar for X,Y axis of the 2 analog stick
var leftX = new Barcli({ label: 'left X', range: [-1, 1],precision:2});
var leftY = new Barcli({ label: 'left Y', range: [-1, 1],precision:2});var rightX = new Barcli({ label: 'right X', range: [-1, 1],precision:2});
var rightY = new Barcli({ label: 'right Y', range: [-1, 1],precision:2});

