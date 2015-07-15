var Key = require('./keypadMod');
var GamePad = require('./gamepadMod');
var sumo = require('./sumoMod');

var key = new Key();
var gamePad = new GamePad();

function initControl (){
  key.on('direction', function (data) {
    sumo.emit('directionOut',data);
  });

  gamePad.on('direction', function (data) {
    sumo.emit('directionOut',data);
  });
}

sumo.on('ready',function () {
  initControl();
});