const config = require("../config")
const { TrimMsg } = require("../events/funcoes")

module.exports={unmute}

    async function unmute(msg){
        if(!msg.member.permissions.has('MUTE_MEMBERS')) return 

        let msgArgs = TrimMsg(msg)

        if(!msgArgs[1] || !msgArgs[1].match(/[0-9]+/) && !msg.mentions.members.first())return msg.channel.send("Mencione um usuário")
        let userid = (msg.mentions.members.first()) ? msg.mentions.members.first().user.id : msgArgs[1].match(/[0-9]+/)[0];

        let member = msg.guild.members.cache.get(userid)


        if (member){
            if (member.roles.cache.has(config.roles.muted)){
                await member.roles.remove(config.roles.muted)
                if(member.voice){
                    member.voice.setMute(false)
                }
                member.send(`Você foi desmutado em Discoffee por ${msg.author}`)
                return msg.channel.send(`${msg.author} o membro ${member.user} foi desmutado` )
            }else{
                return msg.channel.send(msg.author+" O membro não esta mutado")
            }
        }else{
            return msg.channel.send(msg.author+" O membro não esta no servidor")
        }
    }