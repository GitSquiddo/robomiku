const Discord = require('discord.js');

const client = new Discord.Client();

const PREFIX = '!';


var version = '0.1.0a'

const usedCommandRecently = new Set();

client.on('ready', () => {
    console.log('RoboMiku is online, and running version ' + version + '!');
  client.user.setActivity('TJoC: Halloween Edition', {
        type: 'PLAYING'
    }).catch(console.error);
})


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
                if(!message.member.roles.find(r => r.name === "RoboMiku's Creator")) return message.channel.send('Sorry, I can\'t let you clear any messages because you do not have the needed roles!')
                    .then(msg => msg.delete(5000));
                message.channel.bulkDelete(args[1]);
                break;
            case 'hello':
                message.channel.send('Hewwo, ' + message.author.username + '! :blush:')
                break;
            case 'profile':
                const embed = new Discord.RichEmbed()
                    .setTitle('__' + message.author.username + '\'s Profile__')
                    .addField('Version', version, true)
                    .addField('Current Server', message.guild.name, true)
                    .setColor(0xF1C40F)
                    .setThumbnail(message.author.avatarURL)
                    .setFooter('I\'m totally not a robot!')
                message.channel.sendEmbed(embed);
                break;
            case 'mew':
                const taggedUser = message.mentions.users.first();
                message.channel.send(message.author.username + ` mewed at ${taggedUser.username}! *purr*`)
                if (!message.mentions.users.size) {
                    return message.reply('I need to know who you want to mew at!')
                        .then(msg => msg.delete(5000));
                }
                break;
        }

    });
    client.login(process.env.BOT_TOKEN)
