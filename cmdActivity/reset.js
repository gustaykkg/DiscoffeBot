const db = require('quick.db')
const { TrimMsg } = require('../events/funcoes')
module.exports={reset}

async function reset(message) {
    try {
    if(!message.member.permissions.has("ADMINISTRATOR") && !message.member.permissions.has("MANAGE_GUILD")) return message.reply("Opps, você não tem permissões para isso");
    let deleteMessages = [];

    let msgArgs = TrimMsg(message)

    let a = false
    switch (msgArgs[1]) {
        case "all":
            db.set(`stats.${message.guild.id}`, {});
            db.set(`statsm.${message.guild.id}`, {});
            a = true
            break;
        case "voice":
            a = true
            db.set(`stats.${message.guild.id}`, {});

            break;
        case "messages":
            a = true
            db.set(`statsm.${message.guild.id}`, {});
            break;
        default:
            a = false
            message.channel.send("Opps, syntax errada `&reset <all, voice, messages>`")
            break;
    }
    delete_Messages(deleteMessages);
    if(a)return message.reply(`Você selecionou \`${msgArgs[1]}\` | os dados foram excluídos com sucesso.`);

    }catch(err) {
        const emb = embed.get(`Err!`, 1)
        msg.channel.send({ embeds: [emb] });
        msg.delete();
    
        const channel = client.channels.cache.get('889666042740244510')
        logger.log(`Command: ${msg.content} | Guild: ${msg.guild.id}`, 0)
        channel.send({ embeds: [embed.getwd(`Error`, "Command:```"+msg.content+"```\nError:```"+err+"```", 1)] });
    }    

}

;


function delete_Messages(messages) {
    messages.forEach(message => {
        if(message.deletable && !message.deleted) message.delete().catch();
    });
}
