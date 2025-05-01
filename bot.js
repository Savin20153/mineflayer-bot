var mineflayer = require('mineflayer');

var options = {
    host: "emeraldcubes.top",
    port: 36565,
    username: "BiosForXeon",
    version: "1.21.4",
    verbose: "falce",
    auth: 'microsoft',
    password: "",
};

var bot = mineflayer.createBot(options);
bindEvents(bot);

function bindEvents(bot) {

    bot.on('error', function(err) {
        console.log('Error attempting to reconnect: ' + err.errno + '.');
        if (err.code == undefined) {
            console.log('Invalid credentials OR bot needs to wait because it relogged too quickly.');
            console.log('Will retry to connect in 30 seconds. ');
            setTimeout(relog, 30000);
        
        }
    });

    function greeting() {
        bot.chat("/login __1234567890__e");
        bot.chat("/tell Its_Savin я зашел");
        bot.chat("/home");
    }
      
    bot.on("spawn", greeting);

    bot.on('end', function() {
        console.log("Bot has ended");
        // If set less than 30s you will get an invalid credentials error, which we handle above.
        setTimeout(relog, 30000);  
    });
}

function relog() {
    console.log("Attempting to reconnect...");
    bot = mineflayer.createBot(options);
    bindEvents(bot);
}