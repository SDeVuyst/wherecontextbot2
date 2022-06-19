const { SlashCommandBuilder } = require('@discordjs/builders');
const jsonData = require('../contexts.json'); 
const fs = require('fs');
const ooc_id = process.env.OUT_OF_CONTEXT_CHANNEL_ID

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add')   
        .addStringOption(option => 
            option.setName("message_id")
            .setDescription("Right click on your message, click copy ID and enter it here.")
            .setRequired(true))

        .setDescription('Adds message to the Out Of Context database!'),         
        
	async execute(interaction) {
        console.log("add triggered");

        // update counter
        fs.readFile("./src/info.json", (err, data) => {
            if (err) throw err;
            let infoData = JSON.parse(data);
            infoData['addCount'] = (infoData['addCount']+1) || 1 ;

            fs.writeFile("./src/info.json", JSON.stringify(infoData), (err) => {
                if (err) throw err;
            });
        });


        // interaction can only be done in out of context channel
        if (interaction.channelId === ooc_id) {
            // get message ID and check if it is valid.
            const input = interaction.options.getString('message_id');
            console.log(input);

            if (!isNaN(input) && input.length == 18) {

                // check if message is already in db
                if (already_in_db(input)) {
                    await interaction.reply("Already in database.")
                } else {

                    addToContexts(input, interaction.member.user.username);

                    await interaction.reply(`Added Message with id: ${input}!`);
                }
                
            } else {
                await interaction.reply("Please enter a valid ID.");
            }
        } else {
            await interaction.reply(`this command can only be done in <#${ooc_id}>.`)
        }
        
	},
};


// Checks if certain id is already in database | returns true or false
function already_in_db(id_to_check) {
    for (var index = 0; index < jsonData.length; ++index) {
        var currentid = jsonData[index]["id"]
        if (currentid === id_to_check) {
            return true;
        }
    }
    return false;
};


// Adds message to contexts.json 
function addToContexts (id, author) {
    newData = {
        "id": id,
        "added_by": author
    }

    fs.readFile('./src/contexts.json', function (err, data) {
        if (err) throw err;
        var json = JSON.parse(data);
        json.push(newData);    
        fs.writeFile("./src/contexts.json", JSON.stringify(json), function(err){
          if (err) throw err;
          console.log('The "data to append" was appended to file!');
        });
    })

    return;
};