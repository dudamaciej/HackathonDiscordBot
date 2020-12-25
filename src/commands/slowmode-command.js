module.exports = {
    name: "slowmode",
    description: "Prevents sending many msgs in short time.",
    active: true,
    args: true,
    guildOnly: true,
    usage: '<on/off>',
    cooldown: 10,
    role: 'ADMIN',


    run(msg, args) {
        const commandMode = args[0];

        if (commandMode == 'on') {
            msg.channel.setRateLimitPerUser(30, "reason");
        } else if (commandMode == 'off') {
            msg.channel.setRateLimitPerUser(0, "reason");
        }

    },
}