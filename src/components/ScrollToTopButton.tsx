const ScrollToTopButton = () => {
	return (
		<button
			className="fixed bottom-22 right-5 rounded-2xl bg-secondary hover:bg-tertiary p-2"
			onClick={() => window.scrollTo(0, 0)}
		>
			<img
				src="/arrow.png"
				alt="Arrow icon"
				className="w-8 aspect-square rotate-180"
			/>
		</button>
	);
};

export default ScrollToTopButton;
