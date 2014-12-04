var sys = require('sys');
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;

var even = true;
var colors = [];
var colorsStr;

function rndColor() {
    var r = ('0' + Math.floor(Math.random() * 256).toString(16)).substr(-2), // red
        g = ('0' + Math.floor(Math.random() * 256).toString(16)).substr(-2), // green
        b = ('0' + Math.floor(Math.random() * 256).toString(16)).substr(-2); // blue

    return '32' + r + g + b;
}

for(var i = 0; i < 32; i++) colors.push(rndColor());
colorsStr = colors.join(' ');

var ex = exec('neouart -i -q -s50 ' + colorsStr, {killSignal: 'SIGKILL'},
function (error, stdout, stderr) 
{
  console.log('exec error: ' + error, stdout, stderr);
});

ex.on('exit', function (code, signal) {
  console.log('neouart process exited c/s ' + code, signal);
});

ex.on('close', function (code, signal) {
    console.log('neouart process closed ' + code, signal);
});

ex.on('error', function (err) {
  console.log('neouart error ' + err);
});

function stop()
{
	//ex.kill('SIGKILL');
  exec('killall neouart');
  exec('neouart 000000');
}

setTimeout(stop, 5000);