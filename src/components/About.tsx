import Button from './Button';

const About = () => {
	return (
		<section
			id="about"
			className="flex flex-col justify-center items-center w-full py-16"
		>
			<div className="font-display text-2xl">About_</div>
			<div className="flex flex-col md:flex-row my-24 max-h-80 space-x-16">
				<div className="border-4 max-h-80 max-w-80 aspect-square border-secondary rounded-md overflow-hidden">
					<img
						src="about.webp"
						alt="Me"
						className="w-full h-full object-cover"
					/>
				</div>
				<div className="flex flex-col justify-between text-start">
					<div className="text-3xl font-bold">
						HI THERE,
						<br />
						I’M JOÃO BARTOLOT
					</div>
					<div className="font-light w-full text-3xl text-secondary">
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
