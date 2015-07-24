/**
 * Fichier de configuration du dogbot
 * c'est le seul fichier a editer si vous
 * ne voullez pas programmer le bot, une
 * fois vos choix de controlleur et
 * l'adresse de votre port serie de
 * defini, vous pouvez lancer le bot
 * avec la commande
 */

var conf = {
  // selection du port serie
  // 'auto' : laisse johnny five faire
  // si vous ne connaisez pas le port laissez
  // tel quel
  // 'usb' : pour spécifier un port précis
  // 'bt' : comme usb mais pour y sauver
  // l'adress du module bluetooth
  boardType : 'auto',
  // adresses des port serie
  boardUsb  : '/dev/tty.usbmodem8013431',
  boardBt : '/dev/tty.BLuebot-DevB',

  // pin des servoMoteurs
  motorsPins : [2,3],
  // choix du type de controle
  // 'keyboard' : par defaut, utilise les fleches
  // 'ps3'      : gamepad ps3
  // 'both'     : soyons fous
  contoller : 'keyboard'
};

module.exports = conf;