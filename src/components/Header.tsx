import { useState } from 'react';
import { Link } from 'react-scroll';
import { twMerge } from 'tailwind-merge';

const Header = () => {
	const [activeSection, setActiveSection] = useState('');

	const sections = ['Experience', 'Projects', 'Contacts'];

	return (
		<header className="fixed top-0 left-0 w-full bg-transparent z-50">
			<nav className="flex justify-center items-center h-24">
				<div className="rounded-full bg-rich-black p-2 shadow-md space-x-5 md:space-x-10">
					{sections.map(section => (
						<Link
							key={section}
							to={section.toLowerCase()}
							spy={true}
							smooth={true}
							duration={300}
							className={twMerge(
								'px-3 py-1 text-white font-semibold font-display text-base cursor-pointer transition-colors duration-300 rounded-full',
								activeSection === section
									? 'bg-white text-rich-black-100'
									: 'hover:text-gray-400'
							)}
							onSetActive={() => setActiveSection(section)}
							onSetInactive={() => setActiveSection('')}
						>
							{section}
						</Link>
					))}
				</div>
			</nav>
		</header>
	);
};

export default Header;
