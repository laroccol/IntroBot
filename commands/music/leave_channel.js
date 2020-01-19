const commando = require('discord.js-commando');

class LeaveChannelCommand extends commando.Command
{
    constructor(client)
    {
        super(client, {
            name: 'leave', 
            group: 'music',
            memberName: 'leave',
            description: 'Leaves the voice channel'
        });
    }
    
    async run(message, args)
    {
        message.delete(0)
            .then(msg => console.log('Deleted message'))
            .catch(console.error);
        
        if (message.guild.voiceConnection)
        {
            message.guild.voiceConnection.disconnect();
        }
        else
        {
            message.reply("I am not in a channel");
        }
      
    }
}

module.exports = LeaveChannelCommand;