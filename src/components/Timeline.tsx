import { twJoin } from 'tailwind-merge'
import { Experience } from '../types/experience'
import TimelineItem from './TimelineItem'

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
	return (
		<div className="block w-full py-6 pl-18 text-white">
			<div
				className={twJoin(
					'flex flex-col md:flex-row w-full space-y-12 border-dashed border-l-2 border-white py-12',
					'md:border-b-2 md:border-l-0 md:py-0 md:px-12 md:space-y-0'
				)}
			>
				{experiences.map(exp => (
					<TimelineItem experience={exp} />
				))}
			</div>
		</div>
	)
}

export default Timeline
