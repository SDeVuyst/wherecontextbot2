const { SlashCommandBuilder } = require('@discordjs/builders');
const jsonData = require('../contexts.json'); 
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const ooc_id = process.env.OUT_OF_CONTEXT_CHANNEL_ID

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Replies with a random Out of Context message!'),

	async execute(interaction) {

		console.log("play triggered");

        // update counter
        fs.readFile("./src/info.json", (err, data) => {
            if (err) throw err;
            let infoData = JSON.parse(data);
            infoData['playCount'] = (infoData['playCount']+1) || 1 ;

            fs.writeFile("./src/info.json", JSON.stringify(infoData), (err) => {
                if (err) throw err;
            });
        });
        
        // get random id from contexts.json
        const values = Object.values(jsonData)
        const tempChosenMessage = values[parseInt(Math.random() * values.length)];
        const id = Object.values(tempChosenMessage)[0];

        // get out of context text channel
        interaction.client.channels.fetch(ooc_id)
            .then (channel =>    
                channel.messages.fetch(id))
                    
                    // create embed with message 
                    .then(message => {
                        let messageAttachment = message.attachments.size > 0 ? Object.values(message.attachments.first())[4] : null
                        const gameEmbed = new MessageEmbed()
                            .setTitle('Out of context game')
                            .setColor('#0099ff')
                            .setURL(message.url)
                            .setDescription(message.cleanContent)
                            .setThumbnail(message.author.avatarURL({ dynamic:true }))
                            .setFooter({ text: `Added by ${Object.values(tempChosenMessage)[1]}`})
                            if (messageAttachment) gameEmbed.setImage(messageAttachment)
                            
                        // send embed
                        interaction.reply({ embeds: [gameEmbed] });

                        })
                        
                    .catch(console.error)
            .catch(console.error);
	}
};
