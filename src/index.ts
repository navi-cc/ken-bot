import actions from './action';
import { authenticate } from './auth';

export default {
	async fetch(request: Request, _, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);
		const requestedAction = url.pathname.slice(1);
		const method = request.method;
		const hasSignature = request.headers.has('x-signature');
		const hasTimestamp = request.headers.has('x-timestamp');
		const hasContentType = request.headers.has('content-type');
		const contentType = request.headers.get('content-type');

		if (method !== 'POST') {
			return new Response('Invalid Method', {
				status: 501,
				statusText: 'Not Implemented'
			});
		}

		if (hasContentType && contentType !== 'application/json') {
			return new Response('JSON format only', {
				status: 400,
				statusText: 'Bad Request'
			});
		}

		if (!hasSignature || !hasTimestamp) {
			return new Response('Invalid Headers', {
				status: 400,
				statusText: 'Bad Request'
			});
		}

		const signature = request.headers.get('x-signature');
		const timestamp = request.headers.get('x-timestamp');
		const body = (await request.json()) as object;

		const isAuthenticated = authenticate(signature as string, timestamp as string, body);

		if (!isAuthenticated) {
			return new Response('Unauthenticated', {
				status: 401,
				statusText: 'Unauthenticated'
			});
		}

		switch (requestedAction) {
			case 'success':
				await actions.handleSuccess();
				return new Response(
					JSON.stringify({
						message: 'Notification sent.',
						notificationType: 'success'
					}),
					{ status: 200, statusText: 'OK' }
				);
			case 'failure':
				await actions.handleFailure();
				return new Response(
					JSON.stringify({
						message: 'Notification sent.',
						notificationType: 'failure'
					}),
					{ status: 200, statusText: 'OK' }
				);
			default:
				return new Response('Not Found', { status: 404, statusText: 'Not Found' });
		}
	}
};
