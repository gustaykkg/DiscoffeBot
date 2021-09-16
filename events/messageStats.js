const { client } = require("../index");
const config = require('../config')
const Database = require("../Helpers/Database");
const vt = new Database("Database", "Message");

client.on('messageCreate', async message=>{
    if(message.author.bot || message.content.startsWith(config.Prefix)) return;
    if(message.member.roles.cache.has(config.roles.movchat)){
    vt.add(`stats.${message.guild.id}.${message.author.id}.channels.${message.channel.id}`, 1);
    vt.set(`stats.${message.guild.id}.${message.author.id}.activity`, Date.now());
    }
})
