import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

const Header = () => {
	const [activeSection, setActiveSection] = useState('');

	const sections = ['Experience', 'Projects', 'Contacts'];

	return (
		<header className="hidden md:block fixed top-0 left-0 w-full bg-transparent z-50">
			<nav className="flex justify-center items-center h-24 ">
				<div className="rounded-full bg-rich-black px-6 py-2 shadow-md space-x-10">
					{sections.map(section => (
						<button
							key={section}
							className={twMerge(
								'px-3 py-1 text-white font-semibold font-display text-sm',
								activeSection === section
									? 'bg-white text-rich-black-100 rounded-full'
									: 'hover:text-gray-400'
							)}
							onClick={() => setActiveSection(section)}
						>
							{section}
						</button>
					))}
				</div>
			</nav>
		</header>
	);
};

export default Header;
