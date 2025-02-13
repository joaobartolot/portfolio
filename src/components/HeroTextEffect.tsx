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
					.typeString(
						'<span class="text-secondary">Ideas</span>,<br />'
					)
					.typeString('Crafting <br />')
					.typeString('<span class="text-secondary">Solutions</span>')
					.start();
			}}
		/>
	);
};

export default HeroTextEffect;
