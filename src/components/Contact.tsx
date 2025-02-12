import EmailIcon from '../assets/icons/email.svg?react';
import Button from './Button';
import FloatingInput from './FloatingInput';

const Contact = () => {
	return (
		<section
			id="contact"
			className="flex flex-col justify-center items-center py-12"
			data-section
		>
			<div>
				<div className="flex flex-col items-center md:items-start space-y-4 text-center md:text-start border-b border-secondary pb-6">
					<div className="text-2xl md:text-3xl font-display">
						Let’s Build Something Together!
					</div>
					<div className="w-sm">
						Feel free to reach out through any of the platforms
						below. I’m excited to hear from you!
					</div>
				</div>
				<div className="flex flex-col md:flex-row justify-center md:justify-start w-full mt-6 space-x-0 space-y-4 md:space-x-6 md:space-y-0">
					<a
						href="mailto:jvcbartolot@gmail.com"
						target="_blank"
						rel="noopener noreferrer"
						className="flex flex-col md:flex-row justify-center items-center space-x-2"
					>
						<EmailIcon className="w-8 aspect-square md:mr-4 text-secondary" />
						jvcbartolot@gmail.com
					</a>
					<a
						href="https://www.linkedin.com/in/joao-bartolot"
						target="_blank"
						rel="noopener noreferrer"
						className="flex flex-col md:flex-row justify-center items-center space-x-2"
					>
						<img
							src="/linkedin.png"
							alt="Email icon"
							className="w-8 md:mr-4 aspect-square"
						/>
						João Bartolot
					</a>
				</div>
			</div>

			<div className="px-6 md:p-0 mt-24 w-full max-w-2xl">
				<div className="text-center text-2xl md:text-3xl font-semibold">
					CAN I CONTACT YOU?
				</div>
				<form className="w-full max-w-2xl mt-10 space-y-8">
					<FloatingInput label="Name" id="name" />
					<FloatingInput label="Surname" id="surname" />
					<FloatingInput label="Email" id="email" type="email" />
					<FloatingInput
						label="Message"
						id="message"
						type="textarea"
					/>
					<div className="flex justify-center items-center">
						<Button type="submit">Send</Button>
					</div>
				</form>
			</div>
		</section>
	);
};

export default Contact;
