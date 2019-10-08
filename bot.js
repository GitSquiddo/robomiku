const Discord = require('discord.js');
const { Users, CurrencyShop } = require('./dbObjects');
const { Op } = require('sequelize');
const currency = new Discord.Collection();
const client = new Discord.Client();

const PREFIX = '!';

Reflect.defineProperty(currency, 'add', {
	value: async function add(id, amount) {
		const user = currency.get(id);
		if (user) {
			user.balance += Number(amount);
			return user.save();
		}
		const newUser = await Users.create({ user_id: id, balance: amount });
		currency.set(id, newUser);
		return newUser;
	},
});

Reflect.defineProperty(currency, 'getBalance', {
	value: function getBalance(id) {
		const user = currency.get(id);
		return user ? user.balance : 0;
	},
});

var activityDoing = [
    "you!",
    "Attack on Titans",
    "with her dog",
    "Killing with Cuteness",
    "her favorite song"
]

var activityType = [
    "PLAYING",
    "STREAMING",
    "WATCHING",
    "LISTENING"
]

var version = '0.1.11a'

const usedCommandRecently = new Set();

client.once('ready', async () => {
    console.log('RoboMiku is online, and running version ' + version + '!');
    const randomActivityDoing = activityDoing[Math.floor(Math.random() * activityDoing.length)];
    const randomActivityType = activityType[Math.floor(Math.random() * activityType.length)];
    client.user.setActivity(randomActivityDoing, {
        type: randomActivityType
    }).catch(console.error);
    const storedBalances = await Users.findAll();
    storedBalances.forEach(b => currency.set(b.user_id, b));
})

var answersForHello = [
  "Hey",
  "Howdy",
  "Hello there",
  "Nice to see you",
  "Hewwo",
  "Greetings",
  "Welcome back",
  "Hi! Didn\'t see you there",
  "Por qué, hola"
]
   
var answersForMew1 = [
    "Look at that! ",
    "So cute! ",
    "Incredible! ",
    "Oh! ",
    "*I'm lovin\' it!*  ",
    "*:open_mouth:*  Whoah! "
]

var answersForMew2 = [
    "~~I ship it.~~",
    "*UwU*",
    "*purr*",
    "Guess people can be cats too. Weird.",
    "Where\'s the dog?",
    "Very interesting.. :thinking:"
]

var answersForPing = [
    "Pong!",
    "Pingity pong!",
    "Oreo! ~~No, wait..~~",
    "Super combo pong!",
    "Pinger ponger!"
]
    
    

    client.on('guildMemberAdd', member => {

        const channel = member.guild.channels.find(channel => channel.name === "welcome");
        if (!channel) return;

        channel.send(`Hello there, ${member}! I am RoboMiku, the bot for this server, and I would like to welcome you! :grin:\n\n Before you continue, I reccommend you check the rules in the rules channel first!\n\n See ya later! :wave:`)
    });

   client.on('message', async message => {
           if (message.author.bot) return;
	   currency.add(message.author.id, 1);
	   
if (!message.content.startsWith(PREFIX)) return;
	const input = message.content.slice(PREFIX.length).trim();
	if (!input.length) return;
	const [, command, commandArgs] = input.match(/(\w+)\s*([\s\S]*)/);

        let args = message.content.substring(PREFIX.length).split(" ");

        switch (args[0]) {
            case 'ping':
                const randomAnswerPing = answersForPing[Math.floor(Math.random() * answersForPing.length)];
                message.channel.sendMessage(randomAnswerPing)
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
            case 'weebs':
                message.channel.send('Oh, so you want this? https://m.youtube.com/watch?v=S5RRCyCkiCk');
                break;
            case 'money':
                var target = message.mentions.users.first() || message.author;
                return message.channel.send(`${target.tag} has ~~M~~ ${currency.getBalance(target.id)}`);
		break;
	    case 'inventory':
		var target = message.mentions.users.first() || message.author;
                const user = await Users.findOne({ where: { user_id: target.id } });
                const items = await user.getItems();

                if (!items.length) return message.channel.send(`Sorry! Guess ${target.tag} has nothing!`);
                return message.channel.send(`Let\'s see what ${target.tag} currently has ${items.map(i => `${i.amount} ${i.item.name}`).join(', ')}`);
		break;
                
        }

    });
    client.login(process.env.BOT_TOKEN)
