(function() {
	
	var fs = require('fs');
	var lame = require('lame');
	var Speaker = require('speaker');

	var music_dir = '/home/pi/music';

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

		file.on('error', function(err) {
		  console.log('createReadStream error ' + err);
		  getRandomFile();
		  //throw err;
		});

		var decodedSound = file.pipe(new lame.Decoder());

		// triggered when ID3 tags are received == when sound is ready to be played
		decodedSound.on('format', function (format){
			
			this.pipe(new Speaker(format));

			file.on('end', function(){
			  console.log('file reading end');
			  getRandomFile();
			});

		});
	}

	getRandomFile();

})();

/*function playFile(pFile){
	fs.createReadStream(pFile)
	 .on('open', function (){
	    console.log('open');
	  })
	  .on('end', function (){
	    console.log('end');
	  })
	  .on('error', function (err){
	    console.log('createReadStream Error : ' + err);
	  })
	  .pipe(new lame.Decoder())
	  .on('format', function (format){
	    this.pipe(new Speaker(format));
	  });
}*/