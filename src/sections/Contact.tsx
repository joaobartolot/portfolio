// src/components/Contact.tsx
import React, { useState } from 'react';
import { sendContactMessage } from '../api/sendContactMessage';
import Blob from '../assets/blobs/blob6.svg?react';
import EmailIcon from '../assets/icons/email.svg?react';
import ArrowMeetMD from '../assets/images/arrow-meet-md.svg?react';
import ArrowMeet from '../assets/images/arrow-meet.svg?react';
import Button from '../components/Button';
import EmailFeedbackModal from '../components/EmailFeedbackModal';
import FloatingInput from '../components/FloatingInput';
import useModal from '../hooks/useModal';

const Contact = () => {
	const { isOpen, openModal, closeModal } = useModal();
	const [isSuccess, setIsSuccess] = useState(false);
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	const handleEmailSend = (success: boolean) => {
		setIsSuccess(success);
		openModal();
	};

	const handleClose = () => {
		if (isSuccess) {
			setName('');
			setSurname('');
			setEmail('');
			setMessage('');
		}

		closeModal();
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			await sendContactMessage({ name, surname, email, message });
			handleEmailSend(true);
		} catch {
			handleEmailSend(false);
		}
	};

	return (
		<section
			id="contact"
			className="relative flex flex-col justify-center items-center py-12 overflow-visible"
			data-section
		>
			<div>
				<div className="relative flex flex-col items-center md:items-start space-y-4 text-center md:text-start border-none md:border-b border-secondary pb-6">
					<div className="text-2xl md:text-3xl font-display">
						Let’s Build Something Together!
					</div>
					<div className="w-3xs md:w-xl md:text-lg font-light">
						Feel free to reach out through any of the platforms
						below. I’m excited to hear from you!
					</div>
					<div className="absolute right-0 bottom-0 translate-y-[40%] md:translate-y-[50%] md:translate-x-[100%] px-2 md:p-0">
						<div className="relative">
							<ArrowMeet className="lg:hidden" />
							<ArrowMeetMD className="hidden lg:block" />
							<div className="absolute right-0 translate-y-[20%] md:translate-x-[25%] lg:translate-x-[50%] -rotate-[20deg] md:-rotate-[30deg] lg:-rotate-45 w-[100px] md:w-[160px] text-xs lg:text-sm">
								If you are nearby, let’s grab a coffee and meet
								up!
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col md:flex-row justify-center md:justify-start w-full md:mt-6 space-x-0 space-y-4 md:space-x-6 md:space-y-0">
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
							alt="LinkedIn profile"
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
				<form
					className="w-full max-w-2xl mt-10 space-y-8"
					onSubmit={handleSubmit}
				>
					<FloatingInput
						label="Name"
						id="name"
						value={name}
						onChange={e => setName(e.target.value)}
					/>
					<FloatingInput
						label="Surname"
						id="surname"
						value={surname}
						onChange={e => setSurname(e.target.value)}
					/>
					<FloatingInput
						label="Email"
						id="email"
						type="email"
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					<FloatingInput
						label="Message"
						id="message"
						type="textarea"
						value={message}
						onChange={e => setMessage(e.target.value)}
					/>
					<div className="flex justify-center items-center">
						<Button type="submit">Send</Button>
					</div>
				</form>
			</div>
			<Blob className="absolute left-[50%] -translate-x-[50%] -z-10 hidden" />

			<EmailFeedbackModal
				isOpen={isOpen}
				onClose={handleClose}
				isSuccess={isSuccess}
			/>
		</section>
	);
};

export default Contact;
