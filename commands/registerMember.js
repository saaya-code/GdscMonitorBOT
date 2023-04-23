const { SlashCommandBuilder } = require('discord.js');
const CoreTeamMember = require('../db/models/coreTeamMember');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Register yourself as a core team member')
        .addUserOption(option => option.setName('id').setDescription('Your discord id').setRequired(true)),
        async execute(interaction) {
            const userData = interaction.options.getUser("id");
            const memberData = interaction.guild.members.cache.get(userData.id);
            const role = memberData.roles.cache.find(role => role.name === "TM" || role.name === "MKT" || role.name === "EER");
            console.log(userData)
            const member = new CoreTeamMember({
                name: userData.username,
                id: userData.id,
                role: role.name,
                isLead: false,
                committeMettingsAttended: 0,
                coreTeamMeatingAttended: 0,
            });
            await member.save();
            await interaction.reply({ content: `Registered <@${interaction.options.getUser("id").id}> succesfully!👍`, ephemeral: true});
        }
    }