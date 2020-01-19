const commando = require('discord.js-commando');

class DiceRollCommand extends commando.Command
{
    constructor(client)
    {
        super(client, {
            name: 'roll', 
            group: 'simple',
            memberName: 'roll',
            description: 'Rolls dice'
        });
    }
    
    async run(message, args)
    {
        var diceRoll = Math.floor(Math.random() * 6) + 1;
        message.reply(diceRoll);
    }
}

module.exports = DiceRollCommand;