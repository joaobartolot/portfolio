import { useEffect, useState } from 'react'
import Blob from '../assets/blobs/blob1.svg?react'
import Game from '../components/Game'
import GameInstructions from '../components/GameInstructions'
import HeroTextEffect from '../components/HeroTextEffect'
import ScrollIndicator from '../components/ScrollIndicator'
import useMedia from '../hooks/useMedia'

const Hero = () => {
	const { md } = useMedia()
	const [playing, setPlaying] = useState(false)
	const [gameOver, setGameOver] = useState(false)
	const [score, setScore] = useState(0)

	const handleStart = () => {
		setPlaying(true)
		setGameOver(false)
		setScore(0)
	}

	const handleRetry = () => {
		setPlaying(true)
		setGameOver(false)
		setScore(0)
	}

	const handlePlayerDeath = () => {
		// When the player dies, unmount the Canvas.
		setPlaying(false)
		setGameOver(true)
	}

	const handleScoreChange = (newScore: number) => {
		setScore(newScore)
	}

	useEffect(() => {
		if (!md) setPlaying(false)
	}, [md])

	return (
		<section
			id="hero"
			className="relative flex h-screen w-full items-center justify-center overflow-visible"
			data-section
		>
			<div className="flex w-[80%] flex-col items-center justify-between md:flex-row md:space-y-0">
				<div className="font-display flex w-full justify-center text-start text-5xl md:m-0 md:w-1/2 md:text-5xl lg:text-7xl">
					<div className="h-[192px] w-[289px] lg:h-[288px] lg:w-[433px]">
						<HeroTextEffect />
					</div>
				</div>
				<div className="hidden aspect-square w-64 touch-auto overflow-visible md:ml-4 md:block md:w-1/2 md:pb-12">
					{playing || (
						<GameInstructions
							gameOver={gameOver}
							score={score}
							handleRetry={handleRetry}
							handleHowTo={() => setGameOver(false)}
							handleStart={handleStart}
						/>
					)}
				</div>
			</div>
			{!playing || (
				<div className="absolute inset-0 z-[-1] h-screen w-screen">
					<Game
						onScoreChange={handleScoreChange}
						onPlayerDeath={handlePlayerDeath}
					/>
				</div>
			)}
			<ScrollIndicator className="absolute bottom-16 md:bottom-12" />
			<Blob className="text-secondary/25 absolute top-0 right-0 -z-10 h-full w-full scale-150 blur-2xl md:w-[50%]" />
		</section>
	)
}

export default Hero
