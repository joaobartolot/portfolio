// api/contact.ts
// api/contact.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
const { getContactEmailTemplate } = require('../lib/emailTemplate');

// ... rest of your code remains the same

// Get credentials from environment variables
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL;
const RESEND_TO_EMAIL = process.env.RESEND_TO_EMAIL;

if (!RESEND_API_KEY || !RESEND_FROM_EMAIL || !RESEND_TO_EMAIL) {
	throw new Error(
		'Missing environment variables: RESEND_API_KEY, RESEND_FROM_EMAIL, or RESEND_TO_EMAIL'
	);
}

// Initialize Resend client
const resendClient = new Resend(RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
	if (req.method !== 'POST') {
		res.setHeader('Allow', ['POST']);
		return res.status(405).json({ error: 'Method not allowed' });
	}

	const { name, surname, email, message } = req.body;

	// Validate required fields
	if (!name || !surname || !email || !message) {
		return res.status(400).json({ error: 'Missing required fields' });
	}

	// Generate the HTML email content
	const htmlContent = getContactEmailTemplate(name, surname, email, message);

	try {
		const data = await resendClient.emails.send({
			from: RESEND_FROM_EMAIL ?? '',
			to: RESEND_TO_EMAIL ?? '',
			subject: 'New Contact Message',
			html: htmlContent,
		});

		return res.status(200).json({ success: true, data });
	} catch (error) {
		console.error('Error sending email:', error);
		return res.status(500).json({ error: 'Failed to send email' });
	}
}
