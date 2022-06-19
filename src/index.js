require('dotenv').config();

const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents } = require('discord.js');
const { cp } = require('node:fs');
const token = process.env.TOKEN


const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS
    ]
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

client.once("ready", () => {
    console.log("online...")
    client.user.setActivity('Send suggestions for bot to solos')
});

client.on('interactionCreate', async interaction => {

    // all about selection menus
    if (interaction.isSelectMenu()) {
        
        // react command 
        if (interaction.customId === 'selectreaction') {
            const attachment = `./src/reactions/${interaction.values[0]}`;

            await interaction.update({ content: "Sent reaction!", components: [], ephemeral: true });
            await interaction.followUp({ content: `Sent by ${interaction.member}`, components: [], files: [{ attachment: attachment}], ephemeral: false });

            return;
        }
    }


    // all about commands 
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});


client.login(token);