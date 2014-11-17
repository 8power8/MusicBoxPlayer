(function() {
	// ########################### imports
	var fs = require('fs');
	var lame = require('lame');
	var Speaker = require('speaker');
	var Gpio = require('onoff').Gpio;

	// ########################### variables
    var button = new Gpio(21, 'in', 'both'); // both, rising or falling
	var songDir = '/home/pi/music/test';
	var songList = [];
	var sp;
	var playing = false;

	/**
	* Pick-up a random file from pDir
	*/
	function getRandomSong(pDir)
	{
		files = fs.readdirSync(pDir);
		return pDir + '/' + files[Math.floor(Math.random() * files.length)];
	}

	/**
	* Add a song to songDir array
	*/
	function addSong()
	{
		var song = getRandomSong(songDir);
		songList.push(song);
		console.log("Song added to song list: " + song);
		console.log("There is now " + songList.length + " song in song list.");
	}

	/**
	* Plays the next song into the list
	*/
	function play()
	{

		var file;
		
		if(!playing)
		{

			if(songList.length > 0)
			{
				var song = songList.shift();
				file = fs.createReadStream(song);

				playing = true;

				file.on('open', function (){
					console.log('Start playing : ' + song);
				});

				file.on('error', function(err) {
				  console.log('createReadStream error ' + err);
				  playing = false;
				  getRandomSong(songDir);
				  //throw err;
				});

				var decodedSound = file.pipe(new lame.Decoder());

				// triggered when ID3 tags are received == when sound is ready to be played
				decodedSound.on('format', function (format){
					
					sp = null;
					sp = new Speaker(format);

					this.pipe(sp);

					sp.on('open', function(){
					  	console.log('speaker open');
					});

					sp.on('close', function(){
						console.log('speaker close');
						console.log("There is now " + songList.length + " song in song list.");
						playing = false;
						play();
					  	
					});

				});
			}
			
		}
	}

	/**
	* Button handling
	*/
	var b = 1;
	var I_countButtonPressTime;
	var pressType;

	function onButtonStateChange(err, value) 
	{
	    if (err) exit();

	    if(b != value) 
		{
			b = value;

			if(value == 0) // press
		    {
		    	console.log('press');
		    	var t1 = new Date().getTime();
		    	I_countButtonPressTime = setInterval(countButtonPressTime, 10, t1);
		    }
		    else // release
		    {
		    	console.log('release');
		    	clearInterval(I_countButtonPressTime);

		    	if(pressType == null || pressType == 'short')
		    	{
		    		console.log(getRandomSong(songDir));
				    addSong();
				    play();
		    	}
		    	
		    	pressType = null;
		    	
		    }

		}
	    
	}

	button.watch(onButtonStateChange);

	function countButtonPressTime(pT1)
	{
		var t = new Date().getTime();

		if( t - pT1 < 1000) // short press
		{
			if( pressType != 'short' )
			{
				pressType = 'short';
				console.log('short press');
			}
		}
		else if(t - pT1 < 3000) // long press
		{
			if( pressType != 'long' )
			{
				pressType = 'long';
				console.log('long press');
			}
		}
		else // ultra long press
		{
			if( pressType != 'ultraLong' )
			{
				pressType = 'ultraLong';
				console.log('ultra long press');
			}
		}
	}
	
	/**
	* Exit handling
	*/
	function exit() 
	{
	    button.unexport();
	    process.exit();
	}

	process.on('SIGINT', exit);

	// EXEC
	//getRandomSong(songDir);

})();