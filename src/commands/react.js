const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('react')   
        .setDescription('Replies with a reaction meme!'),         

	async execute(interaction) {
        console.log("react triggered");

        // update counter
        fs.readFile("./src/info.json", (err, data) => {
            if (err) throw err;
            let infoData = JSON.parse(data);
            infoData['reactCount'] = (infoData['reactCount']+1) || 1 ;

            fs.writeFile("./src/info.json", JSON.stringify(infoData), (err) => {
                if (err) throw err;
            });
        });

        // create option selector
        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('selectreaction')
                .setPlaceholder('Nothing Selected')
                .addOptions([

                    {
                        label: 'Damn bro you got the whole squad laughing',
                        description: "Sends the 'Damn bro you got the whole squad laughing' meme.",
                        value: 'laughing1.jpg',
                    },
                    {
                        label: 'not funny, just fucked up',
                        description: "Sends the 'Bro that wasn't even funny, that was just fucked up' meme.",
                        value: 'notfunny.jpg',
                    },
                    {
                        label: 'sike u thought',
                        description: "Sends the 'Sike u thought nigga' meme.",
                        value: 'uthought.jpg',
                    },
                    {
                        label: 'Looking for a boyfriend',
                        description: "Sends the 'Astolfo looking for a boyfriend' meme.",
                        value:'astolfo.mp4',
                    },
                    {
                        label: 'Oh no, Cringe',
                        description: "Sends the 'oh no, cringe' meme.",
                        value: 'cringe.mp4',
                    },
                    {
                        label: 'Gibble',
                        description: "Sends the 'smikkel gibble' meme.",
                        value: 'gibble.jpg',
                    },
                    {
                        label: 'Pingy',
                        description: "Pingy.",
                        value: 'pingy.mp4',
                    },
                    {
                        label: 'Fuck u say?',
                        description: "Sends the 'fuck u say' meme.",
                        value: 'fukusay.jpg',
                    },
                    {
                        label: 'No bitches?',
                        description: "Sends the 'No bitches?' meme.",
                        value: 'nobitches.jpg',
                    },
                    {
                        label: 'Left on seen',
                        description: "Sends the 'You accidentally left me on seen' meme.",
                        value: 'leftonseen.jpg',
                    },
                    {
                        label: 'Ow ow ow -ow',
                        description: "Sends the 'Peter owowow' meme.",
                        value: 'owowow.mp4',
                    },
                    {
                        label: 'Wut',
                        description: "Sends the 'Richard Hammond Wut' meme.",
                        value: 'wut.jpg',
                    },
                    {
                        label: 'Vibing to Payphone',
                        description: "Sends the 'Shut up, I'm vibing to payphone' meme.",
                        value: 'payphone.mp4',
                    },
                    {
                        label: 'Chinok World',
                        description: "Sends the 'Welcome to the rice fields' meme.",
                        value: 'chinok_world.mp4',
                    },
                ])
        )
		await interaction.reply({ content:'Please select a reaction', components: [row], ephemeral: true });
	},
};
