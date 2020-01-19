const commando = require('discord.js-commando');
const YTDL = require('ytdl-core');

function Play(connection, message)
{
    var server = servers[message.member.guild.id];
    if (YTDL.validateURL(server.queue[0]))
    {
        server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
        server.queue.shift();
        server.dispatcher.on("end", function() {
            if (server.queue[0])
            {
                Play(connection, message);
            }
            else
            {
                connection.disconnect();
            }          
        
        })
    }
    else
    {
        server.queue.shift();
    }
}

class PlaySongCommand extends commando.Command
{
    constructor(client)
    {
        super(client, {
            name: 'play', 
            group: 'music',
            memberName: 'play',
            description: 'Play a song from a youtube url'
        });
    }
    
    async run(message, args)
    {
        message.delete(0)
            .then(msg => console.log('Deleted message'))
            .catch(console.error);
            
        if (YTDL.validateURL(args))
        {
            
            if (!message.guild.voiceConnection)
            {
                if (!servers[message.guild.id])
                {
                    servers[message.guild.id] = {queue: []}
                }
           
                message.member.voiceChannel.join()
                    .then(connection => {
                        var server = servers[message.guild.id];
                        message.reply("Successfully Joined!");
                        server.queue.push(args);
                        if (server.dispatcher == null)
                        {
                            Play(connection, message);
                        }
                    })
            }
            else
            {
                if (!servers[message.guild.id])
                {
                    servers[message.guild.id] = {queue: []}
                }
            
                var server = servers[message.guild.id];
                server.queue.push(args);
                if (server.dispatcher == null)
                {
                    Play(message.guild.voiceConnection.channel.connection, message);
                }
            }
        
        }
          
    }
}

module.exports = PlaySongCommand;