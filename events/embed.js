const { MessageEmbed } = require('discord.js')
const config = require("../config");



    module.exports={get, getwd}

function get(content, type) {
    try{
    let embed = new MessageEmbed();

    switch(type){
        case 0:
        embed = new MessageEmbed()
            .setColor(config.color.sucess)
            .setAuthor(content, "https://cdn.discordapp.com/attachments/883192208793141338/883377148696600606/tick_1.png")
        break;

        case 1:
        embed = new MessageEmbed()
            .setColor(config.color.err)
            .setAuthor(content, "https://cdn.discordapp.com/attachments/883192208793141338/883377543284150282/cancel.png")

        break;

        case 2:
        embed = new MessageEmbed()
            .setColor(config.color.blue)
            .setAuthor(content, "https://cdn.discordapp.com/attachments/883192208793141338/883379389092487178/info_2.png")

        break;
    }

    return embed;
}catch(err) {
    const emb = embed.get(`Err!`, 1)
    msg.channel.send({ embeds: [emb] });
    msg.delete();

    const channel = client.channels.cache.get('889666042740244510')
    logger.log(`Command: ${msg.content} | Guild: ${msg.guild.id}`, 0)
    channel.send({ embeds: [embed.getwd(`Error`, "Command:```"+msg.content+"```\nError:```"+err+"```", 1)] });
}

}

function getwd(content, description, type) {
    try{

    let embed = new MessageEmbed();

    switch(type){
        case 0:
        embed = new MessageEmbed()
            .setColor(config.color.sucess)
            .setAuthor(content, "https://cdn.discordapp.com/attachments/883192208793141338/883377148696600606/tick_1.png")
            .setDescription(description)
        break;

        case 1:
        embed = new MessageEmbed()
            .setColor(config.color.err)
            .setAuthor(content, "https://cdn.discordapp.com/attachments/883192208793141338/883377543284150282/cancel.png")
            .setDescription(description)
        break;

        case 2:
        embed = new MessageEmbed()
            .setColor(config.color.info)
            .setAuthor(content, "https://cdn.discordapp.com/attachments/883192208793141338/883379389092487178/info_2.png")
            .setDescription(description)
        break;
    }

    return embed;
}catch(err) {
    const emb = embed.get(`Err!`, 1)
    msg.channel.send({ embeds: [emb] });
    msg.delete();

    const channel = client.channels.cache.get('889666042740244510')
    logger.log(`Command: ${msg.content} | Guild: ${msg.guild.id}`, 0)
    channel.send({ embeds: [embed.getwd(`Error`, "Command:```"+msg.content+"```\nError:```"+err+"```", 1)] });
}
}