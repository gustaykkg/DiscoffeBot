const { client } = require("../index");
const config = require('../config')
const db = require('quick.db')

client.on('messageCreate', async message=>{
    if(message.author.bot || message.content.startsWith(config.Prefix)) return;
    if(message.member.roles.cache.has(config.roles.movchat)){
    db.add(`statsm.${message.guild.id}.${message.author.id}.channels.${message.channel.id}`, 1);
    db.set(`statsm.${message.guild.id}.${message.author.id}.activity`, Date.now());
    }
})
