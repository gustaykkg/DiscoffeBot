module.exports={TrimMsg}

function TrimMsg(message){
    try{
    return message.content.split(/\n| /gm).filter((str) => str.trim())
    }catch(err) {
        const emb = embed.get(`Err!`, 1)
        msg.channel.send({ embeds: [emb] });
        msg.delete();
    
        const channel = client.channels.cache.get('889666042740244510')
        logger.log(`Command: ${msg.content} | Guild: ${msg.guild.id}`, 0)
        channel.send({ embeds: [embed.getwd(`Error`, "Command:```"+msg.content+"```\nError:```"+err+"```", 1)] });
    }
}