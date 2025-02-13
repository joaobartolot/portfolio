import Typewriter from 'typewriter-effect';

const HeroTextEffect = () => {
	return (
		<Typewriter
			options={{
				autoStart: true,
				loop: false,
				delay: 75,
				cursor: '_',
			}}
			onInit={typewriter => {
				typewriter
					.typeString('Coding <br />')
					.pauseFor(300)
					.typeString(
						'<span class="text-secondary">Ideas</span>,<br />'
					)
					.pauseFor(300)
					.typeString('Crafting <br />')
					.pauseFor(300)
					.typeString('<span class="text-secondary">Solutions</span>')
					.start();
			}}
		/>
	);
};

export default HeroTextEffect;
