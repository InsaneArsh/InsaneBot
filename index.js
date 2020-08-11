const Discord = require('discord.js');
const bot = new Discord.Client();
const ytdl = require("ytdl-core");

const PREFIX = '=';

var servers = {};
var version = '1.0.0'
var specs = 'CPU: i3 9100F \nGPU: GTX 1650 \nRAM: 8GB*1 \nKeyboard: Redgear Canyon \nMouse: Itna bhi ameer nhi hu'

bot.on('ready', () =>{
    console.log('This Bot is online!');
    bot.user.setActivity("with ur lives", {type: "PLAYING"});
})

bot.on('message', message=>{
    
    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]){

        case 'ping':
            message.channel.send('pong!')
            break;

    case 'hello':
        message.channel.send('Hey there!')
        break;

    case 'kise_scam':
        message.channel.send('Tarun Baba Ko!')
        break;

    case 'help':
        message.channel.send('Commands: ping, Hello, Kise_Scam')
        break;

    case 'youtube':
        message.channel.send('https://www.youtube.com/InsaneArsh')
        break;

    case 'insta':
        message.channel.send('https://www.instagram.com/imarsh.insane')
        break;

    case 'twitter':
            message.channel.send('https://www.twitter.com/InsaneArsh')
            break;

    case 'rules':
            message.channel.send('Kindly check out server-rules text channel!')
            break;

    case 'specs':
            message.channel.send(specs)
            break;

    case 'clear':
        if(!args[1]) return message.reply('Error! Please Specify the number of messages you would like to delete.')  
        message.channel.bulkDelete(args[1]);
        break;

        case 'myinfo':
                const embed = new Discord.MessageEmbed()
                .setTitle('User Info')
                .addField('Player Name', message.author.username)
                .addField('Version', version)
                .addField('Current Server', message.guild.name)
                .setColor(0xF1C40F)
                .setThumbnail(message.author.avatarURL())
                message.channel.send(embed);
            break;
            //myinfo command is use to display the user his info.
            //botinfo is a jugaad to get the bot's info.
            case 'botinfo':
                message.channel.send('=myinfo')
                break;

            case 'goli':
                message.channel.send('/tts Goli Khaoge Goli?')
                break;



            case 'play':

            function play(connection, message){
                var server = servers[message.guild.id];
                server.dispatcher = connection.play(ytdl(server.queue[0], {filter: "audioonly"}));
                server.queue.shift();
                server.dispatcher.on("finish", function(){
                    if(server.queue[0]){
                        play(connection, message);
                    }else {
                        connection.disconnect();
                    }
                });


            }
            let validate = ytdl.validateURL(args[1]);
            if (!validate){
                message.channel.send("Needs to be a URL!");
                return;
            }


                if(!args[1]){
                    message.channel.send("Kindly provide a YouTube link!");
                    return;
                }
                
                if(!message.member.voice.channel){
                    message.channel.send("You must be in a Voice Channel!");
                    return;
                }

                if(!servers[message.guild.id]) servers[message.guild.id] = {
                        queue: []
                }

                
            
                var server = servers[message.guild.id];

                server.queue.push(args[1]);

                if(!message.guild.voiceConnection) message.member.voice.channel.join().then(function(connection){
                    play(connection, message);
                })


                break;

                case 'skip':
                    var server = servers[message.guild.id];

                    if(server.dispatcher) server.dispatcher.end();

                    message.channel.send("Skipping the song!")
                    break;

                case 'stop':
                    var server = servers[message.guild.id];
                    if(message.guild.voice.connection){
                        for(var i = server.queue.length -1; i >=0; i--){
                            server.queue.splice(i, 1);
                        }
                        
                        server.dispatcher.end();
                        message.channel.send("Ending the queue. Leaving the Voice Channel!")
                        console.log('stopped the queue')
                    }

                    if(message.guild.connection) message.guild.voiceChannel.disconnect();

                        break;

                    

        


    }
        


})

bot.login(process.env.TOKEN);