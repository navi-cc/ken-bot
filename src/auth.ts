import { env } from 'cloudflare:workers';
import { createHmac, timingSafeEqual } from 'crypto';

export function authenticate(
	signature: string,
	timestamp: string,
	body: object
): boolean {
	const secret = env.WEBHOOK_SECRET;
	const hmac = createHmac('sha256', secret);

	hmac.update(`${timestamp}:${JSON.stringify(body)}`);
	const digestSignature = hmac.digest('hex');

	const bufferA = Buffer.from(signature);
	const bufferB = Buffer.from(digestSignature);

	if (bufferA.length !== bufferB.length) {
		return false;
	}

	const isEqual = timingSafeEqual(Buffer.from(signature), Buffer.from(digestSignature));

	return isEqual;
}
