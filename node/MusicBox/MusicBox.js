(function(){

	var GPIOButtonClass = require ('./GPIOButton'); 

	var GPIOButton = GPIOButtonClass.createInstance(21, 0);

	GPIOButton.on('press', function() { 
		console.log('PRESS');
	});

	GPIOButton.on('longPress', function() { 
		console.log('LONG_PRESS');
	});

	GPIOButton.on('ultraLongPress', function() { 
		console.log('ULTRA_LONG_PRESS');
	});

})();