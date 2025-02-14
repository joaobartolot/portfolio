// emailTemplate.ts
export const getContactEmailTemplate = (
	name: string,
	surname: string,
	email: string,
	message: string
): string => `
  <!DOCTYPE html>
  <html>
  <head>
	<meta charset="UTF-8">
	<style>
	  body {
		background: #EAEAEA; /* color-white */
		color: #121212; /* color-primary */
		font-family: Arial, sans-serif;
		margin: 0;
		padding: 20px;
	  }
	  .header {
		background-color: #3B82F6; /* color-secondary */
		padding: 10px;
		text-align: center;
		color: #EAEAEA; /* color-white */
	  }
	  .content {
		padding: 20px;
	  }
	  .footer {
		text-align: center;
		font-size: 12px;
		color: #A8A8A8; /* color-disabled */
		margin-top: 20px;
	  }
	  .message-box {
		background: #8B5CF6; /* color-tertiary */
		padding: 15px;
		border-radius: 5px;
		color: #EAEAEA; /* color-white */
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
