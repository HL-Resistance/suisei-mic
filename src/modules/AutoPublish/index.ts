// Packages
import Sentry from '@sentry/node';

// Local files
import Module from '../../lib/Module';

// Models
import AutoPublish, { IAutoPublish } from '../../models/AutoPublish';

const config = require('../../../config');

class AutoPublishModule extends Module {
	commandHandler() {
		this.client?.on('message', (message) => {
			if (message.author.bot || message.channel.type === 'dm') return;

			AutoPublish.findById(message.channel.id, (err: Error, doc: IAutoPublish) => {
				if (err) {
					Sentry.captureException(err);
				}
				if (doc && message.crosspostable) message.crosspost();
			});

			if (!message.content.startsWith(config.discord.defaultPrefix)) return;

			const split = message.content.slice(config.discord.defaultPrefix.length).split(' ');
			const args = split.slice(1).join(' ').trim().split(' ');

			const command = this.commands.get(split[0]);
			if (command) command.run(this.client, message, args);
		});
	}
}

export default new AutoPublishModule(__dirname, []);
