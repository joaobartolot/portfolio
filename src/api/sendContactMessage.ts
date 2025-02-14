export interface ContactMessage {
	name: string;
	surname: string;
	email: string;
	message: string;
}

export async function sendContactMessage(
	data: ContactMessage
): Promise<unknown> {
	const response = await fetch('/api/contact', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		throw new Error('Failed to send message');
	}

	return response.json();
}
