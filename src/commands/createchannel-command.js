module.exports = {
    name: "create-channel",
    description: "Create new channels.",
    active: true,
    args: true,
    guildOnly: true,
    usage: '<channelName> <channelType>',
    cooldown: 10,
    role: 'ADMIN',


    run(msg, args) {
        const channelName = args[0];
        const channelType = args[1];
        msg.guild.channels.create(channelName, { type: channelType });
        console.log(channelName, channelType)
    },
}