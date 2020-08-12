module.exports = {
    name: 'clear',
    description: 'clears specified no. of messages',
    execute(message, args){

        if(!args[1]) return message.reply('Error! Please Specify the number of messages you would like to delete.')  
        message.channel.bulkDelete(args[1]);

    }
}