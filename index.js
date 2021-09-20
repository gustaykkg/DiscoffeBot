const {Client, Intents} = require('discord.js')
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_VOICE_STATES]})
const fs = require("fs");
const config = require("./config.js");
const { TrimMsg } = require('./events/funcoes.js');

const cmdActivity = fs.readdirSync(`./cmdActivity`).filter(file => file.endsWith(`.js`))
const cmdFun = fs.readdirSync(`./cmdFun`).filter(file => file.endsWith(`.js`))
const events = fs.readdirSync(`./events`).filter(file => file.endsWith(`.js`))

module.exports={client}

console.log(cmdActivity, events)

client.on("ready", () => {
    console.log("| Preparação completa. Iniciando Bot |");

    client.user.setActivity('| say_cat_oficial |', { type: 'WATCHING' });
    cmdActivity.forEach(cmdActivity => {require(`${__dirname}/cmdActivity/${cmdActivity}`)})
    events.forEach(events => {require(`${__dirname}/events/${events}`);})
    cmdFun.forEach(cmdFun => {require(`${__dirname}/cmdFun/${cmdFun}`);})

    console.log("Bot Iniciado!");
   
    
});


client.login(config.Token);