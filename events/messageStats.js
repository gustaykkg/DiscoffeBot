const { client } = require("../index");
const config = require('../config')
const db = require('quick.db')

client.on('messageCreate', async message=>{
    try{
    if(message.author.bot || message.content.startsWith(config.Prefix)) return;
    if(message.member.roles.cache.has(config.roles.movchat)){
    db.add(`statsm.${message.guild.id}.${message.author.id}.channels.${message.channel.id}`, 1);
    db.set(`statsm.${message.guild.id}.${message.author.id}.activity`, Date.now());
    }
}catch(err) {
    const emb = embed.get(`Err!`, 1)
    msg.channel.send({ embeds: [emb] });
    msg.delete();

    const channel = client.channels.cache.get('889666042740244510')
    logger.log(`Command: ${msg.content} | Guild: ${msg.guild.id}`, 0)
    channel.send({ embeds: [embed.getwd(`Error`, "Command:```"+msg.content+"```\nError:```"+err+"```", 1)] });
}})


