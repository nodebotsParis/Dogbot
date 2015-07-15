/**
 * version modulaire du gamepad pour controle sumobot, requis dans index.js
 *
 */

var gamepad = require('gamepad');
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var isMoving = false;
var dirFwd = true;

/**
 * la fonction gamepad sera la seule exportée de ce module, elle émét
 * des events qui sont écoutables par le module qui l'instancie.
 */
function GamePad(){
  // verifie qu'il est bien une instance de lui meme, en crée une sinon
  if (!(this instanceof GamePad)) {return new GamePad();}

  // on fais applique le prototyoe de event emiter a notre objet
  EventEmitter.call(this);
  // création d'une reference a soi meme
  var self = this;

  // Inintialisation de la librairie gamepad
  gamepad.init();

  // Loop pour checker les events du gamepad
  setInterval(gamepad.processEvents, 16);
  // Scan pour d'autres gamepad
  setInterval(gamepad.detectDevices, 500);

  // ecoute les evenements "down" des boutons du gamepad
  gamepad.on('down', function (id, num) {
    // switch pour les direction le bouton stop et quit
    switch(num){
      // avant
      case 4 :
        // emet un event pour index.js
        self.emit('direction', 'up');
        // assigne la dirction du bot (pour reprise ou non apres rotation)
        dirFwd = true;
        // assigne la variable de mouvement
        isMoving = true;
        break;
      // droite
      case 5 :
        self.emit('direction', 'right');
        break;
      // bas
      case 6 :
        self.emit('direction', 'down');
        isMoving = true;
        dirFwd = false;
        break;
      // gauche
      case 7 :
        self.emit('direction', 'left');
        break;
      // stop (X)
      case 14 :
        self.emit('direction', 'stop');
        isMoving = false;
        console.log('is moving',isMoving);
        break;
      // quit (start)
      case 3 :
        process.exit();
        break;
    }
  });

  // ecoute les evenements up (bouton relaché)
  gamepad.on('up', function (id, num) {
    // si c'est droite ou gauche
    if(num === 5 || num === 7){
      // si le robot n'avancais pas quand on tourne
      if (isMoving === false){
        // on arrete le bot
        self.emit('direction', 'stop');
      }
      // sinon on avance
      else if (dirFwd === true && isMoving === true){
        self.emit('direction', 'up');
      }
      // ou on recule selon le besoin
      else if (dirFwd === false &&isMoving === true){
        console.log('up', isMoving);
        self.emit('direction', 'down');
      }
    }
  });
}

// on fais heriter les events au gamepad
util.inherits(GamePad, EventEmitter);
// et on exporte le tout
module.exports = GamePad;
