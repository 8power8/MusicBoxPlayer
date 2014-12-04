var gpio = require('onoff').Gpio;
var events = require('events');

// ######################################################## CONSTRUCTOR
function GPIOPermanentSwitch(pGPIONUmber, pDebounceTimeout)
{
	this.button = new gpio(pGPIONUmber, 'in', 'both', {debounceTimeout : pDebounceTimeout });
	this.state = this.button.readSync();
	this.watchButton();
}

// ######################################################## PRIVATE VARIABLES
var I_countButtonPressTime;
var pressType = null;

GPIOPermanentSwitch.prototype = new events.EventEmitter;

// ######################################################## PUBLIC FUNCTIONS
GPIOPermanentSwitch.prototype.watchButton = function() 
{
	var self = this;

	self.button.watch(function(err, value) 
	{
	    if(err) throw err;

	    if(this.state != value) 
		{
			this.state = value;

			if(value == 1)
		    {
		    	self.emit('change', 1);
		    }
		    else
		    {
		    	self.emit('change', 0);
		    }
		}
	    
	});
};

GPIOPermanentSwitch.prototype.getState = function() 
{
	return this.button.readSync();
}

// ######################################################## STATIC FUNCTIONS
exports.createInstance = function (pGPIONUmber, pDebounceTimeout) 
{ 
	return new GPIOPermanentSwitch(pGPIONUmber, pDebounceTimeout);
}
