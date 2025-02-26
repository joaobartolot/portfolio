import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import useMedia from '../hooks/useMedia'
import { Experience } from '../types/experience'
import CompanyIcon from './CompanyIcon'

interface TimelineItemProps {
	experience: Experience
}

const TimelineItem: React.FC<TimelineItemProps> = ({ experience }) => {
	const { md } = useMedia()
	const sectionRef = useRef<HTMLDivElement | null>(null)
	const isInView = useInView(sectionRef, {
		margin: '0px',
		once: true,
		amount: md ? 1 : 0.5,
	})

	const descriptionVariant = {
		hidden: md
			? { y: 0, x: -100, opacity: 0 }
			: { y: -50, x: 0, opacity: 0 },
		visible: { y: 0, x: 0, opacity: 1 },
	}

	return (
		<div
			ref={sectionRef}
			className="flex flex-col md:flex-row md:min-h-[165px]"
			key={experience.year}
		>
			<CompanyIcon
				icon={experience.icon}
				year={experience.year}
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
					{experience.role} at {experience.company}
				</div>
				<div className="font-light mb-2.5">{experience.location}</div>
				<div className="max-w-prose md:max-w-[250px] text-xs">
					{experience.description}
				</div>
			</motion.div>
		</div>
	)
}

export default TimelineItem
