const { MessageEmbed } = require(`discord.js`);

module.exports = {
    name: "bot-info",
    description: "Show informations about the bot.",
    active: true,
    args: false,
    guildOnly: false,
    cooldown: 120,

    run(msg) {
        const botAuthor = `<@256375196120907777>`;
        const botVersion = 'v1.0';
        const embed = new MessageEmbed()
            .setTitle('HackathonBot Info')
            .setColor(0x17CAF0)
            .setDescription("Simple discord bot to help stuff during Hackathon")
            .addField("Author", botAuthor, true)
            .addField("Version", botVersion, true)
        msg.channel.send(embed);
    },
}