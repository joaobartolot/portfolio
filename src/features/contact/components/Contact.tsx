import Gmail from '../../../assets/icons/gmail.svg?react';
import Linkedin from '../../../assets/icons/linkedin.svg?react';

const Contact = () => {
	return (
		<div className="flex flex-col min-h-screen bg-gradient-to-b from-blueberry to-darkChocolate text-white">
			<section
				id="contact"
				className="flex flex-col justify-center items-center flex-1 px-4 py-24 text-center"
			>
				<h1 className="text-4xl font-display mb-4">
					Let’s Build Something Together!
				</h1>
				<p className="text-lg text-gray-300 mb-8">
					Feel free to reach out through any of the platforms below.
					I’m excited to hear from you!
				</p>
				<div className="flex space-x-6 justify-center items-center">
					{/* Email */}
					<a
						href="mailto:jvcbartolot@gmail.com"
						target="_blank"
						rel="noopener noreferrer"
						className="flex justify-center items-center px-4 py-2 rounded-full bg-rich-black hover:bg-rich-black-600 transition-colors"
					>
						<Gmail className="fill-raisin-black-900 w-6 h-6 mr-4" />
						jvcbartolot@gmail.com
					</a>

					{/* LinkedIn */}
					<a
						href="https://www.linkedin.com/in/joao-bartolot/"
						target="_blank"
						rel="noopener noreferrer"
						className="flex justify-center items-center px-4 py-2 rounded-full bg-rich-black hover:bg-rich-black-600 transition-colors"
					>
						<Linkedin className="fill-raisin-black-900 w-7 h-7 pl-1 mr-4" />
						João Bartolot
					</a>
				</div>
			</section>
		</div>
	);
};

export default Contact;
