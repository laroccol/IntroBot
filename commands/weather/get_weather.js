 const commando = require('discord.js-commando');
 const weather = require('weather-js');
 const Discord = require('discord.js')

class WeatherCommand extends commando.Command
{
    constructor(client)
    {
        super(client, {
            name: 'weather', 
            group: 'weather',
            memberName: 'weather',
            description: 'Gets the weather'
        });
    }
    
    async run(message, args)
    {
        weather.find({search: args, degreeType: 'F'}, function(err, result) {
            if (err) message.channel.send(err);
            
            if (result.length === 0) {
                message.channel.send('**Please enter a valid location.**')
            }
            
            var current = result[0].current;
            var forecast = result[0].forecast;
            var location = result[0].location;
            
            const currentEmbed = new Discord.RichEmbed()
                .setDescription(`**${current.skytext}**`)
                .setAuthor(`Weather for ${current.observationpoint}`)
                .setThumbnail(current.imageUrl)
                .setColor(0x00AE86)
                .addField('Timezone', `UTC${location.timezone}`, true)
                .addField('Temperature', `${current.temperature} Degrees F`, true)
                .addField('Feels Like', `${current.feelslike} Degrees F`, true)
                .addField('Winds', current.winddisplay, true)
                .addField('Humidity', `${current.humidity}%`, true)
                
            const forecastEmbed1 = new Discord.RichEmbed()
                .setTitle(`**${forecast[1].day}**`)
                .setDescription(`**Date** : ${forecast[1].date}`)
                .setColor(0x00AE86)
                .addField(`**Low**`, `${forecast[1].low} Degrees F`, true)
                .addField(`**High**`, `${forecast[1].high} Degrees F`, true)
                .addField(`**Conditions**`, forecast[1].skytextday, true)
                .addField(`**Precipitation**`, `${forecast[1].precip}%`, true)
                
            const forecastEmbed2 = new Discord.RichEmbed()
                .setTitle(`**${forecast[2].day}**`)
                .setDescription(`**Date** : ${forecast[2].date}`)
                .setColor(0x00AE86)
                .addField(`**Low**`, `${forecast[2].low} Degrees F`, true)
                .addField(`**High**`, `${forecast[2].high} Degrees F`, true)
                .addField(`**Conditions**`, forecast[2].skytextday, true)
                .addField(`**Precipitation**`, `${forecast[2].precip}%`, true)
                
            const forecastEmbed3 = new Discord.RichEmbed()
                .setTitle(`**${forecast[3].day}**`)
                .setDescription(`**Date** : ${forecast[3].date}`)
                .setColor(0x00AE86)
                .addField(`**Low**`, `${forecast[3].low} Degrees F`, true)
                .addField(`**High**`, `${forecast[3].high} Degrees F`, true)
                .addField(`**Conditions**`, forecast[3].skytextday, true)
                .addField(`**Precipitation**`, `${forecast[3].precip}%`, true)
                
            const forecastEmbed4 = new Discord.RichEmbed()
                .setTitle(`**${forecast[4].day}**`)
                .setDescription(`**Date** : ${forecast[4].date}`)
                .setColor(0x00AE86)
                .addField(`**Low**`, `${forecast[4].low} Degrees F`, true)
                .addField(`**High**`, `${forecast[4].high} Degrees F`, true)
                .addField(`**Conditions**`, forecast[4].skytextday, true)
                .addField(`**Precipitation**`, `${forecast[4].precip}%`, true)

                message.channel.send(currentEmbed);
                message.channel.send(forecastEmbed1);
                message.channel.send(forecastEmbed2);
                message.channel.send(forecastEmbed3);
                message.channel.send(forecastEmbed4);
        });
    }
}

module.exports = WeatherCommand;