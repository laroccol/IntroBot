const Commando = require('discord.js-commando');
const YTDL = require('ytdl-core');
const db = require('quick.db')
const bot = new Commando.Client();
const TOKEN = 'NjI3NTYwNjU5OTIzNjMyMTM4.XY-bjg.zpSh5G4oAvuldu5hXXKo3qwa0zY'

bot.registry.registerGroup('simple', 'Simple');
bot.registry.registerGroup('music', 'Music');
bot.registry.registerGroup('weather', 'Weather');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');

global.servers = {};

function stopPlayer(member)
{
    if (member.voiceChannel)
    {
        member.voiceChannel.leave();
    }
}

bot.on('message', function(message) {
    if (message.content == 'Hello')
    {
        message.channel.send('Hello ' + message.author + ' how are you?');
    }
});

bot.on('ready', function() {
    
    let allUsers = bot.users.array();
    for (let i = 0; i < allUsers.length; i++)
    {
        if (db.get(allUsers[i].id) == null)
        {
            db.set(allUsers[i].id, {name : 'https://www.youtube.com/watch?v=DhlPAj38rHc'});
        }
    }
    console.log("Ready");
});

bot.on('voiceStateUpdate', (oldMember, newMember) => {
    let newUserChannel = newMember.voiceChannel;
    let oldUserChannel = oldMember.voiceChannel;
    
    let userIntroSong = db.get(`${newMember.id}.name`);
    
    if (YTDL.validateURL(userIntroSong) && !newMember.user.bot)
    {
        if (oldUserChannel === undefined && newUserChannel !== undefined) 
        {           
            const voiceChannel = newMember.voiceChannel;
            
            voiceChannel.join();
    
            let connection = newMember.guild.voiceConnection.channel.connection
            
            let streamOptions = { volume: 1};
            
            if (userIntroSong.includes('?t='))
            {
                startIndex = parseInt(userIntroSong.substr(userIntroSong.lastIndexOf('?t=') + 3));
                console.log(startIndex);
                streamOptions = { seek: startIndex, volume: 1};
            }
                        
            const dispatcher = connection.playStream(YTDL(userIntroSong), streamOptions)
                    .on('end', () => {
                        console.log('song ended!');
                        voiceChannel.leave();
                    })
                    .on('error', error => {
                        console.error(error);
                    });
                
            setTimeout(stopPlayer, 20000, newMember); 
                                
        }
        else if(newUserChannel === undefined)
        {

            // User leaves a voice channel
            

        }
    }
    
});

bot.on('guildMemberAdd', member => {
    if (isNull(db.get(member.id)))
    {
        db.set(member.id, {name : 'https://www.youtube.com/watch?v=DhlPAj38rHc'});
    }
});

bot.login(TOKEN);