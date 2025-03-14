import Button from './Button'

interface GameInstructionsProps {
	gameOver: boolean
	score: number
	handleRetry: () => void
	handleHowTo: () => void
	handleStart: () => void
}

const GameInstructions = ({
	gameOver = false,
	score = 0,
	handleRetry,
	handleHowTo,
	handleStart,
}: GameInstructionsProps) => {
	return (
		<div className="flex h-full w-full items-center justify-center">
			{gameOver ? (
				<div className="flex flex-col gap-6">
					<div className="flex flex-col justify-center gap-1">
						<h2 className="font-display text-3xl">GAME OVER</h2>
						<p className="max-w-96">
							Mission failed, but don’t worry, we have a backup,
							you can try again!
						</p>
					</div>
					<div className="flex flex-col justify-center gap-1">
						<p className="text-tertiary text-lg font-bold">
							your score
						</p>
						<div className="flex items-center justify-center gap-2">
							<img src="/asteroid.png" className="h-5 w-5" />
							<p className="font-semibold">{score}</p>
						</div>
					</div>
					<div className="flex items-center justify-center">
						<Button onClick={handleRetry}>try again</Button>
					</div>
					<div className="flex items-center justify-center">
						<button
							className="text-secondary hover:text-tertiary cursor-pointer hover:underline"
							onClick={handleHowTo}
						>
							How to play?
						</button>
					</div>
				</div>
			) : (
				<div className="flex flex-col gap-6">
					<div className="flex flex-col items-center justify-center gap-2">
						<h2 className="font-display text-3xl">
							protect the{' '}
							<span className="text-tertiary">code</span>
						</h2>
						<p className="font-body max-w-80">
							Our code is on a server threatened by asteroids and
							our duty is to protect it.
						</p>
					</div>
					<div className="flex max-w-[450px] flex-col gap-2 rounded-lg border-2 border-white p-4 text-start">
						<div className="flex gap-4">
							<img
								src="./keyboard.svg"
								alt="Keyboard icon"
								className="aspect-square w-7"
							/>
							Control the ship using W (up), A (left), S (down),
							and D (right)
						</div>
						<div className="flex gap-4">
							<img
								src="./space.svg"
								alt="Keyboard icon"
								className="aspect-square w-7"
							/>
							Use space to shoot
						</div>
						<div className="flex gap-4">
							<img
								src="./heart.svg"
								alt="Keyboard icon"
								className="aspect-square w-6"
							/>
							You have 3 lives.
						</div>
						<div className="flex gap-4">
							<img
								src="./retry.svg"
								alt="Keyboard icon"
								className="aspect-square w-6"
							/>
							You lose if the server is hit or the ship explodes
							all 3 times.
						</div>
					</div>
					<div className="flex justify-center">
						<Button onClick={handleStart}>Play Now</Button>
					</div>
				</div>
			)}
		</div>
	)
}

export default GameInstructions
