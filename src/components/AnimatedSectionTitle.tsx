import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Typewriter from 'typewriter-effect';

type AnimatedSectionTitleProps = {
	word: string;
	className?: string;
};

const AnimatedSectionTitle: React.FC<AnimatedSectionTitleProps> = ({
	word,
	className = '',
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisible(
					entry.isIntersecting && entry.intersectionRatio > 0.4
				);
			},
			{ threshold: [0, 0.4, 1] }
		);

		if (ref.current) observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return (
		<div ref={ref} className={twMerge('text-4xl font-bold', className)}>
			{isVisible && (
				<Typewriter
					options={{
						autoStart: true,
						loop: false,
						delay: 75,
						cursor: '_',
					}}
					onInit={typewriter => {
						typewriter.typeString(word).start();
					}}
				/>
			)}
		</div>
	);
};

export default AnimatedSectionTitle;
