const { client } = require('../index');
const config = require('../config')

client.on('messageCreate', async message=>{
    if(!message.author.bot && message.guild){
  
      if(message.content.startsWith(config.Prefix)){
          console.log(`${message.author.username}: ${message.content}`)
          let comando = message.content.toLowerCase().split(' ')[0].substr(config.Prefix.length)
          
          switch(comando){

            case 'me':
              let me = require('../cmdActivity/me')
              me.me(message);
              break;

              case 'reset':
              let reset = require('../cmdActivity/reset')
              reset.reset(message);
              break;

              case 'rank':
              let rank = require('../cmdActivity/rank')
              rank.rank(message);
              break;

              case 'ping':
              let ping = require('../cmdFun/ping')
              ping.ping(message);
              break;

              case 'avatar':
              let avatar = require('../cmdFun/avatar')
              avatar.avatar(message);
              break;

              case 'userinfo':
              let userinfo = require('../cmdFun/userinfo')
              userinfo.userinfo(message);
              break;

              case 'cat':
              let cat = require('../cmdFun/cat')
              cat.cat(message);
              break;

              case 'say':
              let say = require('../cmdAdm/say')
              say.say(message);
              break;

              case 'content':
              let content = require('../cmdAdm/content')
              content.content(message);
              break;

              case 'cooldown':
              let cooldown = require('../cmdAdm/cooldown')
              cooldown.cooldown(message);
              break;

              case 'purge':
              let purge = require('../cmdAdm/purge')
              purge.purge(message);
              break;

              case 'edit':
              let edit = require('../cmdAdm/edit')
              edit.edit(message);
              break;

              case 'suggest':
              let suggest = require('../cmdActivity/suggest')
              suggest.suggest(message);
              break;

              case 'tempmute':
              let tempmute = require('../cmdAdm/tempmute')
              tempmute.tempmute(message);
              break;

              case 'unmute':
              let unmute = require('../cmdAdm/unmute')
              unmute.unmute(message);
              break;

            }
          }
        }
    })


