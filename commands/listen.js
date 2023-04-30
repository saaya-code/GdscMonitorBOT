const {SlashCommandBuilder} = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const { getVoiceConnection } = require('@discordjs/voice');
const { VoiceConnectionStatus } = require('@discordjs/voice');

const data = new SlashCommandBuilder()
    .setName('join')
    .setDescription('Join a voice chat')
    .addStringOption(option =>
        option.setName('channel')
            .setDescription('Enter the name of the voice channel you want to join')
            .setRequired(true))
module.exports = {
    data: data,
    async execute(interaction) {
        const channelName = interaction.options.getString('channel') || interaction.member.voice.channel.name;
        const channel = interaction.guild.channels.cache.find(channel => channel.name === channelName);
        if (channel) {
            const connected = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            });

            
        } else {
            await interaction.reply({content: `Channel ${channelName} not found`, ephemeral: true});
        }
        const connection = getVoiceConnection(channel.guild.id);
        connection.on(VoiceConnectionStatus.Ready, () => {
            console.log('The connection has entered the Ready state - ready to play audio!');
        });

    }
}
