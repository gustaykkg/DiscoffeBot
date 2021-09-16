const { client } = require('../index')
const Database = require("../Helpers/Database");
const vt = new Database("Database", "Voice");
const config = require('../config')

const Activites = new Map();
const channel = client.channels.cache.get(config.channels.movs)

client.on('voiceStateUpdate', async (oldState, newState) => {
    if(oldState.member.roles.cache.has(config.roles.movcall) || newState.member.roles.cache.has(config.roles.movcall)){
    if((oldState.member && oldState.member.user.bot) || (newState.member && newState.member.user.bot)) return;
    if(!oldState.channel && newState.channel) {
        console.log('a')
        Activites.set(oldState.id, Date.now());
        channel.send({embeds: [{description: `${newState.member}\nentrou na call <#${newState.channelId}>`, color:newState.member.displayHexColor}]})
    }
    let data;
    if(!Activites.has(oldState.id)){
        data = Date.now();
        Activites.set(oldState.id, data); // checa dado
    }
    
    else
        data = Activites.get(oldState.id);
    let duration = Date.now() - data;
    if(oldState.channel && !newState.channel) { // sai call
        Activites.delete(oldState.id);
        channel.send({embeds: [{description: `${oldState.member}\nsaiu da call <#${oldState.channelId}>`, color:oldState.member.displayHexColor}]})
        vt.add(`stats.${oldState.guild.id}.${oldState.id}.channels.${oldState.channelId}`, duration);
        vt.set(`stats.${oldState.guild.id}.${oldState.id}.activity`, Date.now());
    }
    else if(oldState.channel && newState.channel){ // troca call
        Activites.set(oldState.id, Date.now());
        channel.send({embeds: [{description: `${oldState.member}\nsaiu da call <#${oldState.channelId}>\ne foi para <#${newState.channelId}>`, color:oldState.member.displayHexColor}]})
        vt.add(`stats.${oldState.guild.id}.${oldState.id}.channels.${oldState.channelId}`, duration);
        vt.set(`stats.${oldState.guild.id}.${oldState.id}.activity`, Date.now());
    }
}});
