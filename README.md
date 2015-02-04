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


   
  