import { motion } from 'framer-motion'
import { twJoin } from 'tailwind-merge'
import useMedia from '../hooks/useMedia'

interface CompanyIconProps {
	icon: string
	year: string
	isAnimated: boolean
}

const CompanyIcon: React.FC<CompanyIconProps> = ({
	icon,
	year,
	isAnimated,
}) => {
	const { md } = useMedia()

	const stickVariant = {
		hidden: md
			? { y: -100, x: 0, opacity: 0 }
			: { y: 0, x: 50, opacity: 0 },
		visible: { y: 0, x: 0, opacity: 1 },
	}

	const iconVariant = {
		hidden: md
			? { x: -80, y: -80, opacity: 0 }
			: { x: 40, y: -40, opacity: 0 },
		visible: { x: 0, y: 0, opacity: 1 },
	}

	const yearVariant = {
		hidden: md ? { y: 20, x: 0, opacity: 0 } : { y: 0, x: -20, opacity: 0 },
		visible: { y: 0, x: 0, opacity: 1 },
	}

	return (
		<motion.div className="relative my-10 md:mx-10 md:my-0 md:pt-14">
			<motion.div
				variants={stickVariant}
				initial="hidden"
				animate={isAnimated ? 'visible' : 'hidden'}
				transition={{ duration: 0.3 }}
				className={twJoin(
					'bg-secondary z-10 h-[2px] w-[24px]',
					'md:h-[100%] md:w-[2px]'
				)}
			/>
			<motion.div
				variants={iconVariant}
				initial="hidden"
				animate={isAnimated ? 'visible' : 'hidden'}
				transition={{ duration: 0.3 }}
				className={twJoin(
					'absolute -translate-y-[52%] translate-x-1/2 rounded-[90px] rounded-bl-lg',
					'bg-secondary h-fit w-fit rotate-45 overflow-hidden p-1',
					'md:top-0 md:-translate-x-[48%] md:translate-y-0 md:rounded-full md:rounded-br-lg'
				)}
			>
				<div className="bg-secondary overflow-hidden rounded-full">
					<img
						src={icon}
						alt="company"
						className="aspect-square w-12 min-w-12 -rotate-45"
					/>
				</div>
			</motion.div>
			<motion.div
				initial={{ scale: 0, opacity: 0 }}
				animate={
					isAnimated
						? { scale: 1, opacity: 1 }
						: { scale: 0, opacity: 0 }
				}
				transition={{
					delay: 0.4,
					duration: 0.2,
				}}
				className={twJoin(
					'bg-secondary absolute -left-0.5 h-3 w-3 -translate-x-1/2 -translate-y-[60%] rounded-full',
					'md:left-0 md:-translate-x-[40%] md:-translate-y-[50%]'
				)}
			/>
			<motion.div
				variants={yearVariant}
				initial="hidden"
				animate={isAnimated ? 'visible' : 'hidden'}
				transition={{
					delay: 0.5,
					duration: 0.2,
				}}
				className={twJoin(
					'absolute -left-5 -translate-x-[100%] -translate-y-1/2 text-xs',
					'md:left-0 md:-translate-x-1/2 md:translate-y-[70%]'
				)}
			>
				{year}
			</motion.div>
		</motion.div>
	)
}

export default CompanyIcon
