import { motion } from 'framer-motion';
import { useState } from 'react';

const Projects = () => {
	const projects = [
		{
			id: 1,
			title: 'Doces da Juli',
			link: 'https://doces-juli.vercel.app/',
			description:
				'Doces da Juli is a website I built for Juliana Castelo to organize and display her catalog of cakes and desserts. It helps her easily manage her products while giving customers a simple way to browse and place orders.',
			tech: 'React, TailwindCSS, Firebase, Nest.js',
			image: '/images/doces-juli.png',
			alt: 'E-commerce project using vite, react, tailwind, nest and firebase',
		},
	];

	const [clickedProject, setClickedProject] = useState<number | null>(null);
	const [hoveredProject, setHoveredProject] = useState<number | null>(null);

	return (
		<section
			id="projects"
			className="flex flex-col items-center min-h-screen w-full py-24"
		>
			<div className="w-full text-start text-2xl mb-8 font-bold font-display">
				Projects
			</div>
			<div className="flex flex-wrap justify-center md:justify-around w-full space-y-8">
				{projects.map(project => {
					const isClicked = clickedProject === project.id;
					const isHovered = hoveredProject === project.id;

					return (
						<motion.div
							key={project.id}
							onHoverStart={() => setHoveredProject(project.id)}
							onHoverEnd={() => {
								setHoveredProject(null);
								setClickedProject(null);
							}}
							onClick={() =>
								setClickedProject(prev =>
									prev === project.id ? null : project.id
								)
							}
							className="relative w-full md:w-5/6 bg-gunmetal rounded-lg shadow-md"
						>
							<motion.img
								animate={{
									borderBottomLeftRadius:
										isClicked || isHovered
											? '0rem'
											: '0.5rem',
									borderBottomRightRadius:
										isClicked || isHovered
											? '0rem'
											: '0.5rem',
									borderTopLeftRadius: '0.5rem',
									borderTopRightRadius: '0.5rem',
								}}
								transition={{
									duration: 0.3,
									ease: 'easeOut',
								}}
								className="w-full transition"
								src={project.image}
								alt={project.alt}
							/>
							<motion.div
								initial={false}
								animate={{
									height:
										isClicked || isHovered ? 'auto' : '0',
								}}
								transition={{ duration: 0.3, ease: 'easeOut' }}
								className="flex flex-col items-start text-start text-white overflow-hidden rounded-lg"
							>
								<div className="p-4">
									<a
										href={project.link}
										target="_blank"
										rel="noopener noreferrer"
										className="flex flex-row justify-center items-center text-lg md:text-xl font-bold"
									>
										{project.title}
										<svg
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 aspect-1 rotate-45 ml-2 stroke-gray-400 opacity-50"
											stroke="black"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<path d="M5.93866 9.12287L12 3.06152L18.0613 9.12287"></path>
											<path d="M12 21.0615L12 3.06152"></path>
										</svg>
									</a>
									<p className="text-sm mt-2">
										{project.description}
									</p>
									<p className="text-sm mt-2 italic">
										Tech used: {project.tech}
									</p>
								</div>
							</motion.div>
						</motion.div>
					);
				})}
			</div>
		</section>
	);
};

export default Projects;
