var gpio = require('onoff').Gpio;
var events = require('events');

// ######################################################## CONSTRUCTOR
function GPIOButton(pGPIONUmber, pDebounceTimeout)
{
	this.button = new gpio(pGPIONUmber, 'in', 'both', {debounceTimeout : pDebounceTimeout });
	this.watchButton();
}

// ######################################################## PRIVATE VARIABLES
var I_countButtonPressTime;
var pressType = null;
var b = 0;

GPIOButton.prototype = new events.EventEmitter;

// ######################################################## PUBLIC FUNCTIONS
GPIOButton.prototype.watchButton = function() 
{
	var self = this;

	self.button.watch(function(err, value) 
	{
	    if (err) throw err;

	    if(b != value) 
		{
			b = value;

			if(value == 1)
		    {
		    	var t1 = new Date().getTime();
		    	I_countButtonPressTime = setInterval(self.countButtonPressTime, 10, t1, self);
		    }
		    else
		    {
		    	clearInterval(I_countButtonPressTime);
		    	
		    	if(pressType == null)
		    	{
		    		self.emit('press');
		    	}
		    	pressType = null;
		    }
		}
	    
	});
};


GPIOButton.prototype.countButtonPressTime = function(pT1, context)
{
	var self = context;

	var t = new Date().getTime();
	if(t - pT1 < 2000) // press
	{
		// handled by release	
	}
	else if(t - pT1 < 4000) // long press
	{

		if(pressType != 'longPress')
		{
			pressType = 'longPress';
			//console.log('long press');
			self.emit('longPress');
		}
		
	}
	else // ultra long press
	{
		if(pressType != 'ultraLongPress')
		{
			pressType = 'ultraLongPress';
			//console.log('ultra long press');
			self.emit('ultraLongPress');
		}
	}
}

// ######################################################## STATIC FUNCTIONS
exports.createInstance = function (pGPIONUmber, pDebounceTimeout) 
{ 
	return new GPIOButton(pGPIONUmber, pDebounceTimeout);
}
