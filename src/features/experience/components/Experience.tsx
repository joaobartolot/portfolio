import { Work } from '../types/Work';

const experience: Work[] = [
	{
		name: 'calindra',
		dateRange: '2021 - Present',
		position: 'Software developer at Calindra',
		location: 'Rio de Janeiro, BR',
		description: `At Calindra, I had the opportunity to make a significant impact on various full-stack projects, working on both backend and frontend areas. I contributed to building cloud infrastructure solutions, developing features that enhance efficiency and user experience.`,
		logo: 'images/calindra_logo.jpg',
	},
	{
		name: 'trinks',
		dateRange: '2019 - 2020',
		position: 'Software developer at Trinks',
		location: 'Rio de Janeiro, BR',
		description: `At Trinks, I worked as a full-stack developer, contributing to both the existing website and a project to transform our salon management system into a hybrid mobile app. My role spanned frontend and backend development, as well as working with relational databases.`,
		logo: 'images/trinks_logo.jpg',
	},
];

const Experience = () => {
	return (
		<section
			id="experience"
			className="flex flex-col justify-center items-center h-screen"
		>
			<div className="w-full md:w-9/12 text-start text-2xl mb-8 font-bold font-display">
				Experience
			</div>
			{experience.map(work => (
				<div className="flex flex-col md:flex-row justify-center md:justify-center items-start md:items-center space-x-0 space-y-4 md:space-x-8 md:space-y-0 w-full md:w-9/12 even:bg-gunmetal even:shadow-sm rounded-lg px-8 py-6">
					<div>
						<div className="flex justify-center items-center h-10 aspect-1 rounded-full overflow-hidden">
							<img
								src={work.logo}
								alt={work.name}
								loading="lazy"
								className="object-cover"
							/>
						</div>
					</div>
					<div className="flex flex-col justify-start items-start w-full">
						<p className="text-sm text-paynes-gray-600 font-semibold">
							{work.dateRange}
						</p>
						<div className="text-lg md:text-xl font-bold">
							{work.position}
						</div>
						<div>{work.location}</div>
						<div className="mt-4 text-start">
							{work.description}
						</div>
					</div>
				</div>
			))}
		</section>
	);
};

export default Experience;
