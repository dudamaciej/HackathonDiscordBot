const { Client } = require(`discord.js`);
const chalk = require('chalk');

const { token } = require("./config.js");

const client = new Client();

const commandHandler = require("./handlers/commandHandler");

commandHandler(client);

client.on('ready', () => {
    console.log(chalk.magentaBright(`Logged in as ${client.user.tag}!`));
});


client.login(token);

//errors handler
client.on("debug", () => {});
client.on("warn", () => {});
client.on("error", () => {});