import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { twJoin } from 'tailwind-merge'
import useMedia from '../hooks/useMedia'
import CompanyIcon from './CompanyIcon'

interface Experience {
	year: string
	company: string
	location: string
	role: string
	description: string
	icon: string
}

const experiences: Experience[] = [
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
]

const Timeline: React.FC = () => {
	const { md } = useMedia()
	const sectionRef = useRef<HTMLDivElement | null>(null)
	const isInView = useInView(sectionRef, {
		margin: '0px',
		once: false,
		amount: md ? 1 : 0.5,
	})

	const descriptionVariant = {
		hidden: md
			? { y: 0, x: -100, opacity: 0 }
			: { y: -50, x: 0, opacity: 0 },
		visible: { y: 0, x: 0, opacity: 1 },
	}

	return (
		<div className="block w-full py-6 pl-18 text-white">
			<div
				ref={sectionRef}
				className={twJoin(
					'flex flex-col md:flex-row w-full space-y-12 border-dashed border-l-2 border-white py-12',
					'md:border-b-2 md:border-l-0 md:py-0 md:px-12 md:space-y-0 md:min-h-[165px]'
				)}
			>
				{experiences.map(exp => (
					<div className="flex flex-col md:flex-row" key={exp.year}>
						<CompanyIcon
							icon={exp.icon}
							year={exp.year}
							isAnimated={isInView}
						/>
						<motion.div
							variants={descriptionVariant}
							initial="hidden"
							animate={isInView ? 'visible' : 'hidden'}
							transition={{ delay: 0.4, duration: 0.3 }}
							className="px-4 text-start text-sm md:pb-4"
						>
							<div className="font-bold">
								{exp.role} at {exp.company}
							</div>
							<div className="font-light mb-2.5">
								{exp.location}
							</div>
							<div className="max-w-prose md:max-w-[250px] text-xs">
								{exp.description}
							</div>
						</motion.div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Timeline
