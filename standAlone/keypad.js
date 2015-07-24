// simple demo de catch de touche sur le tty

var keypress = require('keypress');

keypress(process.stdin);
// catch keybord event in stdIn of the process's terminal
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.setRawMode(true);
process.stdin.on('keypress', function(ch, key) {

    if (!key) {
      return;
    }

    switch(key.name ){
      case 'q':
        // quit();
        console.log('q');
        process.exit();
        break;
      case 'up':
        console.log('up');
        // up();
        break;
      case 'down':
        console.log('down');
        // down();
        break;
      case 'left':
        console.log('left');
        // left();
        break;
      case 'right':
        console.log('right');
        // right();
        break;
    }
  });