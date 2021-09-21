const { client } = require('../index')
const { TrimMsg } = require('../events/funcoes');
const embed = require('../events/embed');
const config = require('../config');


try{
 module.exports={purge}
async function purge(msg){
    if(!msg.member.permissions.has('MANAGE_MESSAGES')) return 
    const args = TrimMsg(msg) 
    let prefixos = config.Prefix
   
    if(!args[1])return msg.channel.send({ embeds: [embed.get(`Syntax Invalida - ${prefixos}purge <usuario> **ou** ${prefixos}purge <quantia de mensagens 1-99> `, 1)] })
    if(args[1].length  < 18){
        if(args[2])return msg.channel.send({ embeds: [embed.get(`Invalid syntax - ${prefixos}purge <user> or ${prefixos}purge <count messages 1-99> `, 1)] })
        if(!args[1]) return msg.channel.send('Por favor especifique quantas mensagens irei deletar | 1-99')
        if(isNaN(args[1])) return msg.channel.send('Apens numeros permitidos')
        

        if(parseInt(args[1]) > 99 || args[1] <= 0 && args[1] != 18) return msg.channel.send('A quantidade de mensagens que posso deletar é de 1-99')
        await msg.channel.bulkDelete(parseInt(args[1]) + 1)
            .catch(err => console.log(err))
        
            msg.channel.send('Deletei ' + args[1]  + " mensagens.")
 }else{

 if(args[1] == undefined || args[2])return msg.channel.send({ embeds: [embed.get(`Syntax Invalida - ${prefixos}purge <usuario> **ou** ${prefixos}purge <quantia de mensagens 1-99> `, 1)] });
    const messages = await msg.channel.messages.fetch();
    const userid = (msg.mentions.members.first()) ? msg.mentions.members.first().user.id : args[1].match(/[0-9]+/)[0];
    const member = await client.users.fetch(userid)

    

    if (member) {
        const userMessages = (await messages).filter(
    (m) => m.author.id === member.id
        );

    await msg.channel.bulkDelete(userMessages);
    msg.channel.send(`${member} messagens apagadas.`)
        }
    }    
}
}catch(err) {
    const emb = embed.get(`Err!`, 1)
    msg.channel.send({ embeds: [emb] });
    msg.delete();

    const channel = client.channels.cache.get('889666042740244510')
    logger.log(`Command: ${msg.content} | Guild: ${msg.guild.id}`, 0)
    channel.send({ embeds: [embed.getwd(`Error`, "Command:```"+msg.content+"```\nError:```"+err+"```", 1)] });}
