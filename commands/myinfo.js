module.exports = {
    name: 'myinfo',
    description: 'embeds user info',
    execute(message, args){
        const embed = new Discord.MessageEmbed()
        .setTitle('User Info')
        .addField('Player Name', message.author.username)
        .addField('Version', version)
        .addField('Current Server', message.guild.name)
        .setColor(0xF1C40F)
        .setThumbnail(message.author.avatarURL())
        message.channel.send(embed);
    }
    
}