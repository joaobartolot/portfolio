import { useCallback, useEffect, useState } from 'react'

const breakpoints = {
	sm: '(min-width: 640px)',
	md: '(min-width: 768px)',
	lg: '(min-width: 1024px)',
	xl: '(min-width: 1280px)',
	'2xl': '(min-width: 1536px)',
}

const useMedia = () => {
	const getMatches = useCallback(
		() =>
			Object.fromEntries(
				Object.entries(breakpoints).map(([key, query]) => [
					key,
					window.matchMedia(query).matches,
				])
			),
		[]
	)

	const [matches, setMatches] = useState(getMatches)

	useEffect(() => {
		const updateMatches = () => {
			const newMatches = getMatches()
			setMatches(prev =>
				JSON.stringify(prev) === JSON.stringify(newMatches)
					? prev
					: newMatches
			)
		}

		window.addEventListener('resize', updateMatches)
		return () => window.removeEventListener('resize', updateMatches)
	}, [getMatches])

	return matches
}

export default useMedia
