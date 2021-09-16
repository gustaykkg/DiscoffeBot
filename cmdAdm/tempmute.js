const {client} = require('../index')
const config = require('../config')
const {TrimMsg} = require("../events/funcoes");
const {MessageEmbed} = require('discord.js')

module.exports = {tempmute};
function tempmute(msg, args) {
	//variaveis
    if(!msg.member.permissions.has('MUTE_MEMBERS')) return 
    

		var muterolename = 'Muted'
		var muteRole = msg.guild.roles.cache.find(r => r.name === muterolename); 
		var args = TrimMsg(msg)
		var minutes = args[2];
		var muteReason = (args[3]) ? msg.content.substring(args.slice(0, 3).join(" ").length + 1) : "Sem motivo"
		var muteUser = msg.mentions.members.first() || msg.guild.members.cache.get(args[1]);

	//condições
		if (!muteUser) return msg.reply("Você deve mencionar um usuario valido")
		if(!muteUser||muteUser.roles.highest.position>=msg.member.roles.highest.position) return msg.channel.send("Erro ao mutar o membro")
			if (!muteRole) return msg.reply("Cargo não encontrado" + muterolename);
		if (!muteReason) var muteReason = "Nenhuma razão foi passada"; 
	
	//mensagem mute
	var channel = client.channels.cache.get(config.channels.modlog)
		var muteEmbed = new MessageEmbed()
		muteEmbed.setColor(config.color.err)
		muteEmbed.setTitle(`Mutado`)
		muteEmbed.setDescription(`Usuario mutado: ${muteUser}\nRazão: ${muteReason})\nMinutos: ${minutes}`)
		muteEmbed.setFooter(`Mutado por: ${msg.author.tag}`)
		muteEmbed.setTimestamp();
		muteUser.send(`Voce foi mutado por ${minutes} minutos, pelo motivo ${muteReason}`).catch(console.error)
		  msg.channel.send({ embeds: [muteEmbed] })
		  channel.send({ embeds: [muteEmbed] })
		  console.log(`${muteUser} mutado`)
		  muteUser.roles.add(muteRole, `Mutado por ${msg.author.tag} por ${minutes} minutos. Razão: ${muteReason}`); //adiciona cargo mutado
		  timeout(minutes, muteUser, muteRole, msg)
	}
	
//mensagem desmute	
	function timeout(minutes, muteUser, muteRole, msg) {
		if (muteUser.roles.cache.has(config.roles.muted)){
		setTimeout(() => {
		muteUser.roles.remove(muteRole, `Mute temporario expirado.`); //retira cargo mute
	var channel = client.channels.cache.get(config.channels.modlog)
		var muteEmbed = new MessageEmbed()
		muteEmbed.setColor(config.color.sucess)
		muteEmbed.setTitle("Desmutado")
		muteEmbed.setDescription(`Usuario desmutado ${muteUser}\nRazão: Tempo acabou.`)
		muteEmbed.setFooter(`Desmutado por Discoffee Bot`)
		muteEmbed.setTimestamp();
		msg.channel.send({ embeds: [muteEmbed] })
		channel.send({ embeds: [muteEmbed] })
		muteUser.send('Você foi desmutado, por que o tempo acabou.').catch(console.error)
		console.log(`${muteUser} desmutado`)
	  }, minutes * 60000);
	}

}	



