import Blob from '../assets/blobs/blob2.svg?react';
import BlobTwo from '../assets/blobs/blob3.svg?react';
import ArrowMagicMD from '../assets/images/arrow-magic-md.svg?react';
import ArrowMagic from '../assets/images/arrow-magic.svg?react';
import AnimatedSectionTitle from './AnimatedSectionTitle';
import DownloadCV from './DownloadCV';

const About = () => {
	return (
		<section
			id="about"
			className="relative flex flex-col justify-center items-center w-full py-16 overflow-visible"
			data-section
		>
			<AnimatedSectionTitle
				word="About"
				className="font-display text-2xl md:text-3xl"
			/>
			<div className="flex flex-col md:flex-row justify-center items-center my-12 space-y-4 md:space-x-16 max-w-60 md:max-w-max">
				<div className="relative ">
					<div className="border-4 max-w-60 md:max-w-80 aspect-square border-secondary rounded-2xl overflow-hidden">
						<img
							src="about.webp"
							alt="Me"
							className="w-full h-full object-cover"
						/>
					</div>

					<div className="absolute left-0 lg:left-[70%] -bottom-0 translate-y-[110%] -translate-x-[120%] md:-translate-x-[70%] lg:-translate-x-[120%] scale-150 -z-10">
						<div className="relative">
							<ArrowMagic className="md:max-h-[200px] lg:hidden" />
							<ArrowMagicMD className="hidden lg:block lg:scale-[60%]" />
							<div className="absolute min-w-[100px] -bottom-8 lg:bottom-2 left-0 translate-x-[40%] md:translate-x-[20%] lg:translate-x-[85%] text-xs scale-[65%] lg:scale-[90%] -rotate-[30deg] lg:-rotate-[50deg]  font-light">
								Yes, I do magic
								<br /> in my spare time.
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col justify-between items-center md:items-start text-center md:text-start space-y-4 md:space-y-0">
					<div className="text-2xl md:text-3xl font-bold">
						HI THERE,
						<br />
						I’M JOÃO BARTOLOT
					</div>
					<div className="font-light w-full text-2xl md:text-3xl text-secondary">
						A full-stack developer
					</div>
					<div className="max-w-xs">
						I am passionate about turning ideas into digital
						realities.
						<br />I focus on creating web and mobile applications
						that truly resonate with users, combining intuitive
						design with smooth functionality. Let's work together to
						create something unique.
					</div>
				</div>
			</div>
			<DownloadCV />

			<Blob className="absolute top-0 left-0 -translate-x-2/3 md:-translate-x-1/2 w-3xl text-secondary/25 -z-20 blur-xl" />
			<BlobTwo className="absolute bottom-0 right-0 translate-x-2/3 w-sm md:w-xl rotate-45 aspect-square text-tertiary/25 -z-20 blur-xl" />

			<div className="absolute bottom-0 right-0 md:right-[50%] translate-y-[100%] translate-x-[30%] md:translate-x-[150%] lg:translate-x-[200%] rotate-[20deg]">
				<img
					src="sticker.png"
					alt="Sticker Coffee"
					className="w-[180px] md:w-[250px] lg:w-[300px]"
				/>
			</div>
		</section>
	);
};

export default About;
