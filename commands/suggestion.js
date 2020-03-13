const Discord = require("discord.js");

exports.run = (client, message, args) => {
	if (message.channel.id !== client.settings.suggestionChannel) {
		message.channel.send(
			new Discord.MessageEmbed()
				.setColor("#F44336")
				.setTitle("Erreur")
				.setDescription("Vous ne pouvez pas utiliser cette commande dans ce salon.")
		).then((msg) => {
			msg.delete({
				timeout: 10000
			});
		});

		message.delete({
			timeout: 2000
		});

		return;
	}

	if (args.length === 0) {
		message.channel.send(
			new Discord.MessageEmbed()
				.setColor("#F44336")
				.setTitle("Erreur")
				.setDescription("Vous devez utiliser cette commande comme il suit :" + "\n" + ";suggestion <Message>")
		).then((msg) => {
			msg.delete({
				timeout: 10000
			});
		});

		message.delete({
			timeout: 2000
		});

		return;
	}

	const suggestion = args.join(" ");

	message.channel.send(
		new Discord.MessageEmbed()
			.setColor("#FFC107")
			.setAuthor(message.author.username, message.author.avatarURL())
			.setDescription(suggestion)
			.setTimestamp()
	).then((msg) => {
		msg.react("✅");
		msg.react("❎");
	});

	message.delete();
};
