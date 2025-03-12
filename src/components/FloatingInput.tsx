import React, { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface FloatingInputProps {
	label: string
	id: string
	type?: 'text' | 'email' | 'password' | 'number' | 'textarea'
	value?: string
	onChange?: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void
}

const FloatingInput: React.FC<FloatingInputProps> = ({
	label,
	id,
	type = 'text',
	value = '',
	onChange,
}) => {
	const isTextarea = type === 'textarea'
	const [isFocused, setIsFocused] = useState(false)

	const handleFocus = () => setIsFocused(true)
	const handleBlur = () => {
		if (!value) setIsFocused(false)
	}

	// Update focus state when value changes
	useEffect(() => {
		if (!value) {
			setIsFocused(false)
		}
	}, [value])

	return (
		<div className="relative w-full">
			{isTextarea ? (
				<textarea
					id={id}
					className="focus:border-secondary peer block w-full resize-none appearance-none rounded-lg border border-white bg-transparent px-4 pt-4 pb-2.5 text-base text-white focus:ring-0 focus:outline-none"
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
					className="focus:border-secondary peer block w-full appearance-none rounded-lg border border-white bg-transparent px-4 pt-4 pb-2.5 text-base text-white focus:ring-0 focus:outline-none"
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
					'bg-primary absolute start-1 z-10 origin-[0] transform rounded-full px-2 text-sm text-white/30 duration-300',
					isFocused || value
						? 'text-secondary top-1.5 -translate-y-4 scale-80 px-2'
						: isTextarea
							? 'top-3 peer-placeholder-shown:top-3'
							: 'peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2'
				)}
			>
				{label}
			</label>
		</div>
	)
}

export default FloatingInput
