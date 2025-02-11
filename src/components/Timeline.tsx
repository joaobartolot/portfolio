const experiences = [
	{
		year: '2020',
		company: 'Calindra',
		location: 'Rio de Janeiro, BR',
		role: 'Software Developer',
		description: `At Calindra, I had the opportunity to make a significant impact on various full-stack projects, 
        working on both backend and frontend areas. I contributed to building cloud infrastructure solutions, developing 
        features that enhance efficiency and user experience.`,
		icon: '/calindra.jpg',
	},
	{
		year: '2022',
		company: 'Trinks',
		location: 'Rio de Janeiro, BR',
		role: 'Software Developer',
		description: `At Trinks, I worked as a full-stack developer, contributing to both the existing website and a 
        project to transform our salon management system into a hybrid mobile app. My role spanned frontend and backend 
        development, as well as working with relational databases.`,
		icon: '/trinks.jpg',
	},
	{
		year: '2022',
		company: 'Trinks',
		location: 'Rio de Janeiro, BR',
		role: 'Software Developer',
		description: `At Trinks, I worked as a full-stack developer, contributing to both the existing website and a 
        project to transform our salon management system into a hybrid mobile app. My role spanned frontend and backend 
        development, as well as working with relational databases.`,
		icon: '/trinks.jpg',
	},
	{
		year: '2022',
		company: 'Trinks',
		location: 'Rio de Janeiro, BR',
		role: 'Software Developer',
		description: `At Trinks, I worked as a full-stack developer, contributing to both the existing website and a 
        project to transform our salon management system into a hybrid mobile app. My role spanned frontend and backend 
        development, as well as working with relational databases.`,
		icon: '/trinks.jpg',
	},
	{
		year: '2022',
		company: 'Trinks',
		location: 'Rio de Janeiro, BR',
		role: 'Software Developer',
		description: `At Trinks, I worked as a full-stack developer, contributing to both the existing website and a 
        project to transform our salon management system into a hybrid mobile app. My role spanned frontend and backend 
        development, as well as working with relational databases.`,
		icon: '/trinks.jpg',
	},
];

const CompanyIcon = ({ icon = '' }) => {
	return (
		<div className="relative h-50">
			<div className="rounded-full rounded-br-none bg-secondary w-fit h-fit p-1 overflow-hidden rotate-45">
				<div className="rounded-full overflow-hidden bg-secondary">
					<img
						src={icon}
						alt="company"
						className="min-w-12 w-12 aspect-square"
					/>
				</div>
			</div>
			<div className="h-30 w-[2px] bg-secondary absolute bottom-[24px] left-1/2 -translate-x-1/2"></div>
		</div>
	);
};

const Timeline = () => {
	return (
		// Outer container occupies full width but does not force horizontal overflow
		<div className="w-full py-10 text-white">
			{/* Scroll container limited to viewport width */}
			<div className="max-w-screen overflow-x-scroll">
				{/* Inner container expands as needed */}
				<div className="relative w-max px-10">
					{/* Timeline line */}
					<div className="absolute left-0 bottom-[28px] border-dashed border-b-2 border-white w-full"></div>
					<div className="flex items-end space-x-24">
						{experiences.map((exp, index) => (
							<div key={index} className="flex space-x-6">
								<div className="relative flex flex-col items-center text-center">
									<CompanyIcon icon={exp.icon} />
									<div className="absolute bottom-0 font-light text-sm">
										{exp.year}
									</div>
									<div className="absolute bottom-[18px] left-1/2 -translate-1/2 w-3 h-3 bg-secondary rounded-full"></div>
								</div>
								<div className="flex flex-col space-y-4 text-start min-w-[200px]">
									<div className="font-bold text-sm">
										{exp.role} at {exp.company}
										<br />
										<span className="font-light">
											{exp.location}
										</span>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Timeline;
