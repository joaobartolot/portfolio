import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const BULLET_SPEED = 5.0
const BULLET_SIZE = 0.04

type BulletProps = {
	id: string
	position: [number, number, number]
	direction: THREE.Vector3
	onRemove: () => void
	registerBulletRef: (ref: THREE.Mesh) => void
	unregisterBulletRef: () => void
}

const Bullet = ({
	position,
	direction,
	onRemove,
	registerBulletRef,
	unregisterBulletRef,
}: BulletProps) => {
	const bulletRef = useRef<THREE.Mesh>(null!)
	const { viewport } = useThree()

	// Register only once on mount.
	useEffect(() => {
		if (bulletRef.current) {
			registerBulletRef(bulletRef.current)
		}
		return () => {
			unregisterBulletRef()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useFrame((_, delta) => {
		if (bulletRef.current) {
			bulletRef.current.position.add(
				direction.clone().multiplyScalar(BULLET_SPEED * delta)
			)
			const { x, y } = bulletRef.current.position
			if (
				Math.abs(x) > viewport.width / 2 ||
				Math.abs(y) > viewport.height / 2
			) {
				onRemove()
			}
		}
	})

	return (
		<mesh
			ref={bulletRef}
			position={position}
			scale={[BULLET_SIZE, BULLET_SIZE, BULLET_SIZE]}
		>
			<sphereGeometry args={[1, 16, 16]} />
			<meshBasicMaterial color="white" />
		</mesh>
	)
}

export default Bullet
