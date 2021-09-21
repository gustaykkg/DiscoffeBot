const {MessageEmbed} = require("discord.js");
const {client} = require('../index')
const db = require('quick.db')
const moment = require("moment");
const config = require("../config");
require("moment-duration-format");

module.exports={me}
async function me(message){
    try{
    let voiceData = db.get(`stats.${message.guild.id}.${message.author.id}`) || {voice: 0, channels: {}};
    let messageData = db.get(`statsm.${message.guild.id}.${message.author.id}`) || {messages: 0, channels: {}};

    let voiceList = Object.keys(voiceData.channels).map(vd => {
        return {
            Id: vd,
            Total: voiceData.channels[vd]
            
        };
    }).sort((a, b) => b.Total - a.Total);
    let messageList = Object.keys(messageData.channels).map(md => {
        return {
            Id: md,
            Total: messageData.channels[md]
        };
    }).sort((a, b) => b.Total - a.Total);


    voiceList = voiceList.length > 10 ? voiceList.splice(0, 10) : voiceList;
    voiceList = voiceList.map((vd, index)=> `\`${index + 1}.\` ${client.channels.cache.has(vd.Id) ? client.channels.cache.get(vd.Id).toString() : "#deleted-channel"}: \`${moment.duration(vd.Total).format("H [hours,] m [minutes]")}\``).join("\n");
    messageList = messageList.length > 10 ? messageList.splice(0, 10) : messageList;
    messageList = messageList.map((md, index)=> `\`${index + 1}.\` ${client.channels.cache.has(md.Id) ? client.channels.cache.get(md.Id).toString() : "#deleted-channel"}: \`${md.Total} message\``).join("\n");
    
    if(message.member.roles.cache.has(config.roles.movcall) && !message.member.roles.cache.has(config.roles.movchat)){
    
    let embed = new MessageEmbed();
    embed.setColor(message.member.displayHexColor)
    .setFooter(`${message.author.tag} | Discoffee`)
    .setThumbnail(message.author.avatarURL({dynamic: true}))
    .addField("Informações de usuario",` 
    
    \`ID:\` ${message.author.id} 
    \`Nome:\` ${message.member.displayName}`)
    .addField("Atividade de voz", `
    Ultima Atividade: ${new Date(voiceData.activity).toLocaleDateString()}
    ** **${voiceList}
    `)

    message.channel.send({ embeds: [embed] });
    }
    
    if(!message.member.roles.cache.has(config.roles.movcall) && message.member.roles.cache.has(config.roles.movchat)){
        
    let embed = new MessageEmbed();
    embed.setColor(message.member.displayHexColor)
    .setFooter(`${message.author.tag} | Discoffee`)
    .setThumbnail(message.author.avatarURL({dynamic: true}))
    .addField("Informações de usuario",` 
    
    \`ID:\` ${message.author.id} 
    \`Nome:\` ${message.member.displayName}`)
    .addField("Atividade em mensagem", `
    Ultima Atividade: ${new Date(messageData.activity).toLocaleDateString()}
    ** **${messageList}
    `);

    message.channel.send({ embeds: [embed] });
    
    }
    
    if(message.member.roles.cache.has(config.roles.movcall) && message.member.roles.cache.has(config.roles.movchat)){
    
    let embed = new MessageEmbed();
    embed.setColor(message.member.displayHexColor)
    .setFooter(`${message.author.tag} | Discoffee`)
    .setThumbnail(message.author.avatarURL({dynamic: true}))
    .addField("Informações de usuario",` 
    
    \`ID:\` ${message.author.id} 
    \`Nome:\` ${message.member.displayName}
    `)
    .addField("Atividade de voz", `
    Ultima Atividade: ${new Date(voiceData.activity).toLocaleDateString()}
    ** **${voiceList}
    `)
    .addField("Atividade em mensagem", `
    Ultima Atividade: ${new Date(messageData.activity).toLocaleDateString()}
    ** **${messageList}
    `);

    message.channel.send({ embeds: [embed] });
    }else if(!message.member.roles.cache.has(config.roles.movcall) && !message.member.roles.cache.has(config.roles.movchat)) return message.channel.send({embeds: [{title: `Entre para a equipe Discoffee!!`, description: `Infelizmente você não faz parte da equipe de mov do nosso server\ncaso tenha interesse em ser recrutado de uma olhada no chat\n<#887903923984298004>`, color:message.member.displayHexColor}]})
} catch(err) {
    const emb = embed.get(`Err!`, 1)
    msg.channel.send({ embeds: [emb] });
    msg.delete();

    const channel = client.channels.cache.get('889666042740244510')
    logger.log(`Command: ${msg.content} | Guild: ${msg.guild.id}`, 0)
    channel.send({ embeds: [embed.getwd(`Error`, "Command:```"+msg.content+"```\nError:```"+err+"```", 1)] });
}
};