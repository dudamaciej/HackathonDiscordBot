const { Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { prefix } = require(__dirname + "/../config.js");
const chalk = require('chalk');

const ascii = require("ascii-table");
const { time } = require("console");

const commandsTable = new ascii().setHeading("Commands", "Active");

module.exports = (client) => {
    client.commands = new Collection();
    const cooldowns = new Collection();
    const commandFiles = readdirSync(__dirname + "/../commands");

    commandFiles.forEach(file => {
        const command = require(__dirname + `/../commands/${file}`);
        client.commands.set(command.name, command);
        commandsTable.addRow(file, command.active);

    });
    console.log(commandsTable.toString());


    client.on('message', (msg) => {

        //Chceck if user is a bot and if message is in private
        if (msg.author.bot) {
            return
        }
        // Ignore commands without prefix
        if (!msg.content.startsWith(prefix)) {
            return
        }

        const args = msg.content
            .slice(prefix.length)
            .trim()
            .split(/ +/g)
        const commandName = args.shift();

        const command = client.commands.get(commandName);
        // Chceck if command can be only used in guild
        if (command.guildOnly && !msg.guild) {
            return
        }
        // Chceck if command Author has role/permissions to use that command
        if (command.role) {

            if (!msg.member.roles.cache.find(r => r.name === command.role)) {
                return
            }
        }
        // Chceck if command needs aditional arguments
        if (command.args && !args.length) {
            let reply = `You didn't provide any arguments,${msg.author}`;

            if (command.usage) {
                reply += `\nThe proper usage would be:\` ${prefix}${commandName} ${command.usage}\``
            }
            msg.channel.send(reply);
        }
        console.log(chalk.yellow(`${msg.author.username} used command: !${commandName}`));

        if (!cooldowns.has(commandName)) {
            cooldowns.set(commandName, new Collection());
        }
        const now = Date.now();
        const timestamps = cooldowns.get(commandName);
        const cooldownAmount = (command.cooldown || 3) * 1000;

        if (timestamps.has(commandName)) {
            const expirationTime = timestamps.get(commandName) + cooldownAmount

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000
                return msg.reply(
                    `please wait ${timeLeft.toFixed(1,)} second(s) before using the \'${commandName}\' command`

                )
            }
        }
        timestamps.set(commandName, now)
        setTimeout(() => {
            timestamps.delete(commandName)
        }, cooldownAmount)

        if (!client.commands.has(commandName)) return
        client.commands.get(commandName).run(msg, args)

    });
}