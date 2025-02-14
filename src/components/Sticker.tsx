import { motion } from 'framer-motion';

const stickerRevealVariants = {
	hidden: { x: '100%' }, // Starts fully off-screen to the right
	visible: {
		x: '0%',
		transition: {
			duration: 0.8,
			ease: 'easeInOut',
		},
	},
};
const topRevealVariants = {
	hidden: { translateX: '0%' }, // Starts fully off-screen to the right
	visible: {
		translateX: '-110%',
		transition: {
			duration: 1.2,
			ease: 'easeInOut',
		},
	},
};
const Sticker = () => {
	return (
		<div className="relative w-[180px] md:w-[250px] lg:w-[300px] aspect-square overflow-hidden">
			<motion.div
				variants={stickerRevealVariants}
				initial="hidden"
				animate="visible"
				transition={{ duration: 1, ease: 'easeOut' }}
			>
				<img
					src="sticker.png"
					alt="Sticker Coffee"
					className="w-full h-full aspect-1 object-cover"
				/>
			</motion.div>

			<div className="absolute top-0 w-full h-full">
				<motion.div
					variants={topRevealVariants}
					initial="hidden"
					animate="visible"
					className="relative h-20 rotate-13"
				>
					<div className="absolute top-[12px] right-0 h-[131px] w-[50px] bg-[#f7e5c0] shadow-md rounded-r-lg clip-bottom-long" />
				</motion.div>
			</div>
		</div>
	);
};

export default Sticker;
