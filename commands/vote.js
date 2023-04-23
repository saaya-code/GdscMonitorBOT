const { SlashCommandBuilder } = require('@discordjs/builders');
const { Options, EmbedBuilder } = require('discord.js');
const data = new SlashCommandBuilder()
.setName('vote')
.setDescription('Can\'t decide? Let the community decide for you!')
.addStringOption(option =>
    option.setName('title')
        .setDescription('Enter a title for your poll.')
        .setRequired(true))
.addStringOption(option =>
    option.setName('option1')
        .setDescription('Enter your first option')
        .setRequired(true))
.addStringOption(option =>
    option.setName('option2')
        .setDescription('Enter your second option')
        .setRequired(true))
for(i = 0; i < 5; i++) {
    data.addStringOption(option =>
        option.setName('option'+(i+3).toString())
            .setDescription('Enter your next option')
            .setRequired(false))
}

module.exports = {
    data: data,
    async execute(interaction) {
        console.log(interaction.options.getString('title'));
        const title = interaction.options.getString('title');
        const optionsNumbers = interaction.options._hoistedOptions - 1;
        const options = [];
        for(i = 0; i < optionsNumbers; i++) {
            options.push(interaction.options.getString('option'+(i+1).toString()));
        }
        const embed = new EmbedBuilder()
            .setTitle(title)
            .setDescription('Click with the corresponding Button to vote!')
            .setColor('#0099ff')
            .setTimestamp()
        for(i = 0; i < optionsNumbers; i++) {
            embed.addFields({name:options[i], value:'0', inline:true});
        }
        const message = await interaction.reply({ embeds: [embed], fetchReply: true });
        
    }
};


        