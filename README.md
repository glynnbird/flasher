# Flasher

A simple Raspberry Pi LED flashing utility. Pipe text data into it and it will flash an LED

## Electronics


You'll need an LED and a resistor

    Pin 11 (GPIO17/GEN0) ---> LED ---> 330 ohm Resistor ---> Pin 6 (GND)

## Usage

    # flash once
    echo "Flash" | sudo node flasher.js
    
    # flash every time a line is added to /var/log/messages
    tail -f /var/log/messages | sudo node flasher.js
        
    # flash every time traffic arrives on port 80
    sudo tcpdump -i eth0 'tcp port 80' | sudo node flasher.js 

## Optional parameters

* pin - the number of the GPIO pin to flash (default 11)
* ms - the number of milliseconds to flash for (default 50)
* usage - print the usage information

e.g.

    tail -f /var/log/messages | sudo node flasher.js --pin 11 --ms 100




  
