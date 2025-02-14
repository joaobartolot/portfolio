import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

// Inline email template function
function getContactEmailTemplate(
	name: string,
	surname: string,
	email: string,
	message: string
): string {
	return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { 
            background: #EAEAEA; 
            color: #121212; 
            font-family: Arial, sans-serif; 
            margin: 0; 
            padding: 20px; 
          }
          .header { 
            background-color: #3B82F6; 
            padding: 10px; 
            text-align: center; 
            color: #EAEAEA; 
          }
          .content { 
            padding: 20px; 
          }
          .footer { 
            text-align: center; 
            font-size: 12px; 
            color: #A8A8A8; 
            margin-top: 20px; 
          }
          .message-box { 
            background: #8B5CF6; 
            padding: 15px; 
            border-radius: 5px; 
            color: #EAEAEA; 
            margin-top: 10px; 
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>New Contact Message</h1>
        </div>
        <div class="content">
          <p><strong>Name:</strong> ${name} ${surname}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div class="message-box">
            <p>${message}</p>
          </div>
        </div>
        <div class="footer">
          <p>This message was sent from your contact form.</p>
        </div>
      </body>
    </html>
  `;
}

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

	// Generate the HTML email content using the inline template
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
