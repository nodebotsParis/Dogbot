// comme index.js mais avec juste

var Key = require('./keypadMod');
var sumo = require('./sumoMod');

var key = new Key();

function initKey (){
  key.on('direction', function (data) {
    sumo.emit('directionOut',data);
  });
}

sumo.on('ready',function () {
  initKey();
});