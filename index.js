/**
 * fichier principal, il requiere tout les modules du programe, et dirige les events des inputs (keybord et pad ps3) sur le dogBot
 */

var conf = require('./config');
var sumo = require('./sumoMod');

// chargement des modules de controlles (clavier ou manette ps3)
// selon la configuration

if (conf.contoller === 'keyboard' || conf.contoller === 'both'){
  var Key = require('./keypadMod');
  var key = new Key();
}

if (conf.contoller === 'ps3' || conf.contoller === 'both'){
  var GamePad = require('./gamepadMod');
  var gamePad = new GamePad();
  console.log('gamepad');
}


// forward des controlles au sumobot
function initControl (){

  if (conf.contoller === 'keyboard' || conf.contoller === 'both'){
    key.on('direction', function (data) {
      sumo.emit('directionOut',data);
    });
  }

  if (conf.contoller === 'ps3' || conf.contoller === 'both'){
    gamePad.on('direction', function (data) {
      sumo.emit('directionOut',data);
    });
  }
}

// pour eviter d'envoyer des controles au bot avant qu'il
// ne soit pret, on attends son signal pour l'initialiser
sumo.on('ready',function () {
  initControl();
});