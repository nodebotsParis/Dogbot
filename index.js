/**
 * fichier principal, il requiere tout les modules du programe, et dirige les events des inputs (keybord et pad ps3) sur le dogBot
 */

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