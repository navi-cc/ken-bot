import notificationAdapter from './adapters/index';
import { env } from 'cloudflare:workers';
import { Client } from './shared-types';

export default {
	async notifySuccess() {
		await notificationAdapter[
			env.NOTIFICATION_CLIENT as Client
		].sendSuccessNotification();
	},

	async notifyFailure() {
		await notificationAdapter[
			env.NOTIFICATION_CLIENT as Client
		].sendFailureNotification();
	}
};
