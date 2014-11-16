(function() {

	var Gpio = require('onoff').Gpio;
    var led = new Gpio(20, 'out');
    var button = new Gpio(21, 'in', 'both');

    led.writeSync(1);

	button.watch(function(err, value) {
	    if (err) exit();
	    led.writeSync(value);
	    console.log(value);
	});

	function exit() {
	    led.unexport();
	    button.unexport();
	    process.exit();
	}

	process.on('SIGINT', exit);

})();