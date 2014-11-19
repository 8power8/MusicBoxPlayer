## MusicBoxPlayer

MusicBox Player is a 'snooze like' toddler friendly mp3 music player, operated by adults and designed with NodeJS for the RaspBerry Pi platform.

When user push a button, an mp3 file is randomly picked up from a song pool folder, and played. The more you push the buton, the more the playlist is filled up with mp3 files. When playlist gets empty, the player waits for a new button push, and the whole process begin again.

## Usage

```js
var AudioPlayerClass = require('./AudioPlayer');
var audioPlayer = AudioPlayerClass.createInstance('/path/to/mp3/files');
audioPlayer.addSongAndPlay();
```

## Dependencies
MusicBox Player rely on the excellent [OnOff](https://github.com/fivdi/onoff) library for handling GPIO interrupts detection.
It also uses [Lame](https://www.npmjs.org/package/lame) and [Speaker](https://www.npmjs.org/package/speaker) NodeJS modules by [TooTallNate](https://github.com/TooTallNate)
