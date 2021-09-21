const { MessageEmbed } = require('discord.js')
const { TrimMsg } = require("../events/funcoes");

try{
    
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
}catch(err) {
    const emb = embed.get(`Err!`, 1)
    msg.channel.send({ embeds: [emb] });
    msg.delete();

    const channel = client.channels.cache.get('889666042740244510')
    logger.log(`Command: ${msg.content} | Guild: ${msg.guild.id}`, 0)
    channel.send({ embeds: [embed.getwd(`Error`, "Command:```"+msg.content+"```\nError:```"+err+"```", 1)] });
}