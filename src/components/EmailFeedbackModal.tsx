import React, { useEffect } from 'react';

interface EmailFeedbackModalProps {
	isOpen: boolean;
	onClose: () => void;
	isSuccess: boolean;
}

const EmailFeedbackModal: React.FC<EmailFeedbackModalProps> = ({
	isOpen,
	onClose,
	isSuccess,
}) => {
	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEscape);
		return () => {
			document.removeEventListener('keydown', handleEscape);
		};
	}, [onClose]);

	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 bg-black/40 flex justify-center items-center z-40"
			onClick={onClose}
		>
			<div className="relative">
				<button
					onClick={onClose}
					className="absolute top-5 right-8 z-50 text-4xl cursor-pointer"
				>
					<div className="relative">
						<div className="absolute inset-0 h-0.75 w-4 bg-white rounded-full rotate-45" />
						<div className="absolute inset-0 h-0.75 w-4 bg-white rounded-full -rotate-45" />
					</div>
				</button>
				<div
					className="bg-white/5 backdrop-blur-sm font-bold py-12 px-24 rounded-lg shadow-lg max-w-md w-full text-center"
					onClick={e => e.stopPropagation()}
				>
					<img
						src={isSuccess ? '/email-sent.png' : '/error.png'}
						alt=""
						className="w-10 py-4 mx-auto"
					/>
					<h2 className="text-4xl">
						{isSuccess ? 'Got it!' : 'Oops!'}
					</h2>
					<p className="py-2">
						{isSuccess
							? 'Your message is on its way.'
							: 'Something went wrong.'}
					</p>

					{isSuccess ? (
						<span className="text-secondary">Thank you!</span>
					) : (
						<p>
							Try again or contact us at
							<br />
							<a
								href="mailto:jvcbartolot@gmail.com"
								className="text-secondary hover:underline"
							>
								jvcbartolot@gmail.com
							</a>
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default EmailFeedbackModal;
