import { Canvas, useFrame } from '@react-three/fiber'
import { useCallback, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import HeartIcon from '../assets/icons/heart.svg?react'
import Asteroid from './objects/Asteroid'
import Bullet from './objects/Bullet'
import Explosion from './objects/Explosion'
import PlayerShip from './objects/PlayerShip'

export type BulletData = {
	id: string
	position: [number, number, number]
	direction: THREE.Vector3
}

export type AsteroidData = {
	id: string
	difficulty: number
}

type GameProps = {
	onScoreChange?: (score: number) => void
	onPlayerDeath?: () => void
}

const BULLET_RADIUS = 0.5 * 0.05 // half of BULLET_SIZE (0.05)
const MIN_ASTEROIDS = 10
const SHIP_SIZE = 0.4

// CollisionManager: handles bullet–asteroid collisions.
const CollisionManager = ({
	bulletRefs,
	asteroidRefs,
	removeBullet,
	removeAsteroid, // called for collision (score update)
}: {
	bulletRefs: React.MutableRefObject<Record<string, THREE.Mesh>>
	asteroidRefs: React.MutableRefObject<Record<string, THREE.Mesh>>
	removeBullet: (id: string) => void
	removeAsteroid: (id: string) => void
}) => {
	useFrame(() => {
		for (const bulletId of Object.keys(bulletRefs.current)) {
			const bulletMesh = bulletRefs.current[bulletId]
			if (!bulletMesh) continue
			const bulletPos = bulletMesh.position
			let collisionFound = false
			for (const asteroidId of Object.keys(asteroidRefs.current)) {
				if (collisionFound) break
				const asteroidMesh = asteroidRefs.current[asteroidId]
				if (!asteroidMesh) continue
				const asteroidRadius = asteroidMesh.scale.x / 2
				if (
					bulletPos.distanceTo(asteroidMesh.position) <
					BULLET_RADIUS + asteroidRadius
				) {
					removeBullet(bulletId)
					removeAsteroid(asteroidId) // asteroid hit by bullet → score increases
					collisionFound = true
				}
			}
			if (collisionFound) {
				delete bulletRefs.current[bulletId]
			}
		}
	})
	return null
}

// PlayerCollisionManager: checks collisions between the player and asteroids.
const PlayerCollisionManager = ({
	playerRef,
	asteroidRefs,
	onPlayerHit,
	invulnerable,
}: {
	playerRef: React.MutableRefObject<THREE.Mesh | null>
	asteroidRefs: React.MutableRefObject<Record<string, THREE.Mesh>>
	onPlayerHit: (asteroidId: string) => void
	invulnerable: boolean
}) => {
	useFrame(() => {
		if (!playerRef.current || invulnerable) return
		const playerPos = playerRef.current.position
		const playerRadius = SHIP_SIZE / 2
		for (const asteroidId of Object.keys(asteroidRefs.current)) {
			const asteroidMesh = asteroidRefs.current[asteroidId]
			if (!asteroidMesh) continue
			const asteroidRadius = asteroidMesh.scale.x / 2
			if (
				playerPos.distanceTo(asteroidMesh.position) <
				playerRadius + asteroidRadius
			) {
				onPlayerHit(asteroidId)
				break
			}
		}
	})
	return null
}

const Game = ({ onScoreChange, onPlayerDeath }: GameProps) => {
	const [bullets, setBullets] = useState<BulletData[]>([])
	const [asteroids, setAsteroids] = useState<AsteroidData[]>([])
	const [score, setScore] = useState(0)
	const [lives, setLives] = useState(3)
	const [invulnerable, setInvulnerable] = useState(false)
	const [explosions, setExplosions] = useState<
		{ id: string; position: [number, number, number] }[]
	>([])

	// Notify parent about score changes.
	useEffect(() => {
		if (onScoreChange) onScoreChange(score)
	}, [score, onScoreChange])

	const bulletRefs = useRef<Record<string, THREE.Mesh>>({})
	const asteroidRefs = useRef<Record<string, THREE.Mesh>>({})
	const playerRef = useRef<THREE.Mesh | null>(null)

	const registerBulletRef = useCallback((id: string, ref: THREE.Mesh) => {
		bulletRefs.current[id] = ref
	}, [])
	const unregisterBulletRef = useCallback((id: string) => {
		delete bulletRefs.current[id]
	}, [])
	const registerAsteroidRef = useCallback((id: string, ref: THREE.Mesh) => {
		asteroidRefs.current[id] = ref
	}, [])
	const unregisterAsteroidRef = useCallback((id: string) => {
		delete asteroidRefs.current[id]
	}, [])

	const spawnBullet = useCallback(
		(position: [number, number, number], direction: THREE.Vector3) => {
			const id = Math.random().toString()
			setBullets(prev => [...prev, { id, position, direction }])
		},
		[]
	)

	// Difficulty: increases by one every 1000 points.
	const difficulty = 1 + score / 1000
	const minAsteroidsMultiplier = 1 + (2 * score) / 100

	// Gradually spawn asteroids.
	useEffect(() => {
		const dynamicMinAsteroids = Math.floor(
			MIN_ASTEROIDS * minAsteroidsMultiplier
		)
		const interval = setInterval(() => {
			setAsteroids(prev => {
				if (prev.length < dynamicMinAsteroids) {
					return [
						...prev,
						{ id: Math.random().toString(), difficulty },
					]
				}
				return prev
			})
		}, 1000)
		return () => clearInterval(interval)
	}, [difficulty, minAsteroidsMultiplier])

	// Called when an asteroid is hit by a bullet.
	const removeAsteroidFromCollision = useCallback((id: string) => {
		const asteroidMesh = asteroidRefs.current[id]
		if (asteroidMesh) {
			const pos = asteroidMesh.position
			setExplosions(prev => [
				...prev,
				{
					id: Math.random().toString(),
					position: [pos.x, pos.y, pos.z],
				},
			])
		}
		setAsteroids(prev => prev.filter(a => a.id !== id))
		delete asteroidRefs.current[id]
		setScore(prev => prev + 1)
	}, [])

	// Called when an asteroid leaves the screen (no score update).
	const removeAsteroidFromLeaving = useCallback((id: string) => {
		setAsteroids(prev => prev.filter(a => a.id !== id))
		delete asteroidRefs.current[id]
	}, [])

	const removeBullet = useCallback((id: string) => {
		setBullets(prev => prev.filter(b => b.id !== id))
		delete bulletRefs.current[id]
	}, [])

	// Handle collision between player and asteroid.
	const handlePlayerHit = useCallback(
		(asteroidId: string) => {
			if (invulnerable) return
			setInvulnerable(true)
			setLives(prev => {
				if (prev > 1) {
					return prev - 1
				} else {
					if (onPlayerDeath) onPlayerDeath()
					return 0
				}
			})
			// Remove the asteroid without updating score.
			removeAsteroidFromLeaving(asteroidId)
			setTimeout(() => {
				setInvulnerable(false)
			}, 1000)
		},
		[invulnerable, onPlayerDeath, removeAsteroidFromLeaving]
	)

	return (
		<div className="h-full w-full">
			<Canvas className="h-full w-full">
				<PlayerShip
					onShoot={spawnBullet}
					onRegisterPlayerRef={(ref: THREE.Mesh) => {
						playerRef.current = ref
					}}
					invulnerable={invulnerable}
				/>
				{asteroids.map(asteroid => (
					<Asteroid
						key={asteroid.id}
						id={asteroid.id}
						difficulty={asteroid.difficulty}
						onRemove={() => removeAsteroidFromLeaving(asteroid.id)}
						registerAsteroidRef={(ref: THREE.Mesh) =>
							registerAsteroidRef(asteroid.id, ref)
						}
						unregisterAsteroidRef={() =>
							unregisterAsteroidRef(asteroid.id)
						}
					/>
				))}
				{bullets.map(bullet => (
					<Bullet
						key={bullet.id}
						id={bullet.id}
						position={bullet.position}
						direction={bullet.direction}
						onRemove={() => removeBullet(bullet.id)}
						registerBulletRef={(ref: THREE.Mesh) =>
							registerBulletRef(bullet.id, ref)
						}
						unregisterBulletRef={() =>
							unregisterBulletRef(bullet.id)
						}
					/>
				))}
				<CollisionManager
					bulletRefs={bulletRefs}
					asteroidRefs={asteroidRefs}
					removeBullet={removeBullet}
					removeAsteroid={removeAsteroidFromCollision}
				/>
				<PlayerCollisionManager
					playerRef={playerRef}
					asteroidRefs={asteroidRefs}
					onPlayerHit={handlePlayerHit}
					invulnerable={invulnerable}
				/>
				{explosions.map(exp => (
					<Explosion
						key={exp.id}
						position={exp.position}
						onComplete={() =>
							setExplosions(prev =>
								prev.filter(e => e.id !== exp.id)
							)
						}
					/>
				))}
			</Canvas>
			<div className="absolute right-48 bottom-24 rounded-lg border border-white py-2 text-white">
				<div className="flex items-center">
					<div className="flex items-center gap-2 border-r border-white px-4">
						<img
							src="/asteroid.png"
							alt="Asteroid icon"
							className="w-6"
						/>
						<span>{score}</span>
					</div>
					<div className="flex space-x-2 px-4">
						{Array.from({ length: 3 }, (_, i) => (
							<HeartIcon
								key={i}
								fill={i < lives ? 'red' : 'transparent'}
								width={24}
								height={24}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Game
