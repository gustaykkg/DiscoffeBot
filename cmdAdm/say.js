const { client } = require("../index");
const config = require("../config")


module.exports={say}

    async function say(message){
    if(!message.member.permissions.has("ADMINISTRATOR") && !message.member.permissions.has("MANAGE_GUILD")) return message.reply("Opps, você não tem permissões para isso");
    
    var msgArgs = message.content.split(" ");
    if(/[0-9]+/.test(msgArgs[1])){
    const canal =  client.channels.cache.find(channel =>channel.id === msgArgs[1])
    if(canal==undefined){
        message.channel.send({content: message.author.toString(),embeds:[{
            description:"Não foi possivel achar o canal no servidor",
            color: config.color.err,
        }]})
    }else{
        var mensagem = message.content.substring(msgArgs.slice(0, 2).join(" ").length + 1);
        if(mensagem && mensagem.length <= 2000){
        await canal.send(mensagem);
        await message.delete()
        message.channel.send(message.author.toString()+" Mensagem enviada com sucesso em " + canal.name )
        }else{
           return message.channel.send(message.author.toString()+" Mensagem invalida. Verifique o seu conteudo")
        }
        }
    }
        else{
            var mensagem = message.content.substring(msgArgs.slice(0, 1).join(" ").length + 1);
            if(mensagem){
            message.channel.send(mensagem);
            message.delete()
            }else{
                message.channel.send({content: message.author.toString(), embeds:[{
                    description:"Você não informou a mensagem para que eu possa portá-la",
                    color:config.color.err,
                }]});
            };
        };
    }
