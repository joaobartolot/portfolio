import { motion } from 'framer-motion'
import { twJoin } from 'tailwind-merge'

interface PaginationProps {
	length: number
	activeIndex: number
	onChange: (index: number) => void
	className?: string
}

const Pagination = ({
	length,
	activeIndex,
	onChange,
	className,
}: PaginationProps) => {
	return (
		<div
			className={twJoin(
				'lg:hidden flex justify-center gap-3 mt-6',
				className
			)}
		>
			{Array.from({ length }).map((_, index) => (
				<div
					key={index}
					className="relative cursor-pointer"
					onClick={() => onChange(index)} // Handle click event
				>
					<div
						className={twJoin(
							'w-4 h-4 rounded-full border-3 transition-all',
							activeIndex === index
								? 'border-white'
								: 'border-gray-500'
						)}
					>
						<motion.div
							className="absolute inset-0 bg-white rounded-full"
							initial={{ scale: 0 }}
							animate={{ scale: activeIndex === index ? 1 : 0 }}
							transition={{ duration: 0.3 }}
						/>
					</div>
				</div>
			))}
		</div>
	)
}

export default Pagination
