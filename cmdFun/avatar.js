const { MessageEmbed } = require('discord.js')
const { TrimMsg } = require("../events/funcoes");

module.exports={avatar}

    async function avatar(msg){
        
        const embed = new MessageEmbed()
        
        let msgArgs = TrimMsg(msg)

        let userid = (msg.mentions.members.first()) ? msg.mentions.members.first().user.id : msgArgs[1]?.match(/[0-9]/) ? msgArgs[1] : msg.member.id;
        let member = await msg.guild.members.fetch( { user:userid, force: false } )
        embed.setImage(member.user.displayAvatarURL( { size:1024 } ) )
        embed.setColor(member.displayHexColor)
        msg.channel.send({content: msg.author.toString() , embeds: [embed]})
    }