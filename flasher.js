var argv = require('yargs')
    .default('led', 11)
    .default('ms', 50)
    .argv;

if(argv.help) {
  console.log("Usage: node flasher.js --led 11 --ms 50");
  console.log(" led - the pin number to flash (default 11)");
  console.log(" ms  - the number of ms to flash on for (default 50)");
  console.log(" oneoff - whether to do one flash and die (default false)")
  console.log("Example usage: tail -f /var/log/messages | sudo node flasher.js");
  console.log("               sudo node flasher --oneoff true --ms 1000");
  process.exit();    
}

var gpio = require('rpi-gpio'),
  LED = argv.led,
  ms = argv.ms,
  currentState = false;

var readline = require('readline');

// listen to stdin
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// flash the led on for 50ms and off for 15ms
var flash = function(callback) {
  // LED ON
  gpio.write(LED, true, function(err) {
    // wait for x
    setTimeout(function() {
      // LED off
      gpio.write(LED, false, function(err) {
        // wait for x/3
        setTimeout(callback, ms/3);
      });
    }, ms);
  });
};

// setup our PIN as an output
gpio.setup(LED, gpio.DIR_OUT, function() {
  
  // turn the LED off
  gpio.write(LED, false, function(err) {
    if (err)
      throw err;

    // if in oneoff mode
    if (argv.oneoff) {
      
      // flash once
      flash( function(err,data) {
        
        // and die
        process.exit();
      });
      
    } else {
      
      // listen to stdin
      var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      // when a line is received 
      rl.on("line", function(line) {
        // and the led is off
        if (currentState == false) {
        
          // start a flashing cycle
          currentState = true;
          flash( function(err,data) {
            currentState=false;
          });
        }
      });
    }


    
  });
});