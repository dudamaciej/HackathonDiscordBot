const { Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { prefix } = require(__dirname + "/../config.js");
const chalk = require('chalk');

const ascii = require("ascii-table");

const commandsTable = new ascii().setHeading("Commands", "Active");

module.exports = (client) => {
    client.commands = new Collection();

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

        if (command.guildOnly && !guild) {
            return
        }

        if (command.args && !args.length) {
            let reply = `You didn't provide any arguments,${msg.author}`;

            if (command.usage) {
                reply += `\nThe proper usage would be:\` ${prefix}${commandName} ${command.usage}\``
            }
            msg.channel.send(reply);
        }
        console.log(chalk.yellow(`${msg.author.username} used command: !${commandName}`));


        if (!client.commands.has(commandName)) return
        client.commands.get(commandName).run(msg, args)

    });
}