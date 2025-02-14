import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface FloatingInputProps {
	label: string;
	id: string;
	type?: 'text' | 'email' | 'password' | 'number' | 'textarea';
	value?: string;
	onChange?: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
}

const FloatingInput: React.FC<FloatingInputProps> = ({
	label,
	id,
	type = 'text',
	value = '',
	onChange,
}) => {
	const isTextarea = type === 'textarea';
	const [isFocused, setIsFocused] = useState(false);

	const handleFocus = () => setIsFocused(true);
	const handleBlur = () => {
		if (!value) setIsFocused(false);
	};

	// Update focus state when value changes
	useEffect(() => {
		if (!value) {
			setIsFocused(false);
		}
	}, [value]);

	return (
		<div className="relative w-full">
			{isTextarea ? (
				<textarea
					id={id}
					className="block w-full resize-none rounded-lg border border-white bg-transparent px-4 pb-2.5 pt-4 text-base text-white appearance-none focus:border-secondary focus:outline-none focus:ring-0 peer"
					placeholder=" "
					value={value}
					onChange={onChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
					rows={4}
				/>
			) : (
				<input
					type={type}
					id={id}
					className="block w-full rounded-lg border border-white bg-transparent px-4 pb-2.5 pt-4 text-base text-white appearance-none focus:border-secondary focus:outline-none focus:ring-0 peer"
					placeholder=" "
					value={value}
					onChange={onChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
				/>
			)}
			<label
				htmlFor={id}
				className={twMerge(
					'absolute z-10 origin-[0] rounded-full bg-primary px-2 text-white/30 text-sm duration-300 transform start-1',
					isFocused || value
						? 'px-2 text-secondary top-1.5 scale-80 -translate-y-4'
						: isTextarea
							? 'top-3 peer-placeholder-shown:top-3'
							: 'peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2'
				)}
			>
				{label}
			</label>
		</div>
	);
};

export default FloatingInput;
