import AnimatedSectionTitle from './AnimatedSectionTitle';
import Timeline from './Timeline';
import TimelineVertical from './TimelineVertical';

const Experience = () => {
	return (
		<section
			id="experience"
			className="flex flex-col justify-center items-center w-full py-16 overflow-x-hidden"
			data-section
		>
			<AnimatedSectionTitle
				word="Experience"
				className="font-display text-2xl md:text-3xl"
			/>

			<div className="flex flex-col justify-center items-center my-12 md:my-24 space-y-16">
				<div className="flex flex-col md:flex-row justify-center items-center md:space-x-8 text-start">
					<div className="flex flex-col-reverse justify-center items-center md:flex-col">
						<div className="py-4 md:p-0 text-2xl md:text-3xl text-center md:text-start font-bold w-fit">
							ACADEMIC
							<br />
							BACKGROUND
						</div>
						<div className="max-h-24 md:max-h-12 w-full max-w-[70%] md:max-w-[211px] rounded-2xl overflow-hidden">
							<img
								src="experience.webp"
								alt="Experience"
								className="w-full h-full object-cover"
							/>
						</div>
					</div>
					<div className="max-w-[250px] text-sm text-center md:text-start">
						I hold a degree in Information Technology from
						Unilasalle University in Niterói. In addition to my
						studies, I have completed various programming courses,
						gaining experience in multiple programming languages and
						development tools.
					</div>
				</div>
				<Timeline />
				<TimelineVertical />
			</div>
		</section>
	);
};

export default Experience;
