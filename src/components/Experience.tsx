import Timeline from './Timeline';

const Experience = () => {
	return (
		<section
			id="experience"
			className="flex flex-col justify-center items-center w-full py-16"
		>
			<div className="text-display text-2xl">Experience_</div>

			<div className="flex flex-col justify-center items-center my-24 space-y-16">
				<div className="flex space-x-8 text-start">
					<div className="flex flex-col">
						<div className="text-3xl font-bold w-fit">
							ACADEMIC
							<br />
							BACKGROUND
						</div>
						<div className="max-h-16 w-full max-w-[211px] rounded-2xl overflow-hidden">
							<img
								src="experience.webp"
								alt="Experience"
								className="w-full h-full object-cover"
							/>
						</div>
					</div>
					<div className="max-w-[250px] text-sm">
						I hold a degree in Information Technology from
						Unilasalle University in Niterói. In addition to my
						studies, I have completed various programming courses,
						gaining experience in multiple programming languages and
						development tools.
					</div>
				</div>
				<Timeline />
			</div>
		</section>
	);
};

export default Experience;
