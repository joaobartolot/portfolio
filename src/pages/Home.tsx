import Experience from '../features/experience/components/Experience';
import Hero from '../features/hero/components/Hero';
import Projects from '../features/projects/components/Projects';

const Home = () => {
	return (
		<div className="flex flex-col justify-center items-center md:w-9/12">
			<Hero />
			<Experience />
			<Projects />
		</div>
	);
};

export default Home;
