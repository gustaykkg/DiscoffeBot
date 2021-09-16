const { MessageEmbed } = require('discord.js');
const axios = require('axios').default
const config = require('../config')

const api = axios.create({
  baseURL: 'https://api.thecatapi.com/v1',
  timeout: 1000,
})

const titles = [
  'Lindo gatinho',
  'Meow!',
  'Me de comida.',
  'Aproveitando bem o dia!',
  'Sim.',
  'A mimir?',
  'Diga oi a cat',
  'Amo a saycat meow',
  'Aqui é um lugar onde me reuno com meus outros amigos gatos',
  'Essa saycat é a coisinha mais perfeita do mundo',
  'Tenho total adimiração pela equipe do server'
]

function randomTitle() {
  if (titles.length === 0) { return undefined }
  const index = Math.floor(Math.random() * titles.length)
  return titles[index]
}

module.exports = {cat}
    async function cat(message){
    try {
      const response = await api.get('images/search')
      const embed = new MessageEmbed()
        .setAuthor(randomTitle() + ' 🐱')
        .setImage(response.data[0].url)
        .setColor(config.color.purple)
        .setFooter('2021 © Discoffee')
        .setTimestamp()
      message.channel.send({embeds: [embed]})
    } catch (error) {
      message.reply('Estou tendo muitas solicitações para ver gatinho, aguarde um pouco. 😔')
    }
  }