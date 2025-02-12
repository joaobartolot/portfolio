import ScrollIndicator from './ScrollIndicator';

const Hero = () => {
	return (
		<section
			id="hero"
			className="relative flex justify-center items-center w-ful h-screen"
			data-section
		>
			<div className="font-display text-5xl text-start">
				Coding <br />
				<span className="text-secondary">Ideas</span>,<br />
				Crafting
				<br />
				<span className="text-secondary">Solutions</span>_
			</div>
			<ScrollIndicator className="absolute bottom-12" />
		</section>
	);
};

export default Hero;
