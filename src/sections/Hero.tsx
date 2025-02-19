import Blob from '../assets/blobs/blob1.svg?react';
import HeroTextEffect from '../components/HeroTextEffect';
import ScrollIndicator from '../components/ScrollIndicator';

const Hero = () => {
	return (
		<section
			id="hero"
			className="relative flex justify-center items-center w-full h-screen overflow-visible"
			data-section
		>
			<div className="relative w-[80%] flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
				<div className="flex justify-center mb-12 md:m-0 w-full md:w-1/2 font-display text-3xl md:text-5xl lg:text-7xl text-start">
					<div className="w-[181px] h-[144px] md:w-[289px] md:h-[192px] lg:w-[433px] lg:h-[288px]">
						<HeroTextEffect />
					</div>
				</div>
				<div className="w-64 aspect-square md:w-1/2 md:ml-4 overflow-hidden md:pb-12">
					<img
						src="laptop.png"
						alt="Laptop"
						className="w-full aspect-square object-cover"
					/>
				</div>
				<Blob className="absolute right-0 top-0 -z-10 h-full w-full scale-150 md:w-[50%] text-secondary/25 blur-2xl" />
			</div>
			<ScrollIndicator className="absolute bottom-16 md:bottom-12" />
		</section>
	);
};

export default Hero;
