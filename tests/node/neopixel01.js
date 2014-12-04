var sys = require('sys');
var exec = require('child_process').exec;

var color1 = rndColor();
var color2 = rndColor();
var even = true;
var colors = [];
var colorsStr;

for(var i = 0; i < 512; i++)
{
	colors.push(rndColor());
}

colorsStr = colors.join(' ');

function puts(error, stdout, stderr) 
{ 
	sys.puts(stdout);
}

exec('neouart -i -q -s100 ' + colorsStr, puts);

function changeDELColor()
{

	if(even)
	{
		even = false;
		exec('neouart -i -q ' + color1, puts);
		exec('neouart -i -q -s100 ' + color2, puts);
		//color1 = rndColor();
	}
	else
	{
		even = true;
		exec('neouart -i -q ' + color2, puts);
		exec('neouart -i -q -s100 ' + color1, puts);
		//color2 = rndColor();
	}
	
}

function rndColor() {
    var r = ('0' + Math.floor(Math.random() * 256).toString(16)).substr(-2), // red
        g = ('0' + Math.floor(Math.random() * 256).toString(16)).substr(-2), // green
        b = ('0' + Math.floor(Math.random() * 256).toString(16)).substr(-2); // blue

    return r + g + b;
}


function stop()
{
	exec('neouart -i -q ' + '000000', puts);
	//exec('sudo killall neouart', puts);
	console.log('stop');
	
	//setTimeout( function (){exec('sudo killall neouart', puts)}, 1000);
}

setTimeout(stop, 5000);

//I_randomColor = setInterval(changeDELColor, 2000);