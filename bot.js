const Discord = require('discord.js');

const client = new Discord.Client();

const PREFIX = '!';


var version = '0.1.03a'

const usedCommandRecently = new Set();

client.on('ready', () => {
    console.log('RoboMiku is online, and running version ' + version + '!');
    client.user.setActivity('TJoC: Halloween Edition', {
        type: 'PLAYING'
    }).catch(console.error);
})

var answersForHello = [
  "Hey",
  "Howdy",
  "Hello there",
  "Nice to see you",
  "Hewwo",
  "Greetings",
  "Welcome back",
  "Hi! Didn\'t see you there"
]
   
var answersForMew1 = [
    "Look at that! ",
    "So cute! ",
    "Incredible! ",
    "Oh!",
    "*I'm lovin\' it!* "
]

var answersForMew2 = [
    "~~I ship it.~~",
    "*UwU*",
    "*purr*",
    "Guess people can be cats too. Weird.",
    "Where\'s the dog?"
]
    
    

    client.on('guildMemberAdd', member => {

        const channel = member.guild.channels.find(channel => channel.name === "welcome");
        if (!channel) return;

        channel.send(`Hello there, ${member}! I am RoboMiku, the bot for this server, and I would like to welcome you! :grin: Before you continue, I reccommend you check the rules in the rules channel first! See ya later! :wave:`)
    });

   client.on('message', message => {

        let args = message.content.substring(PREFIX.length).split(" ");

        switch (args[0]) {
            case 'ping':
                message.channel.sendMessage('pong!')
                break;
            case 'info':
                if (args[1] === 'version') {
                    message.channel.sendMessage('The current version is ' + version + '. ' + 'Keep your eyes peeled for updates!')
                } else {
                    message.channel.sendMessage('Sorry, that\'s not a valid command! Try again. :thumbsdown:')
                        .then(msg => msg.delete(5000));
                }
                break;
            case 'clear':
                if (!args[1]) return message.reply('Oops! You didn\'t define how many you wanted to clear, so I couldn\'t do anything! :worried: Please try again.')
                    .then(msg => msg.delete(5000));
                if(!message.member.roles.find(r => r.name === "RoboMiku's Creator")) return;
                message.channel.send('Sorry, I can\'t let you clear any messages because you do not have the needed roles!')
                    .then(msg => msg.delete(5000));
                message.channel.bulkDelete(args[1]);
                break;
            case 'hello':
                const randomAnswerHello = answersForHello[Math.floor(Math.random() * answersForHello.length)];
                message.channel.send(randomAnswerHello + ', ' + message.author.username + '!')
                break;
            case 'profile':
                const embed = new Discord.RichEmbed()
                    .setTitle('__' + message.author.username + '\'s Profile__')
                    .addField('Version', version, true)
                    .addField('Current Server', message.guild.name, true)
                    .setColor(0x277ECD)
                    .setThumbnail(message.author.avatarURL)
                    .setFooter('I\'m totally not a robot!')
                message.channel.sendEmbed(embed);
                break;
            case 'mew':
                const pingedUser = message.mentions.users.first();
                const randomAnswerMew1 = answersForMew1[Math.floor(Math.random() * answersForMew1.length)];
                const randomAnswerMew2 = answersForMew2[Math.floor(Math.random() * answersForMew2.length)];
                message.channel.send(randomAnswerMew1 + message.author.username + ` mewed at ${pingedUser.username}! ` + randomAnswerMew2)
                if (!message.mentions.users.size) {
                return message.reply('I need to know who you want to mew at!')
                    .then(msg => msg.delete(5000));
                }
                break;
                
        }

    });
    client.login(process.env.BOT_TOKEN)
