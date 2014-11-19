var events = require('events');

// ######################################################## CONSTRUCTOR
function AudioPlayer(pMusicDir)
{
	this.musicDir = pMusicDir;
}

var sp;
var songList = [];
var playing = false;

// ######################################################## PRIVATE VARIABLES
var fs = require('fs');
var lame = require('lame');
var Speaker = require('speaker');

AudioPlayer.prototype = new events.EventEmitter;

// ######################################################## PUBLIC FUNCTIONS
AudioPlayer.prototype.play = function() 
{
	var self = this;
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
			  this.getRandomSong(this.musicDir);
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
					self.play();
				});

			});
		}
		
	}
}

/**
* Pick-up a random file from pDir
*/
AudioPlayer.prototype.getRandomSong = function()
{
	var files = fs.readdirSync(this.musicDir);
	return this.musicDir + '/' + files[Math.floor(Math.random() * files.length)];
}

/**
* Add a song to songDir array
*/
AudioPlayer.prototype.addSongAndPlay = function()
{
	var song = this.getRandomSong(this.musicDir);
	songList.push(song);
	this.play();
	console.log("Song added to song list: " + song);
	console.log("There is now " + songList.length + " song in song list.");
}

// ######################################################## STATIC FUNCTIONS
exports.createInstance = function (pMusicDir) 
{ 
	return new AudioPlayer(pMusicDir);
}