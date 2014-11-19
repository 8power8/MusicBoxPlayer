(function(){

	var GPIOButtonClass = require('./GPIOButton'); 
	var AudioPlayerClass = require('./AudioPlayer');

	var GPIOButton = GPIOButtonClass.createInstance(21, 0);
	var audioPlayer = AudioPlayerClass.createInstance('/home/pi/music/test');

	GPIOButton.on('press', function() { 
		audioPlayer.addSongAndPlay();
	});

	GPIOButton.on('longPress', function() { 
		console.log('LONG_PRESS');
	});

	GPIOButton.on('ultraLongPress', function() { 
		console.log('ULTRA_LONG_PRESS');
	});

})();