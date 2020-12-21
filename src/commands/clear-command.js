module.exports = {
    name: "clear",
    description: "Delete messages in channel.",
    active: true,
    args: true,
    guildOlny: true,
    usage: '<amount>',
    cooldown: 3,
    role: 'ADMIN',


    run(msg, args) {
        const amount = parseInt(args[0]);

        if (!Number.isInteger(amount)) {
            return;
        }
        msg.channel.bulkDelete(amount);
    },
}