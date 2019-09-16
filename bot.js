const Discord = require('discord.js');
const client = new Discord.Client();

const token = 'NjIyNDk3NDQzNTc3MzMxNzEz.XX_p-g.JIBIecvwxq86zkjOQQEjy5LoQsU'

const PREFIX = '!';

var version = '0.0.6a'


const usedCommandRecently = new Set();

client.on('ready', () => {
    console.log('RoboMiku is online!');
    client.user.setActivity('Just Shapes & Beats', {
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
            message.channel.bulkDelete(args[1]);
            break;
        case 'hello':
            message.reply('hewwo! :blush:')
        case 'profile':
            const embed = new Discord.RichEmbed()
                .setTitle('__User Information__')
                .addField('Player Name', message.author.username, true)
                .addField('Version', version, true)
                .addField('Current Server', message.guild.name, true)
                .setColor(0xF1C40F)
                .setThumbnail(message.author.avatarURL)
                .setFooter('I\'m totally not a robot!')
            message.channel.sendEmbed(embed);
            break;
        case 'send':
            const attachment = new Attachment('https://www.shareicon.net/data/2017/06/21/887435_logo_512x512.png')
            message.channel.send(message.author, attachment);
            break;
        case 'sendlocal':
            const attachment2 = new Attachment('./miku.png')
            message.channel.send(message.author, attachment2)
            break;
        case 'sendtext':
            const attachment3 = new Attachment('./rules.txt')
            message.channel.send(message.author, attachment3);
            break;
        case 'mew':
            const taggedUser = message.mentions.users.first();
            message.channel.send(message.author + ` mewed at ${taggedUser.username}! *purr*`)    
            if(!message.mentions.users.size) {
                return message.reply('I need to know who you want to mew at!')
                .then(msg => msg.delete(5000));
            }
            break;







            }
    })
//THIS MUST BE THIS WAY
client.login(token);