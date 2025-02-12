import AnimatedSectionTitle from './AnimatedSectionTitle';
import Button from './Button';

const About = () => {
	return (
		<section
			id="about"
			className="flex flex-col justify-center items-center w-full py-16"
			data-section
		>
			<AnimatedSectionTitle
				word="About"
				className="font-display text-2xl md:text-3xl"
			/>
			<div className="flex flex-col md:flex-row justify-center items-center my-12 space-y-4 md:space-x-16 max-w-60 md:max-w-max">
				<div className="border-4 max-w-60 md:max-w-80 aspect-square border-secondary rounded-2xl overflow-hidden">
					<img
						src="about.webp"
						alt="Me"
						className="w-full h-full object-cover"
					/>
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
			<Button>Download CV</Button>
		</section>
	);
};

export default About;
