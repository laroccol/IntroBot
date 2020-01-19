const commando = require('discord.js-commando');
const db = require('quick.db')

class SetIntroSongCommand extends commando.Command
{
    constructor(client)
    {
        super(client, {
            name: 'set', 
            group: 'music',
            memberName: 'set',
            description: 'Sets your intro song'
        });
    }
    
    async run(message, args)
    {      
        message.delete(0)
            .then(msg => console.log('Deleted message'))
            .catch(console.error);
            
        db.set(message.member.id, {name : args});
        let songURL = db.get(`${message.author.id}.name`);
        message.reply("Intro Song Set To: " + songURL);
    }
}

module.exports = SetIntroSongCommand;