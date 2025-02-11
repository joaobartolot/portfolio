import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { twJoin } from 'tailwind-merge';

const sections = ['hero', 'about', 'projects', 'contact'];

const PageTracker = () => {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				// Filter to only the entries that are intersecting with at least 60% visibility.
				const visibleEntries = entries.filter(
					entry => entry.isIntersecting
				);

				if (visibleEntries.length > 0) {
					// Pick the entry that is closest to the top of the viewport.
					const sorted = visibleEntries.sort(
						(a, b) =>
							Math.abs(a.boundingClientRect.top) -
							Math.abs(b.boundingClientRect.top)
					);
					const mostVisible = sorted[0];
					const newActiveIndex = sections.indexOf(
						mostVisible.target.id
					);
					setActiveIndex(newActiveIndex);
				} else {
					// Optionally, if no section is 60% visible, clear the active state.
					setActiveIndex(null);
				}
			},
			{ threshold: 0.6 }
		);

		// Observe each section element.
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
			sectionElement.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<div className="fixed top-1/2 right-4 -translate-y-1/2 flex flex-col gap-4 z-10">
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
