import Typewriter from 'typewriter-effect';

const HeroTextEffect = () => {
	return (
		<div className="text-4xl font-bold w-[217px] h-[160px] md:w-[289px] md:h-[192px]">
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
						.typeString(
							'<span class="text-secondary">Solutions</span>'
						)
						.start();
				}}
			/>
		</div>
	);
};

export default HeroTextEffect;
