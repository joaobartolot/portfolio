import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { twJoin } from 'tailwind-merge';

const sections = ['hero', 'about', 'experience', 'projects'];

const PageTracker = () => {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						const newActiveIndex = sections.indexOf(
							entry.target.id
						);
						setActiveIndex(newActiveIndex);
					}
				});
			},
			{ threshold: 0.5 }
		);

		sections.forEach(id => {
			const element = document.getElementById(id);
			if (element) observer.observe(element);
		});

		return () => observer.disconnect();
	}, []);

	const handleClick = (index: number) => {
		const sectionId = sections[index];
		const sectionElement = document.getElementById(sectionId);

		if (sectionElement) {
			const offset = 72; // Header height
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

	return (
		<div className="fixed top-1/2 right-4 -translate-y-1/2 flex flex-col gap-4 z-30">
			{sections.map((_, index) => (
				<div
					key={index}
					className="relative cursor-pointer"
					onClick={() => handleClick(index)}
				>
					<div
						className={twJoin(
							'w-4 h-4 rounded-full border-3 transition-all',
							activeIndex === index
								? 'border-white'
								: 'border-gray-500'
						)}
					>
						<motion.div
							className="absolute inset-0 bg-white rounded-full"
							initial={{ scale: 0 }}
							animate={{ scale: activeIndex === index ? 1 : 0 }}
							transition={{ duration: 0.3 }}
						/>
					</div>
				</div>
			))}
		</div>
	);
};

export default PageTracker;
