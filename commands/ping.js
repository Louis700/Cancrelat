exports.help = "Répond par \"Pong!\"";
exports.usage = ";ping";

exports.run = (client, message, args) => {
	message.channel.send("Pong!");
};
