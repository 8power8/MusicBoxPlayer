(function(){

	var nightMusicPath = '/home/pi/music/night';
	var dayMusicPath = '/home/pi/music/day';

	var GPIOButtonClass = require('./GPIOButton');
	var GPIOPermanentSwitch = require('./GPIOPermanentSwitch');
	var NeoPixelClass = require('./NeoPixel');
	var AudioPlayerClass = require('./AudioPlayer');

	var GPIOPermanentSwitch = GPIOPermanentSwitch.createInstance(17, 0);
	var GPIOButton = GPIOButtonClass.createInstance(21, 0);
	var neoPixel = NeoPixelClass.createInstance();
	var audioPlayer = AudioPlayerClass.createInstance(nightMusicPath);

	//##################################### Playlist type switch
	console.log('Playlist type switch state is : ' + GPIOPermanentSwitch.getState());

	GPIOPermanentSwitch.on('change', function(pState) { 
		console.log('Playlist type switch state changed to : ' + pState);
	});

	//##################################### Add to playlist button
	GPIOButton.on('press', function() 
	{
		if(GPIOPermanentSwitch.getState() == 0)
		{
			audioPlayer.addSongAndPlay(nightMusicPath);
		}
		else
		{
			audioPlayer.addSongAndPlay(dayMusicPath);
		}

	});

	GPIOButton.on('longPress', function() { 
		audioPlayer.emptyPlayList();
	});

	GPIOButton.on('ultraLongPress', function() { 
		console.log('ULTRA_LONG_PRESS');
	});

	//##################################### AudioPlayer
	audioPlayer.on('playlistStart', function() { 
		console.log('playlist start');
		neoPixel.startRandomColors();
	});

	audioPlayer.on('playListComplete', function() { 
		console.log('playlist complete');
		neoPixel.stopRandomColors();
	});

})();