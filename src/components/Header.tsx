import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { twJoin } from 'tailwind-merge';
import Button from './Button';

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [frostHeader, setFrostHeader] = useState(false);
	const headerRef = useRef<HTMLElement>(null);
	const [offset, setOffset] = useState(60);
	const [hideFast, setHideFast] = useState(false);

	// Update offset based on screen width
	useEffect(() => {
		const updateOffset = () => {
			const md = window.matchMedia('(min-width: 768px)').matches;
			if (md) {
				setIsOpen(false);
				setHideFast(false);
				setOffset(72);
				return;
			}
			setOffset(60);
			setHideFast(true);
		};

		updateOffset(); // Set initial value
		window.addEventListener('resize', updateOffset);

		return () => window.removeEventListener('resize', updateOffset);
	}, []);

	useEffect(() => {
		window.onscroll = () =>
			window.scrollY === 0 ? setFrostHeader(false) : setFrostHeader(true);

		return () => {
			window.onscroll = null;
		};
	}, []);

	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (
				headerRef.current &&
				!headerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const topVariants = {
		closed: { rotate: 0, y: 0 },
		open: { rotate: 45, y: 8 },
	};

	const middleVariants = {
		closed: { opacity: 1 },
		open: { opacity: 0 },
	};

	const bottomVariants = {
		closed: { rotate: 0, y: 0 },
		open: { rotate: -45, y: -8, width: '100%' },
	};

	const scrollToElement = (sectionId: string) => {
		const sectionElement = document.getElementById(sectionId);
		if (sectionElement) {
			const sectionPosition =
				sectionElement.getBoundingClientRect().top +
				window.scrollY -
				offset;

			window.scrollTo({
				top: sectionPosition,
				behavior: 'smooth',
			});
		}
	};
	const handleAnchorClick = (
		event: React.MouseEvent<HTMLAnchorElement>,
		sectionId: string
	) => {
		event.preventDefault(); // Prevent default anchor link behavior
		scrollToElement(sectionId);
	};

	return (
		<header
			ref={headerRef}
			className={twJoin(
				'fixed flex w-full items-center justify-center px-4 py-4 z-30',
				'md:px-12',
				!isOpen && hideFast ? 'delay-300' : '',
				isOpen && hideFast ? '' : 'transition-color duration-300',
				frostHeader && !isOpen ? 'bg-white/5 backdrop-blur-sm' : ''
			)}
		>
			<div className="relative flex w-full items-center justify-between">
				<div
					onClick={() => window.scrollTo(0, 0)}
					className={twJoin(
						'absolute inset-0 z-40 flex h-full w-full items-center justify-center cursor-pointer',
						'md:static md:w-fit'
					)}
				>
					<img src="logo.svg" alt="Logo" className="w-36" />
				</div>
				<button
					className="z-50 flex h-6 w-8 flex-col justify-around md:hidden"
					onClick={() => setIsOpen(!isOpen)}
				>
					<motion.span
						className="h-[3px] w-full rounded-full bg-white"
						variants={topVariants}
						animate={isOpen ? 'open' : 'closed'}
						transition={{ duration: 0.3 }}
					/>

					<motion.span
						className="h-[3px] w-[80%] rounded-full bg-white"
						variants={middleVariants}
						animate={isOpen ? 'open' : 'closed'}
						transition={{ duration: 0.3 }}
					/>

					<motion.span
						className="h-[3px] w-[70%] rounded-full bg-white"
						variants={bottomVariants}
						animate={isOpen ? 'open' : 'closed'}
						transition={{ duration: 0.3 }}
					/>
				</button>

				<Button
					onClick={() => scrollToElement('contact')}
					className="z-50 px-2 py-1 text-sm md:px-8 md:py-2 md:text-base"
				>
					Hire me
				</Button>

				<nav
					className={twJoin(
						'absolute inset-0 hidden h-full items-center justify-center space-x-12',
						'md:flex'
					)}
				>
					<a
						href="#about"
						onClick={e => handleAnchorClick(e, 'about')}
					>
						About
					</a>
					<a
						href="#experience"
						onClick={e => handleAnchorClick(e, 'experience')}
					>
						Experience
					</a>
					<a
						href="#projects"
						onClick={e => handleAnchorClick(e, 'projects')}
					>
						Projects
					</a>
				</nav>
			</div>
			<motion.nav
				initial={{ x: '-100%' }} // Start completely off-screen to the left
				animate={{ x: isOpen ? 0 : '-100%' }} // Slide in to `left-0`
				exit={{ x: '-100%' }} // Slide out when closed
				transition={{
					type: 'tween',
					duration: 0.4,
					ease: 'easeOut',
				}}
				className={twJoin(
					'md:hidden absolute top-0 left-0 overflow-hidden bg-white/5 backdrop-blur-sm',
					'z-40 flex flex-col items-start space-y-6 py-24 pl-4 pr-24 rounded-br-[30px]'
				)}
			>
				<a href="#about" onClick={e => handleAnchorClick(e, 'about')}>
					About
				</a>
				<a
					href="#experience"
					onClick={e => handleAnchorClick(e, 'experience')}
				>
					Experience
				</a>
				<a
					href="#projects"
					onClick={e => handleAnchorClick(e, 'projects')}
				>
					Projects
				</a>
			</motion.nav>
		</header>
	);
};

export default Header;
