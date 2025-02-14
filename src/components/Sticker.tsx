import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

const Sticker = () => {
	const controls = useAnimation();

	useEffect(() => {
		// Replace 'trigger-section' with the id of the element you want to watch.
		const target = document.getElementById('experience');
		if (!target) return;

		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					// Check if at least 20% of the target is visible
					if (
						entry.isIntersecting &&
						entry.intersectionRatio >= 0.2
					) {
						controls.start('inView');
					}
				});
			},
			{ threshold: 0.3 }
		);

		observer.observe(target);
		return () => observer.disconnect();
	}, [controls]);

	return (
		<motion.div
			initial={{ width: 0 }}
			animate={controls}
			variants={{
				inView: { width: 300 },
			}}
			transition={{ duration: 0.4 }}
			className="flex items-end w-[180px] md:w-[250px] lg:w-[300px] h-[250px] relative overflow-hidden rotate-30"
		>
			<motion.div className="relative overflow-hidden">
				<motion.div className="min-w-[300px] min-h-[172px] rounded-xl bg-[url(./sticker3.png)] bg-left_top bg-no-repeat" />
			</motion.div>
			<motion.div
				initial={{ x: -50 }}
				variants={{ inView: { x: 270 } }}
				transition={{ duration: 0.32 }}
				className="absolute bottom-1/2 right-4 h-[172px] translate-y-[40%] w-[200px] rotate-25 bg-[#f7e5c0] shadow-md rounded-lg"
			/>
		</motion.div>
	);
};

export default Sticker;
