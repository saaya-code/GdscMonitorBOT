const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
        async execute(interaction) {
            await interaction.reply({ content: 'Slash commands cringe ngl', ephemeral: true });
            await interaction.followUp({ content: 'follow up cringe too', ephemeral: true });
    }
};