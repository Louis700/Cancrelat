const Discord = require("discord.js");

exports.run = (client, message, args) => {
	if (!client.settings.rolesAllowedToValidateAMember.includes(message.member.roles.highest.id)) {
		message.channel.send(
			new Discord.MessageEmbed()
				.setColor("#F44336")
				.setTitle("Erreur")
				.setDescription("Vous n’êtes pas autorisé à utiliser cette commande.")
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

	if (args.length !== 1 || message.mentions.members.first() === undefined) {
		message.channel.send(
			new Discord.MessageEmbed()
				.setColor("#F44336")
				.setTitle("Erreur")
				.setDescription("Vous devez utiliser cette commande comme il suit :" + "\n" + ";member <@Membre>")
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

	message.mentions.members.first().roles.add(client.settings.memberRole);
};
