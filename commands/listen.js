const {SlashCommandBuilder} = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const { getVoiceConnection } = require('@discordjs/voice');
const { VoiceConnectionStatus } = require('@discordjs/voice');
const fs = require("fs")

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
        if (!channel) return interaction.reply({content: `I could not find the channel ${channelName}`, ephemeral: true});
        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
            selfDeaf: false,
        });
        connection.on(VoiceConnectionStatus.Ready, () => {
            console.log('Connection is ready!');
            const user = interaction.user;
            const subscription = connection.subscribe(user, {
                end: {
                  behavior: connection.SubscriptionBehavior.Stop,
                  duration: 10000,
                },
              });
              subscription.on("data", (data) => {
                console.log(data);
              });
        });
        connection.on(VoiceConnectionStatus.Disconnected, () => {
            console.log('Connection disconnected!');
        });

    }
}
