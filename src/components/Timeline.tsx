import { twJoin } from 'tailwind-merge';

const experiences = [
	{
		year: '2022',
		company: 'Calindra',
		location: 'Rio de Janeiro, BR',
		role: 'Software Developer',
		description: `At Calindra, I had the opportunity to make a significant impact on various full-stack projects, 
		working on both backend and frontend areas. I contributed to building cloud infrastructure solutions, developing 
		features that enhance efficiency and user experience.`,
		icon: '/calindra.jpg',
	},
	{
		year: '2020',
		company: 'Trinks',
		location: 'Rio de Janeiro, BR',
		role: 'Software Developer',
		description: `At Trinks, I worked as a full-stack developer, contributing to both the existing website and a 
		project to transform our salon management system into a hybrid mobile app. My role spanned frontend and backend 
		development, as well as working with relational databases.`,
		icon: '/trinks.jpg',
	},
];

const CompanyIcon = ({ icon = '', year = '' }) => {
	return (
		<div className="relative my-10 md:my-0 md:mx-10">
			<div
				className={twJoin(
					'h-[2px] w-[24px] bg-secondary z-10',
					'md:w-[2px] md:h-[100%]'
				)}
			></div>
			<div
				className={twJoin(
					'absolute -translate-y-[52%] translate-x-1/2 rounded-[90px] rounded-bl-lg',
					'bg-secondary w-fit h-fit p-1 overflow-hidden rotate-45',
					'md:top-0 md:-translate-x-[48%] md:translate-y-0 md:rounded-br-lg md:rounded-full'
				)}
			>
				<div className="rounded-full overflow-hidden bg-secondary">
					<img
						src={icon}
						alt="company"
						className="min-w-12 w-12 aspect-square -rotate-45"
					/>
				</div>
			</div>
			<div
				className={twJoin(
					'absolute -left-0.5 -translate-x-1/2 -translate-y-[60%] w-3 h-3 bg-secondary rounded-full',
					'md:left-0 md:-translate-x-[40%] md:-translate-y-[50%]'
				)}
			/>
			<div
				className={twJoin(
					'absolute -left-5 -translate-x-[100%] -translate-y-1/2 text-xs',
					'md:left-0 md:-translate-x-1/2 md:translate-y-[70%]'
				)}
			>
				{year}
			</div>
		</div>
	);
};

const Timeline = () => {
	return (
		<div className="block w-full py-6 pl-18 text-white">
			<div
				className={twJoin(
					'flex flex-col md:flex-row w-full space-y-12 border-dashed border-l-2 border-white py-12',
					'md:border-b-2 md:border-l-0 md:py-0 md:px-12 md:space-y-0'
				)}
			>
				{experiences.map(exp => (
					<div className="flex flex-col md:flex-row">
						<CompanyIcon icon={exp.icon} year={exp.year} />
						<div className="px-4 text-start text-sm md:pb-4">
							<div className="font-bold">
								{exp.role} at {exp.company}
							</div>
							<div className="font-light mb-2.5">
								{exp.location}
							</div>
							<div className="max-w-prose md:max-w-[250px] text-xs">
								{exp.description}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Timeline;
