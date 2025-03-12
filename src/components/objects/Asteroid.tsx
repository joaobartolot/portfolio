import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import * as THREE from 'three'

type AsteroidProps = {
	id: string
	onRemove: () => void
	registerAsteroidRef: (ref: THREE.Mesh) => void
	unregisterAsteroidRef: () => void
	difficulty: number
}

const BASE_SIZE = 0.7
const SCALE_MIN_FACTOR = 0.8
const SCALE_MAX_FACTOR = 1.2
const VELOCITY_MIN = 0.8
const VELOCITY_MAX = 1.5
const ROTATION_RANGE = Math.PI * 2

const Asteroid = ({
	id,
	onRemove,
	registerAsteroidRef,
	unregisterAsteroidRef,
	difficulty,
}: AsteroidProps) => {
	const texture = useLoader(THREE.TextureLoader, '/asteroid.png')
	const asteroidRef = useRef<THREE.Mesh>(null!)
	const { viewport } = useThree()
	// Capture the initial viewport once.
	const initialViewport = useMemo(
		() => ({ width: viewport.width, height: viewport.height }),
		[]
	)

	const scale = useMemo(() => {
		const randomFactor =
			SCALE_MIN_FACTOR +
			Math.random() * (SCALE_MAX_FACTOR - SCALE_MIN_FACTOR)
		return BASE_SIZE * randomFactor
	}, [])

	const initialRotation = useMemo(() => Math.random() * ROTATION_RANGE, [])
	const spawnSide = useMemo(() => {
		const sides = ['left', 'right', 'top', 'bottom'] as const
		return sides[Math.floor(Math.random() * sides.length)]
	}, [])

	const spawnPosition = useMemo<[number, number, number]>(() => {
		const m = scale
		switch (spawnSide) {
			case 'left':
				return [
					-(initialViewport.width / 2 + m),
					(Math.random() - 0.5) * initialViewport.height,
					0,
				]
			case 'right':
				return [
					initialViewport.width / 2 + m,
					(Math.random() - 0.5) * initialViewport.height,
					0,
				]
			case 'top':
				return [
					(Math.random() - 0.5) * initialViewport.width,
					initialViewport.height / 2 + m,
					0,
				]
			case 'bottom':
				return [
					(Math.random() - 0.5) * initialViewport.width,
					-(initialViewport.height / 2 + m),
					0,
				]
			default:
				return [0, 0, 0]
		}
	}, [scale, spawnSide, initialViewport])

	const targetPosition = useMemo<[number, number, number]>(() => {
		return [
			(Math.random() - 0.5) * initialViewport.width,
			(Math.random() - 0.5) * initialViewport.height,
			0,
		]
	}, [initialViewport])

	// The base speed is then multiplied by the difficulty factor.
	const speed = useMemo(
		() =>
			(VELOCITY_MIN + Math.random() * (VELOCITY_MAX - VELOCITY_MIN)) *
			difficulty,
		[difficulty]
	)
	const velocity = useMemo(() => {
		const spawnVec = new THREE.Vector3(...spawnPosition)
		const targetVec = new THREE.Vector3(...targetPosition)
		const direction = targetVec.sub(spawnVec).normalize()
		return direction.multiplyScalar(speed)
	}, [spawnPosition, targetPosition, speed])

	const hasEntered = useRef(false)
	useFrame((state, delta) => {
		if (asteroidRef.current) {
			asteroidRef.current.position.add(
				velocity.clone().multiplyScalar(delta)
			)
			const { x, y } = asteroidRef.current.position
			if (
				!hasEntered.current &&
				Math.abs(x) < initialViewport.width / 2 &&
				Math.abs(y) < initialViewport.height / 2
			) {
				hasEntered.current = true
			}
			const margin = scale
			if (
				hasEntered.current &&
				(Math.abs(x) > initialViewport.width / 2 + margin ||
					Math.abs(y) > initialViewport.height / 2 + margin)
			) {
				onRemove()
			}
		}
	})

	useEffect(() => {
		if (asteroidRef.current) {
			registerAsteroidRef(asteroidRef.current)
		}
		return () => {
			unregisterAsteroidRef()
		}
	}, []) // run only once

	return (
		<mesh
			ref={asteroidRef}
			position={spawnPosition}
			scale={[scale, scale, scale]}
			rotation={[0, 0, initialRotation]}
		>
			<planeGeometry args={[1, 1]} />
			<meshBasicMaterial map={texture} transparent />
		</mesh>
	)
}

export default Asteroid
