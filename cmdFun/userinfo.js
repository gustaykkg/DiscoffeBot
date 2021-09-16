const { MessageEmbed } = require('discord.js');
const { TrimMsg } = require('../events/funcoes');


module.exports={userinfo}

    async function userinfo(msg){
        const embed = new MessageEmbed()
        embed.setDescription(`⠀`)
        
        let msgArgs = TrimMsg(msg)
        let userid = ""

        if (msg.mentions.members.first()){
            userid =  msg.mentions.members.first().user.id
        }else if( !msgArgs[1] || !msgArgs[1].match(/[0-9]/g) ){
            userid = msg.author.id
        }else if(msgArgs[1].match(/[0-9]/g)){
            userid = msgArgs[1]
        }
        try{
            var member = await msg.guild.members.fetch({user:userid, force: false})
        }catch{
            return msg.channel.send(msg.author.toString() + " Usuario desconhecido")
        }
        embed.setColor(member.displayHexColor)
        if(!member) member = msg.member
        embed.setTitle(member.user.username )
        


        embed.setThumbnail(member.user.displayAvatarURL())
        embed.setFooter(`id: ${member.id}`)

        let date = new Date(Date.now() - member.joinedAt )
        let date_duration = new Date(Date.now() - new Date(member.user.createdTimestamp))

        let joined_duration = format_date_created(date)
        let joined_since = format_date(member.joinedAt )
        let created_since = format_date(new Date(member.user.createdTimestamp))
        let created_duration = format_date_created(date_duration)

        embed.addField('🛎Entrada:', joined_since + `(${joined_duration})`, true)
        embed.addField('🚪Criada em:', created_since + `(${created_duration})`, true)

        msg.channel.send({content: msg.author.toString(),embeds:[embed]})

    }


function format_user(member){

    let description = `${member.user.tag}`
    
    let date = Date.now() - member.joinedAt 
    let joined_at = format_date_created(new Date(date))

    description += '\nEntrou a: '+ joined_at
    description += ''
    return description
    
}

function format_date_created(date){
    
    let date_formated = []

        
    if(date.getMinutes()) date_formated.push(date.getMinutes()+`m `)
    if(date.getHours()) date_formated.push(date.getHours()+ `h `)
    if(date.getDay()) date_formated.push(date.getDay()+ `${(!(date.getDay() == 1)) ? " dias " : " dia "}`)
    if(date.getMonth()) date_formated.push(date.getMonth()+ `${(!(date.getMonth() == 1)) ? " meses " : " mês "}`)
    if(date.getFullYear() - 1970) date_formated.push(date.getFullYear()- 1970+`${(!(date.getFullYear()- 1970 == 1)) ? " anos " : " ano "}`)  

    return date_formated.reverse().join('');
}

function format_date(date){
    
    let date_formated = []


    if(date.getMinutes()) date_formated.push(date.getMinutes()+`m `)
    if(date.getHours()) date_formated.push(date.getHours() + `h `)
    if(date.getFullYear()) date_formated.push(date.getFullYear()+", as ")
    if(date.getMonth()+1) date_formated.push(date.getMonth()+1+ "/")
    if(date.getDay()) date_formated.push(date.getDay()+ "/")


    return date_formated.reverse().join('');
}