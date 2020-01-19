const commando = require('discord.js-commando');
const YTDL = require('ytdl-core');

class SkipSongCommand extends commando.Command
{
    constructor(client)
    {
        super(client, {
            name: 'skip', 
            group: 'music',
            memberName: 'skip',
            description: 'skip a song from the player'
        });
    }
    
    async run(message, args)
    {
        server.dispatcher
    }
}

module.exports = SkipSongCommand;