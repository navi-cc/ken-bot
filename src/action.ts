import notificationService from './notification-service';

export default {
	async handleSuccess() {
		await notificationService.notifySuccess();
	},
	async handleFailure() {
		await notificationService.notifyFailure();
	}
};
