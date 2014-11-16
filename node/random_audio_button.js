(function() {
	// ########################### IMPORTS
	var fs = require('fs');
	var lame = require('lame');
	var Speaker = require('speaker');
	var Gpio = require('onoff').Gpio;
	// ###################################

    var button = new Gpio(21, 'in', 'rising');
	var music_dir = '/home/pi/music';
	var sp;

	function getRandomFile(){

		fs.readdir(music_dir, function (err, files) {
		  if (err) {
		    console.log(err);
		    return;
		  }

		  var file = music_dir + '/' + files[Math.floor(Math.random() * ( files.length + 1))];

		  playFile(file);

		});
	}

	function playFile(pFile){

		var file = fs.createReadStream(pFile);

		file.on('open', function (){
			console.log('Opening file : ' + pFile);
		});

		/*file.on('data', function(data) {
		  console.log('Data ' + data );
		});*/
		
		/*file.on('end', function(){
		  console.log('file reading end');
		  getRandomFile();
		});*/

		file.on('error', function(err) {
		  console.log('createReadStream error ' + err);
		  getRandomFile();
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
			});

		});
	}

	/**
	* Buton handling
	*/
	button.watch(function(err, value) {
	    if (err) exit();
	    getRandomFile();
	});

	/**
	* Exit handling
	*/
	function exit() {
	    led.unexport();
	    button.unexport();
	    process.exit();
	}

	process.on('SIGINT', exit);

	// EXEC
	//getRandomFile();

})();