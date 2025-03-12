import { useFrame } from '@react-three/fiber'
import { useState } from 'react'
import * as THREE from 'three'

type Particle = {
	position: THREE.Vector3
	velocity: THREE.Vector3
	life: number // seconds remaining
}

type ExplosionProps = {
	position: [number, number, number]
	onComplete: () => void
}

const NUM_PARTICLES = 10
const PARTICLE_SIZE = 0.02 // change this value to adjust the particle size

const Explosion = ({ position, onComplete }: ExplosionProps) => {
	const [particles, setParticles] = useState<Particle[]>(() => {
		const arr: Particle[] = []
		for (let i = 0; i < NUM_PARTICLES; i++) {
			const angle = Math.random() * Math.PI * 2
			const speed = Math.random() * 1 + 0.5 // adjust speed as needed
			arr.push({
				position: new THREE.Vector3(0, 0, 0),
				velocity: new THREE.Vector3(
					Math.cos(angle),
					Math.sin(angle),
					0
				).multiplyScalar(speed),
				life: 1.0, // each particle lasts 1 second
			})
		}
		return arr
	})

	// Update particles on each frame.
	useFrame((_, delta) => {
		setParticles(prev => {
			const updated = prev
				.map(p => ({
					...p,
					life: p.life - delta,
					position: p.position
						.clone()
						.add(p.velocity.clone().multiplyScalar(delta)),
				}))
				.filter(p => p.life > 0)
			if (updated.length === 0) {
				onComplete() // remove explosion when all particles have faded out
			}
			return updated
		})
	})

	return (
		<group position={new THREE.Vector3(...position)}>
			{particles.map((p, i) => {
				// Use the remaining life (from 1 to 0) as opacity.
				const opacity = p.life
				return (
					<mesh
						key={i}
						position={[p.position.x, p.position.y, p.position.z]}
					>
						<sphereGeometry args={[PARTICLE_SIZE, 16, 16]} />
						<meshBasicMaterial
							color="white"
							transparent
							opacity={opacity}
						/>
					</mesh>
				)
			})}
		</group>
	)
}

export default Explosion
