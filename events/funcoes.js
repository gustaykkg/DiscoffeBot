module.exports={TrimMsg}

function TrimMsg(message){

    return message.content.split(/\n| /gm).filter((str) => str.trim())

}