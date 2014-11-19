import os
import random
import signal
import subprocess

randomfile = random.choice(os.listdir("/home/pi/python/audio/mp3/"))
file = ' /home/pi/python/audio/mp3/' + randomfile

# The os.setsid() is passed in the argument preexec_fn so
# it's run after the fork() and before  exec() to run the shell.
pro = subprocess.Popen( "mpg123" + file, 
						stdout=subprocess.PIPE, 
                       	shell=True, 
                       	preexec_fn=os.setsid) 

#os.killpg(pro.pid, signal.SIGTERM)  # Send the signal to all the process groups