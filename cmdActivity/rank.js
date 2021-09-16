const { MessageEmbed } = require('discord.js')
const Database = require("../Helpers/Database");
const vt = new Database("Database", "Voice");
const mdb = new Database("Database", "Message");
const moment = require("moment");
require("moment-duration-format");

module.exports={rank}

async function rank(message){
    if(!message.member.permissions.has("ADMINISTRATOR") && !message.member.permissions.has("MANAGE_GUILD")) return message.reply("Opps, você não tem permissões para isso");
    const voiceData = vt.get(`stats.${message.guild.id}`) || undefined;
    const messageData = mdb.get(`stats.${message.guild.id}`) || undefined;

    let messageList = "Sem resultados.";
    if(messageData){
        messageList = Object.keys(messageData || {}).map(md => {
            return {
                Id: md,
                Total: Object.values(messageData[md].channels || {}).reduce((a, b) => a + b, 0)
            };
        }).sort((a, b) => b.Total - a.Total).splice(0, 10).map((user, index) => `\`${index + 1}.\` <@${user.Id}> \`${user.Total} mensagens\``).join("\n");    
    }

    let voiceList = "Sem resultados.";
    if(voiceData){
        voiceList = Object.keys(voiceData || {}).map(md => {
            return {
                Id: md,
                Total: Object.values(voiceData[md].channels || {}).reduce((a, b) => a + b, 0)
            };
        }).sort((a, b) => b.Total - a.Total).splice(0, 10).map((user, index) => `\`${index + 1}.\` <@${user.Id}> \`${moment.duration(user.Total).format("H [hours,] m [minutes]")}\``).join("\n");
    }

    let embed = new MessageEmbed();
    embed.setColor(message.member.displayHexColor)
    .setFooter(`${message.author.tag} | feito po guxta mood;`)
    .setThumbnail(message.author.avatarURL({dynamic: true}))
    .addField("Voice | Ranking", `** **\n${voiceList}`)
    .addField("Message | Ranking", `** **\n${messageList}`);
    message.channel.send({ embeds: [embed] });
};
