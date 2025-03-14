import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const ROTATION_SPEED = 5.0 // radians per second
const ACCELERATION = 4 // acceleration units per second^2
const DRAG = 0.8 // natural drag factor per second
const SHIP_SIZE = 0.4 // ship size (scale factor)
const FIRE_COOLDOWN = 0.08 // seconds between shots

type PlayerShipProps = {
	onShoot: (
		position: [number, number, number],
		direction: THREE.Vector3
	) => void
	onRegisterPlayerRef?: (ref: THREE.Mesh) => void
	invulnerable?: boolean
}

const PlayerShip = ({
	onShoot,
	onRegisterPlayerRef,
	invulnerable = false,
}: PlayerShipProps) => {
	const texture = useLoader(THREE.TextureLoader, '/ship.png')
	const shipRef = useRef<THREE.Mesh>(null!)
	// We'll wrap the ship in a group so we can toggle the whole group.
	const groupRef = useRef<THREE.Group>(null!)
	const velocity = useRef(new THREE.Vector3(0, 0, 0))
	const keysPressed = useRef<Set<string>>(new Set())
	const { viewport, clock } = useThree()
	const lastShotTime = useRef(0)

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (
				[
					'ArrowUp',
					'ArrowDown',
					'ArrowLeft',
					'ArrowRight',
					' ',
				].includes(e.key)
			) {
				e.preventDefault()
			}
			keysPressed.current.add(e.key)
		}
		const handleKeyUp = (e: KeyboardEvent) => {
			keysPressed.current.delete(e.key)
		}
		window.addEventListener('keydown', handleKeyDown)
		window.addEventListener('keyup', handleKeyUp)
		return () => {
			window.removeEventListener('keydown', handleKeyDown)
			window.removeEventListener('keyup', handleKeyUp)
		}
	}, [])

	useFrame((state, delta) => {
		if (!shipRef.current || !groupRef.current) return

		// Blinking effect: toggle group visibility based on a sine wave.
		if (invulnerable) {
			const t = clock.getElapsedTime()
			groupRef.current.visible = Math.sin(t * 20) > 0
		} else {
			groupRef.current.visible = true
		}

		// Handle rotation.
		let rotation = shipRef.current.rotation.z
		if (
			keysPressed.current.has('a') ||
			keysPressed.current.has('ArrowLeft')
		) {
			rotation += ROTATION_SPEED * delta
		}
		if (
			keysPressed.current.has('d') ||
			keysPressed.current.has('ArrowRight')
		) {
			rotation -= ROTATION_SPEED * delta
		}
		shipRef.current.rotation.z = rotation

		// Compute forward vector. With the ship centered, rotation 0 means it points up.
		const effectiveAngle = rotation + Math.PI / 2
		const forward = new THREE.Vector3(
			Math.cos(effectiveAngle),
			Math.sin(effectiveAngle),
			0
		)
		const accelVec = forward.clone().multiplyScalar(ACCELERATION * delta)
		if (
			keysPressed.current.has('w') ||
			keysPressed.current.has('ArrowUp')
		) {
			velocity.current.add(accelVec)
		} else if (
			keysPressed.current.has('s') ||
			keysPressed.current.has('ArrowDown')
		) {
			velocity.current.sub(accelVec)
		}
		velocity.current.multiplyScalar(1 - DRAG * delta)
		shipRef.current.position.add(
			velocity.current.clone().multiplyScalar(delta)
		)

		// Clamp position to viewport.
		const halfWidth = viewport.width / 2
		const halfHeight = viewport.height / 2
		const margin = SHIP_SIZE / 2
		const pos = shipRef.current.position
		if (pos.x > halfWidth - margin) {
			pos.x = halfWidth - margin
			velocity.current.x = 0
		} else if (pos.x < -halfWidth + margin) {
			pos.x = -halfWidth + margin
			velocity.current.x = 0
		}
		if (pos.y > halfHeight - margin) {
			pos.y = halfHeight - margin
			velocity.current.y = 0
		} else if (pos.y < -halfHeight + margin) {
			pos.y = -halfHeight + margin
			velocity.current.y = 0
		}

		// Shooting.
		const currentTime = state.clock.getElapsedTime()
		if (
			keysPressed.current.has(' ') &&
			currentTime - lastShotTime.current >= FIRE_COOLDOWN
		) {
			const bulletOffset = forward.clone().multiplyScalar(SHIP_SIZE - 0.3)
			const bulletPosition: [number, number, number] = [
				shipRef.current.position.x + bulletOffset.x,
				shipRef.current.position.y + bulletOffset.y,
				0,
			]
			onShoot(bulletPosition, forward.clone())
			lastShotTime.current = currentTime
		}
	})

	useEffect(() => {
		if (shipRef.current && onRegisterPlayerRef) {
			onRegisterPlayerRef(shipRef.current)
		}
	}, [onRegisterPlayerRef])

	return (
		<group ref={groupRef}>
			<mesh
				ref={shipRef}
				position={[0, 0, 0]}
				scale={[SHIP_SIZE, SHIP_SIZE, SHIP_SIZE]}
			>
				<planeGeometry
					args={[1, 1]}
					onUpdate={geometry => geometry.center()}
				/>
				<meshBasicMaterial map={texture} transparent />
			</mesh>
		</group>
	)
}

export default PlayerShip
