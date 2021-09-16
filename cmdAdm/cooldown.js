const embed = require('../events/embed');
const { TrimMsg } = require('../events/funcoes');


module.exports = {cooldown}
function cooldown(message) {
    if(!message.member.permissions.has('MANAGE_CHANNELS')) return 

    var msgArgs = TrimMsg(message)

    if(isNaN(msgArgs[1])) return message.channel.send({embeds:[ embed.get('&cooldown `{segundos} (ex: &cooldown 5)`', 2)]})

    message.channel.setRateLimitPerUser(msgArgs[1], 'None')
    
    message.channel.send({ embeds: [embed.get(`Cooldown atualizado!`, 0)] });
    
  }