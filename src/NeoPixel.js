// This module uses neouart :
// http://wp.josh.com/2014/09/02/give-your-raspberrypi-a-neopixel/
// https://github.com/bigjosh/NeoUart

var exec = require('child_process').exec;

var colors = [];
var colorsStr;

/**
* Returns a string which is a random hexa value.
*/
function rndColor() {
    var r = ('0' + Math.floor(Math.random() * 256).toString(16)).substr(-2), // red
        g = ('0' + Math.floor(Math.random() * 256).toString(16)).substr(-2), // green
        b = ('0' + Math.floor(Math.random() * 256).toString(16)).substr(-2); // blue

    return r + g + b;
}

// ######################################################## CONSTRUCTOR
function NeoPixel(pGPIONUmber)
{
	
}

NeoPixel.prototype.startRandomColors = function()
{
	for(var i = 0; i < 512; i++) colors.push(rndColor());
	colorsStr = colors.join(' ');

	var ex = exec('neouart -i -q -s100 ' + colorsStr, {killSignal: 'SIGKILL'},
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
}

NeoPixel.prototype.stopRandomColors = function()
{
	exec('killall neouart');
	setTimeout( function(){exec('neouart -i -q 000000')}, 500);
}

NeoPixel.prototype.turnOn = function(pColor)
{
	var color;
	pColor !== undefined ? color = pColor : pColor = 0xFFFFFF;
	exec('neouart -i ' + pColor.toString(16));
}

NeoPixel.prototype.turnOff = function()
{
	exec('neouart -i 000000');
}

// ######################################################## STATIC FUNCTIONS
exports.createInstance = function (pGPIONUmber) 
{ 
	return new NeoPixel(pGPIONUmber);
}