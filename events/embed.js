const { MessageEmbed } = require('discord.js')
const config = require("../config");

module.exports={get, getwd}

function get(content, type) 
{
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
}

function getwd(content, description, type) 
{
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
}