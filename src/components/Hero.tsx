import HeroTextEffect from './HeroTextEffect';
import ScrollIndicator from './ScrollIndicator';

const Hero = () => {
	return (
		<section
			id="hero"
			className="relative flex justify-center items-center w-ful h-screen"
			data-section
		>
			<div className="font-display text-5xl text-start">
				<HeroTextEffect />
			</div>
			<ScrollIndicator className="absolute bottom-16 md:bottom-12" />
		</section>
	);
};

export default Hero;
