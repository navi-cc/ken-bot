import { NotificationAdapter } from './types';
import { REST } from '@discordjs/rest';
import { ContainerBuilder, ButtonBuilder } from '@discordjs/builders';
import {
	ButtonStyle,
	MessageFlags,
	Routes,
	SeparatorSpacingSize
} from 'discord-api-types/v10';
import { env } from 'cloudflare:workers';

const failTemplate = new ContainerBuilder()
	.setAccentColor(0xff3838)
	.addTextDisplayComponents((textDisplay) =>
		textDisplay.setContent('### <:error:1564171708569620491> Deployment Failed')
	)
	.addSeparatorComponents((seperator) =>
		seperator.setDivider(false).setSpacing(SeparatorSpacingSize.Small)
	)
	.addTextDisplayComponents(
		(textDisplay) => textDisplay.setContent('<:branch:1564198508309778442> Branch'),
		(textDisplay) => textDisplay.setContent('fs/pokedex')
	)
	.addSeparatorComponents((seperator) => seperator)
	.addTextDisplayComponents(
		(textDisplay) => textDisplay.setContent('<:commit:1564195608913379338> Commit'),
		(textDisplay) => textDisplay.setContent('234809dadadasdd')
	)
	.addSeparatorComponents((seperator) => seperator)
	.addTextDisplayComponents(
		(textDisplay) => textDisplay.setContent('<:commit:1564199654357475408> Author'),
		(textDisplay) => textDisplay.setContent('navi-cc')
	)
	.addSeparatorComponents((seperator) => seperator)
	.addTextDisplayComponents(
		(textDisplay) => textDisplay.setContent('<:message:1564416955585400955> Message'),
		(textDisplay) => textDisplay.setContent('update icon')
	)
	.addSeparatorComponents((seperator) => seperator)
	.addTextDisplayComponents(
		(textDisplay) =>
			textDisplay.setContent('<:duration:1564418208696508466> Build Duration'),
		(textDisplay) => textDisplay.setContent('50s')
	)
	.addSeparatorComponents((seperator) =>
		seperator.setDivider(false).setSpacing(SeparatorSpacingSize.Small)
	)
	.addActionRowComponents((action) =>
		action.addComponents(
			new ButtonBuilder()
				.setURL('https://example.com')
				.setLabel('View Logs')
				.setStyle(ButtonStyle.Link)
		)
	);

const successTemplate = new ContainerBuilder()
	.setAccentColor(0x42ff72)
	.addTextDisplayComponents((textDisplay) =>
		textDisplay.setContent('### <:success:1564171786889723984> Deployed Successfully')
	)
	.addSeparatorComponents((seperator) =>
		seperator.setDivider(false).setSpacing(SeparatorSpacingSize.Small)
	)
	.addTextDisplayComponents(
		(textDisplay) => textDisplay.setContent('<:branch:1564198508309778442> Branch'),
		(textDisplay) => textDisplay.setContent('fs/pokedex')
	)
	.addSeparatorComponents((seperator) => seperator)
	.addTextDisplayComponents(
		(textDisplay) => textDisplay.setContent('<:commit:1564195608913379338> Commit'),
		(textDisplay) => textDisplay.setContent('234809dadadasdd')
	)
	.addSeparatorComponents((seperator) => seperator)
	.addTextDisplayComponents(
		(textDisplay) => textDisplay.setContent('<:commit:1564199654357475408> Author'),
		(textDisplay) => textDisplay.setContent('navi-cc')
	)
	.addSeparatorComponents((seperator) => seperator)
	.addTextDisplayComponents(
		(textDisplay) =>
			textDisplay.setContent('<:duration:1564418208696508466> Build Duration'),
		(textDisplay) => textDisplay.setContent('50s')
	);

export default {
	async sendSuccessNotification() {
		const client = new REST().setToken(env.DISCORD_TOKEN);

		const CHANNEL_ID = Routes.channelMessages(env.DISCORD_CHANNEL_ID);

		const COMPONENTS = [successTemplate.toJSON()];

		try {
			await client.post(CHANNEL_ID, {
				body: {
					contents: 'Deployment Failed',
					components: COMPONENTS,
					flags: MessageFlags.IsComponentsV2
				}
			});
		} catch (error) {
			console.log(error);
		}
	},
	async sendFailureNotification() {
		const client = new REST().setToken(env.DISCORD_TOKEN);

		const CHANNEL_ID = Routes.channelMessages(env.DISCORD_CHANNEL_ID);

		const COMPONENTS = [failTemplate.toJSON()];

		await client.post(CHANNEL_ID, {
			body: {
				components: COMPONENTS,
				flags: MessageFlags.IsComponentsV2
			}
		});
	}
} satisfies NotificationAdapter;
