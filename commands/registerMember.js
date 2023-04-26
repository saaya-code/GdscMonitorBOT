const { SlashCommandBuilder } = require('discord.js');
const CoreTeamMember = require('../db/models/coreTeamMember');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Register yourself as a core team member')
        .addUserOption(option => option.setName('id').setDescription('Your discord id').setRequired(true)),
        async execute(interaction) {
            const userData = interaction.options.getUser("id");
            // for testing purposes only
            const member = new CoreTeamMember({
                name: userData.username,
                id: userData.id,
                // @TODO: add a role picker from user's server roles
                role: "TM",
                isLead: false,
                committeMettingsAttended: 0,
                coreTeamMeatingAttended: 0,
            });
            await member.save();
            await interaction.reply({ content: `Registered <@${interaction.options.getUser("id").id}> succesfully!👍`, ephemeral: false});

        }
    }