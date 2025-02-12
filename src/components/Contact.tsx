const Contact = () => {
	return (
		<section
			id="contact"
			className="flex flex-col justify-center items-center py-12"
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
						<img
							src="/email.png"
							alt="Email icon"
							className="w-8 md:mr-4 aspect-square"
						/>
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

			<div className="mt-24 max-w-2xl">
				<div className="text-center text-2xl md:text-3xl font-semibold">
					CAN I CONTACT YOU?
				</div>
			</div>
		</section>
	);
};

export default Contact;
