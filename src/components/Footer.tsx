import Github from '../assets/icons/github.svg?react';
import Instagram from '../assets/icons/instagram.svg?react';
import Linkedin from '../assets/icons/linkedin.svg?react';

const Footer = () => {
	return (
		<footer className="flex flex-col justify-center items-center w-full py-6">
			<div className="flex space-x-6 mb-4">
				{/* LinkedIn */}
				<a
					href="https://www.linkedin.com/in/joao-bartolot/"
					target="_blank"
					rel="noopener noreferrer"
					className="flex justify-center items-center w-12 h-12 rounded-full bg-rich-black hover:bg-rich-black-600 transition-colors"
				>
					<Linkedin className="fill-raisin-black-900 w-7 h-7 pl-1" />
				</a>

				{/* Instagram */}
				<a
					href="https://www.instagram.com/joaobartolot/"
					target="_blank"
					rel="noopener noreferrer"
					className="flex justify-center items-center w-12 h-12 rounded-full bg-rich-black hover:bg-rich-black-600 transition-colors"
				>
					<Instagram className="fill-raisin-black-900 w-6 h-6" />
				</a>

				{/* GitHub */}
				<a
					href="https://github.com/joaobartolot/"
					target="_blank"
					rel="noopener noreferrer"
					className="flex justify-center items-center w-12 h-12 rounded-full bg-rich-black hover:bg-rich-black-600 transition-colors"
				>
					<Github className="fill-raisin-black-900 w-6 h-6" />
				</a>
			</div>
			<div className="text-sm text-charcoal-400">
				© João Bartolot. All rights reserved.
			</div>
		</footer>
	);
};

export default Footer;
