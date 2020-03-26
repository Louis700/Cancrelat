const fs = require("fs");
const Discord = require("discord.js");

exports.help = "Affiche l'aide d'une ou de plusieurs commandes (l'argument commande est optionnel)";
exports.usage = ";help [commande]";

exports.run = (client, message, args) => {
	message.delete();

	if (args.length > 0) {
		args.forEach( (arg) => {
			fs.access(`./commands/${arg}.js`, fs.F_OK, (err) => {
				if (err) {
					message.channel.send(
						new Discord.MessageEmbed()
							.setTitle("Erreur")
							.setColor("#F44336")
							.setDescription(`La commande ${arg} n'existe pas!`)
					).then((msg) => {
						msg.delete({
							timeout: 10000
						});
					});
					
					return;
				}
			
				let command = require(`./${arg}.js`);

				sendHelpMessage(message.channel, command);
			});
		});

		return;
	}

	fs.readdir("./commands/", (err, files) => {
		files.forEach( fileName => {
			fs.access(`./commands/${fileName}`, fs.F_OK, (err) => {
				if (err) {
					console.error(`Error accessing ./commands/${fileName}`);
					return;
				}

				let command = require(`./${fileName}`);

				sendHelpMessage(message.channel, command);
			});
		})

	});
};

function sendHelpMessage(channel, command) {
	channel.send(
		new Discord.MessageEmbed()
			.setTitle(command.usage)
			.setColor("#33FF33")
			.setDescription(command.help)
	).then((msg) => {
		msg.delete({
			timeout: 60000
		});
	});

}
