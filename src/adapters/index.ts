import discordAdapter from './discord-adapter';
import { NotificationAdapter } from './types';
import { Client } from '../shared-types';
export default {
	discord: { ...discordAdapter },
	slack: { ...discordAdapter }
} satisfies Record<Client, NotificationAdapter>;
