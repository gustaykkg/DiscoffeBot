//Looking around? 
let fs = require("fs");
const config = require('../config')
const {MessageEmbed} = require("discord.js");
const { client } = require('../index');
const { TrimMsg } = require("../events/funcoes");
const name = "Discoffee"
const sChannel = config.channels.sug



    module.exports={suggest}

    function suggest(message) {
        let args = TrimMsg(message)
        if (!args[1]) return message.channel.send("Syntax Invalida | `&suggest <sua sugestão>`")
        let content = args.splice(1).join(" ")
            let embed = new MessageEmbed()
                .setColor(message.member.displayHexColor)
                .setThumbnail(message.author.avatarURL)
                .setTitle(name)
                .setDescription(`**Sugestão: **${content}\n**Status: **Esperando Analise`)
                .setFooter("Feita por: " + message.author.tag, message.author.avatarURL)
                .setTimestamp(new Date())

            let embedsent = new MessageEmbed()
                .setColor(message.member.displayHexColor)
                .setTitle("👍 **Sugestão Criada**")
                .setDescription(message.author + (" Fez uma sugestão!"))
                .setFooter(message.author.tag, message.author.avatarURL)
                .setTimestamp(new Date())
            return client.channels.cache.get(sChannel).send({embeds: [embed]}).then(sentEmbed => {
                sentEmbed.react("✅").then(
                    setTimeout(() => {
                        (message.delete({ timeout: 6000 })).then(sentEmbed.react("❌")).then(message.channel.send({embeds: [embedsent]})), (5000)
                    }), 10000)
            })

        };