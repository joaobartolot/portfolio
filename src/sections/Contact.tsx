// src/components/Contact.tsx
import React, { useState } from 'react'
import { sendContactMessage } from '../api/sendContactMessage'
import Blob from '../assets/blobs/blob6.svg?react'
import EmailIcon from '../assets/icons/email.svg?react'
import ArrowMeetMD from '../assets/images/arrow-meet-md.svg?react'
import ArrowMeet from '../assets/images/arrow-meet.svg?react'
import Button from '../components/Button'
import EmailFeedbackModal from '../components/EmailFeedbackModal'
import FloatingInput from '../components/FloatingInput'
import useModal from '../hooks/useModal'

const Contact = () => {
	const { isOpen, openModal, closeModal } = useModal()
	const [isSuccess, setIsSuccess] = useState(false)
	const [form, setForm] = useState({
		name: '',
		surname: '',
		email: '',
		message: '',
	})

	const handleEmailSend = (success: boolean) => {
		setIsSuccess(success)
		openModal()
	}

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setForm({
			...form,
			[e.target.id]: e.target.value,
		})
	}

	const handleClose = () => {
		if (isSuccess) {
			setForm({
				name: '',
				surname: '',
				email: '',
				message: '',
			})
		}

		closeModal()
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			await sendContactMessage({ ...form })
			handleEmailSend(true)
		} catch {
			handleEmailSend(false)
		}
	}

	return (
		<section
			id="contact"
			className="relative flex flex-col items-center justify-center overflow-visible py-12"
			data-section
		>
			<div>
				<div className="border-secondary relative flex flex-col items-center space-y-4 border-none pb-6 text-center md:items-start md:border-b md:text-start">
					<div className="font-display text-2xl md:text-3xl">
						Let’s Build Something Together!
					</div>
					<div className="w-3xs font-light md:w-xl md:text-lg">
						Feel free to reach out through any of the platforms
						below. I’m excited to hear from you!
					</div>
					<div className="absolute right-0 bottom-0 translate-y-[40%] px-2 md:translate-x-[100%] md:translate-y-[50%] md:p-0">
						<div className="relative">
							<ArrowMeet className="lg:hidden" />
							<ArrowMeetMD className="hidden lg:block" />
							<div className="absolute right-0 w-[100px] translate-y-[20%] -rotate-[20deg] text-xs md:w-[160px] md:translate-x-[25%] md:-rotate-[30deg] lg:translate-x-[50%] lg:-rotate-45 lg:text-sm">
								If you are nearby, let’s grab a coffee and meet
								up!
							</div>
						</div>
					</div>
				</div>
				<div className="flex w-full flex-col justify-center space-y-4 space-x-0 md:mt-6 md:flex-row md:justify-start md:space-y-0 md:space-x-6">
					<a
						href="mailto:jvcbartolot@gmail.com"
						target="_blank"
						rel="noopener noreferrer"
						className="flex flex-col items-center justify-center space-x-2 md:flex-row"
					>
						<EmailIcon className="text-secondary aspect-square w-8 md:mr-4" />
						jvcbartolot@gmail.com
					</a>
					<a
						href="https://www.linkedin.com/in/joao-bartolot"
						target="_blank"
						rel="noopener noreferrer"
						className="flex flex-col items-center justify-center space-x-2 md:flex-row"
					>
						<img
							src="/linkedin.png"
							alt="LinkedIn profile"
							className="aspect-square w-8 md:mr-4"
						/>
						João Bartolot
					</a>
				</div>
			</div>

			<div className="mt-24 w-full max-w-2xl px-6 md:p-0">
				<div className="text-center text-2xl font-semibold md:text-3xl">
					CAN I CONTACT YOU?
				</div>
				<form
					className="mt-10 w-full max-w-2xl space-y-8"
					onSubmit={handleSubmit}
				>
					<FloatingInput
						label="Name"
						id="name"
						value={form.name}
						onChange={handleChange}
					/>
					<FloatingInput
						label="Surname"
						id="surname"
						value={form.surname}
						onChange={handleChange}
					/>
					<FloatingInput
						label="Email"
						id="email"
						type="email"
						value={form.email}
						onChange={handleChange}
					/>
					<FloatingInput
						label="Message"
						id="message"
						type="textarea"
						value={form.message}
						onChange={handleChange}
					/>
					<div className="flex items-center justify-center">
						<Button type="submit">Send</Button>
					</div>
				</form>
			</div>
			<Blob className="absolute left-[50%] -z-10 hidden -translate-x-[50%]" />

			<EmailFeedbackModal
				isOpen={isOpen}
				onClose={handleClose}
				isSuccess={isSuccess}
			/>
		</section>
	)
}

export default Contact
