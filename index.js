require("dotenv").config();

const Discord = require("discord.js");
const fs = require("fs");

const client = new Discord.Client();

client.settings = require("./settings");

// Gestion des évènements
fs.readdir("./events/", (err, files) => {
	if (err) return console.error(err);

	files.forEach((file) => {
		let eventFile = require(`./events/${file}`);

		client.on(file.split(".")[0], (...args) => eventFile.run(client, ...args));
	});
});

// Gestion des commandes
client.on("message", (message) => {
	if (message.author.bot) return;
	if (!message.content.startsWith(client.settings.prefix)) return;

	let command = message.content.split(" ")[0].slice(client.settings.prefix.length);
	let args = message.content.split(" ").slice(1);

	fs.access(`./commands/${command}.js`, fs.F_OK, (err) => {
		if (err) return;

		let commandFile = require(`./commands/${command}.js`);

		commandFile.run(client, message, args);
	});
});

client.login(process.env.BOT_TOKEN);
