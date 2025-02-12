import Marquee from 'react-fast-marquee';

const TechStackSlider = () => {
	return (
		<div className="absolute -top-0 md:top-0 h-16 w-full bg-tertiary -z-10">
			<Marquee autoFill speed={30} className="w-full h-full">
				<img
					src="/aws.png"
					alt="Django"
					className="w-10 aspect-square object-cover mx-4"
				/>
				<img
					src="/css.png"
					alt="Django"
					className="w-10 aspect-square object-cover mx-4"
				/>
				<img
					src="/html.png"
					alt="Django"
					className="w-10 aspect-square object-cover mx-4"
				/>
				<img
					src="/js.png"
					alt="Django"
					className="w-10 aspect-square object-cover mx-4"
				/>
				<img
					src="/node.png"
					alt="Django"
					className="w-10 aspect-square object-cover mx-4"
				/>
				<img
					src="/react.png"
					alt="Django"
					className="w-10 aspect-square object-cover mx-4"
				/>
				<img
					src="/python.png"
					alt="Django"
					className="w-10 aspect-square object-cover mx-4"
				/>
				<img
					src="/django.png"
					alt="Django"
					className="w-10 aspect-square object-cover mx-4"
				/>
				<img
					src="/flask.png"
					alt="Django"
					className="w-10 aspect-square object-cover mx-4"
				/>
				<img
					src="/firebase.png"
					alt="Django"
					className="w-10 aspect-square object-cover mx-4"
				/>
				<img
					src="/git.png"
					alt="Django"
					className="w-10 aspect-square object-cover mx-4"
				/>
				<img
					src="/java.png"
					alt="Django"
					className="w-10 aspect-square object-cover mx-4"
				/>
			</Marquee>
		</div>
	);
};

export default TechStackSlider;
