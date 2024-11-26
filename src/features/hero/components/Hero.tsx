import ScrollIndicator from './ScrollIndicator';

const Hero = () => {
	return (
		<section className="relative flex flex-col justify-center items-center h-screen">
			<div className="w-32 h-32 rounded-full overflow-hidden">
				<img
					src="/images/avatar.jpg"
					alt="avatar"
					loading="lazy"
					className="object-cover"
				/>
			</div>
			<h2 className="text-3xl mt-6 font-display">João Bartolot</h2>
			<p className="w-full md:w-3/6 text-gray-300">
				Hi there, I'm a full-stack developer who loves turning ideas
				into digital realities. I focus on creating web and mobile
				applications that truly resonate with users, combining intuitive
				design with smooth functionality. Let's work together to create
				something unique
			</p>
			<ScrollIndicator className="absolute bottom-20 md:bottom-6 left-1/2 transform -translate-x-1/2" />
		</section>
	);
};

export default Hero;
