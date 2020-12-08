module.exports = {
    name: "clear",
    description: "Delete messages in channel.",
    active: true,
    args: true,
    guildOlny: true,
    usage: '<amount>',


    run(msg, args) {
        const amount = parseInt(args[0]);

        if (!Number.isInteger(amount)) {
            return;
        }
        msg.channel.bulkDelete(amount);
    },
}