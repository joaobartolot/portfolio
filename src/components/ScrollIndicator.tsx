import React from 'react';

interface ScrollIndicatorProps {
	className?: string;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ className }) => {
	return (
		<div className={className}>
			<div className="w-5 h-10 border-2 border-white rounded-full flex justify-center items-start relative">
				<div className="w-1 h-2 bg-white rounded-full animate-slow-bounce mt-2"></div>
			</div>
		</div>
	);
};

export default ScrollIndicator;
