var fs = require('fs');
var lame = require('lame');
var Speaker = require('speaker');

var rnd = Math.floor(Math.random()*11);
var rndStr = '';

String(rnd).length == 1 ? rndStr = "0" + String(rnd) : rndStr = String(rnd);

var file = 'Bon-Iver/' + rndStr + '.mp3';

fs.createReadStream(file)
  .pipe(new lame.Decoder())
  .on('format', function (format) {
    this.pipe(new Speaker(format));
  });