const embed = require('../events/embed');
const { TrimMsg } = require('../events/funcoes');


module.exports = {cooldown}
function cooldown(message) {
  try{
    if(!message.member.permissions.has('MANAGE_CHANNELS')) return 

    var msgArgs = TrimMsg(message)

    if(isNaN(msgArgs[1])) return message.channel.send({embeds:[ embed.get('&cooldown `{segundos} (ex: &cooldown 5)`', 2)]})

    message.channel.setRateLimitPerUser(msgArgs[1], 'None')
    
    message.channel.send({ embeds: [embed.get(`Cooldown atualizado!`, 0)] });
  }catch(err) {
    const emb = embed.get(`Err!`, 1)
    msg.channel.send({ embeds: [emb] });
    msg.delete();

    const channel = client.channels.cache.get('889666042740244510')
    logger.log(`Command: ${msg.content} | Guild: ${msg.guild.id}`, 0)
    channel.send({ embeds: [embed.getwd(`Error`, "Command:```"+msg.content+"```\nError:```"+err+"```", 1)] });
}

  }