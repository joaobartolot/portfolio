import React from 'react';
import ArrowIcon from '../assets/icons/arrow.svg?react';

interface ScrollIndicatorProps {
	className?: string;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ className }) => {
	return (
		<div className={className}>
			<div className="hidden md:flex w-5 h-10 border-2 border-white rounded-full justify-center items-start relative">
				<div className="w-1 h-2 bg-white rounded-full animate-slow-bounce mt-2"></div>
			</div>
			<ArrowIcon className="md:hidden animate-slow-bounce" />
		</div>
	);
};

export default ScrollIndicator;
