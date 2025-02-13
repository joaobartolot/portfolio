import AnimatedSectionTitle from './AnimatedSectionTitle';
import ProjectCard from './ProjectCard';
import TechStackSlider from './TechStackSlider';

const projects = [
	{
		name: 'MR. GULA',
		image: '/mrgula.png',
		techStack: ['React', 'TailwindCSS', 'Sanity CMS'],
		link: 'https://mr-gula.vercel.app/',
	},
];

const Projects = () => {
	return (
		<section
			className="relative flex flex-col justify-center items-center"
			id="projects"
			data-section
		>
			{/* Slider */}
			<TechStackSlider />
			{/* Content Wrapper */}
			<div className="relative flex flex-col items-center justify-center w-full h-full py-6">
				{/* iPhone Image */}
				<div className=" flex flex-col w-full">
					<div className="flex justify-center xl:items-center border-b border-secondary md:border-none w-full px-2 pb-12 md:p-0 space-x-2 md:space-x-12 xl:space-x-24">
						<img
							src="iphone.png"
							alt="Mr. Gula website"
							className="md:p-0 h-full w-full max-w-[200px] md:max-w-[250px] xl:max-w-[350px] object-cover"
						/>

						{/* Project Description */}
						<div className="pt-[50px] px-2 text-start space-y-2 md:space-y-4 md:border-b border-secondary pb-2 max-h-[300px]">
							<AnimatedSectionTitle
								word="Projects"
								className="font-display text-xl md:text-2xl lg:text-3xl"
							/>
							<p className="text-xs md:text-base max-w-[180px] md:max-w-[300px]">
								The projects I develop use the latest
								technologies and are tailored to meet each
								client's specific needs. Over the years, I’ve
								worked on various projects, both at companies
								I’ve been part of and as a freelancer,
								delivering custom solutions that drive results.
							</p>
						</div>
					</div>
				</div>
				<div className="flex justify-center space-x-4 overflow-hidden pb-4 w-full my-12">
					{projects.map((project, index) => (
						<ProjectCard key={index} {...project} />
					))}
				</div>
			</div>
		</section>
	);
};

export default Projects;
