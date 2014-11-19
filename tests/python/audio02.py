#!/usr/bin/env python3

import os, random

def playRandomSound ():
	try:
		randomfile = random.choice(os.listdir("/home/pi/python/audio/mp3/"))
	   	file = ' /home/pi/python/audio/mp3/' + randomfile
	   	os.system ('mpg123' + file)
	except Exception, e:
		print e
   

playRandomSound ()