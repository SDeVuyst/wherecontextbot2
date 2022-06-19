const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const jsonData = require('../contexts.json'); 

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Replies with info about the bot!'),

	async execute(interaction) {
		console.log("info triggered");

        fs.readFile("./src/info.json", (err, data) => {
            if (err) throw err;
            let infoData = JSON.parse(data);

            //update counter
            infoData['infoCount'] = (infoData['infoCount']+1) || 1 ;

            fs.writeFile("./src/info.json", JSON.stringify(infoData), (err) => {
                if (err) throw err;
            });
            
            // creation of embed
            const gameEmbed = new MessageEmbed()
                            .setTitle('Info')
                            .setURL('https://github.com/SDeVuyst')
                            .setDescription('All about the Where Context Bot V2!')
                            .setColor('#0099ff')
                            .setThumbnail('https://static.wikia.nocookie.net/w__/images/5/52/HEYimHeroic_3DS_FACE-024_Matt-Wii.JPG/revision/latest?cb=20200705094326&path-prefix=wiisports')
                            .addFields(
                                { name: 'Commands', value: '** **' },
                                { name: '/add', value: 'type /add, followed with the ID of the message you want to add. The ID can be found by right clicking a message and selecting "Copy ID" example ID: 987931357822976032', inline: true },
		                        { name: '/play', value: 'type /play and a message will be sent containing a random message from Out Of Context.', inline: true },
                                { name: '/react', value: 'type /react and hit send. You will now be able to select a reaction meme. The meme will be sent by the bot, visible for everyone.', inline: true },
                            )
                            .addField('\u200B', '\u200B', false)
                            .addFields(
                                { name: 'Command Count', value: "** **" },
                                { name: '/play', value: `/play has been called ${infoData.playCount} times!`, inline: true },
                                { name: '/add', value: `/add has been called ${infoData.addCount} times!`, inline: true },
                                { name: '/react', value: `/react has been called ${infoData.reactCount} times!`, inline: true },
                                { name: '/info', value: `/info has been called ${infoData.infoCount} times!`, inline: true },
                                { name: 'Total', value: `The bot has been called a total of ${infoData.infoCount + infoData.addCount + infoData.playCount + infoData.reactCount } times!`, inline: true },
                                { name: 'Messages in Out of Context', value: `there are ${jsonData.length} messages saved!`, inline: true },
                            )

            // send embed
            interaction.reply({ embeds: [gameEmbed] });
        });

    }
};