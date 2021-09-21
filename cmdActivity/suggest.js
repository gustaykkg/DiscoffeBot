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
        try{
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

        }catch(err) {
            const emb = embed.get(`Err!`, 1)
            msg.channel.send({ embeds: [emb] });
            msg.delete();
        
            const channel = client.channels.cache.get('889666042740244510')
            logger.log(`Command: ${msg.content} | Guild: ${msg.guild.id}`, 0)
            channel.send({ embeds: [embed.getwd(`Error`, "Command:```"+msg.content+"```\nError:```"+err+"```", 1)] });
        }


        };