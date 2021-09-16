const config = require("../config");

module.exports={content}

    async function content(message){
        if(!message.member.permissions.has("ADMINISTRATOR") && !message.member.permissions.has("MANAGE_GUILD")) return 
        var msgArgs = message.content.split(" ");

        if(msgArgs[1]){
                message.channel.messages.fetch(msgArgs[1]).catch(m=>message.channel.send({embeds:[{color:config.color.err,description:"Não foi possivel encontrar a mensagem"}]})).then(messagem => {
                    if(messagem==undefined){
                        message.channel.send({embed:{
                            description:"Você não enviou o id da mensagem certo",
                            color:config.color.err
                        }})
                    }else{
                        message.channel.send("```"+ messagem.content +"```")}}
                )
        }
            else{
                message.channel.send({embeds:[{description:"Como irei modificar o manuscrito se não me enviou o id da?",color:config.color.err}]})
            }

        }
