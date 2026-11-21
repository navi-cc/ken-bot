export type NotificationAdapter = {
	sendSuccessNotification(): Promise<void>;
	sendFailureNotification(): Promise<void>;
};
