import { motion } from 'framer-motion';
import { twJoin } from 'tailwind-merge';
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
			className="flex flex-col justify-center items-center min-h-screen py-24"
		>
			<div className="w-full text-start text-2xl mb-8 font-bold font-display">
				Experience
			</div>
			{experience.map((work, i) => (
				<motion.div
					key={work.name}
					initial={{ x: i % 2 === 0 ? -200 : 200, opacity: 0 }}
					whileInView={{ x: 0, opacity: 1 }}
					viewport={{ amount: 0.2 }} // Animation triggers when 30% of the component is visible
					transition={{ duration: 0.3, ease: 'easeOut' }}
					className={twJoin(
						'flex flex-col md:flex-row items-start md:items-center',
						'space-x-0 space-y-4 md:space-x-8 md:space-y-0',
						'even:bg-gunmetal even:shadow-md rounded-lg px-8 py-6'
					)}
				>
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
						<div className="text-sm">{work.location}</div>
						<div className="mt-4 text-start">
							{work.description}
						</div>
					</div>
				</motion.div>
			))}
		</section>
	);
};

export default Experience;
