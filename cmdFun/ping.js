const config = require("../config");
const moment = require(`moment-timezone`)
/*
 returns the latency of the bot
*/

    try{
        module.exports={ping}
        async function ping(msg){

    // Adds the user to the set so that they can't talk for a minute
    
    let pingingMsg = await msg.channel.send({ embeds: [{
        color: config.color.sucess,
        description: "Pinging..."
    }]});
    pingingMsg.edit({content: msg.author.toString() , embeds: [{
        color: config.color.sucess,
        description: `**Pong!** Corri até valhalla e voltei em ${pingingMsg.createdTimestamp - msg.createdTimestamp}ms`
    }]});

    }
}catch(err) {
    const emb = embed.get(`Err!`, 1)
    msg.channel.send({ embeds: [emb] });
    msg.delete();

    const channel = client.channels.cache.get('889666042740244510')
    logger.log(`Command: ${msg.content} | Guild: ${msg.guild.id}`, 0)
    channel.send({ embeds: [embed.getwd(`Error`, "Command:```"+msg.content+"```\nError:```"+err+"```", 1)] });
}
