// Server.tsx
import { useLoader, useThree } from '@react-three/fiber'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { Text } from '@react-three/drei'

const SIZE = 0.7
const BOTTOM = 24
const RIGHT = 32
const TEXT_OFFSET = 0.1 // Distance between the server and text
const BLINK_SPEED = 0.7 // Seconds per blink

type ServerProps = {
	onRegisterServerRef?: (ref: THREE.Mesh) => void
}

const Server = ({ onRegisterServerRef }: ServerProps) => {
	const serverRef = useRef<THREE.Mesh>(null!)
	const texture = useLoader(THREE.TextureLoader, '/server.png')
	const { viewport } = useThree()

	// Calculate offsets.
	const offsetX = RIGHT / 16
	const offsetY = BOTTOM / 16
	const width = SIZE * 0.625

	// Position calculations.
	const positionX = viewport.width / 2 - width / 2 - offsetX
	const positionY = -viewport.height / 2 + SIZE / 2 + offsetY

	// Blinking effect state.
	const [isVisible, setIsVisible] = useState(true)
	useEffect(() => {
		const interval = setInterval(() => {
			setIsVisible(prev => !prev)
		}, BLINK_SPEED * 1000)
		return () => clearInterval(interval)
	}, [])

	useEffect(() => {
		if (serverRef.current && onRegisterServerRef) {
			onRegisterServerRef(serverRef.current)
		}
	}, [onRegisterServerRef])

	return (
		<group>
			{/* Server Mesh */}
			<mesh ref={serverRef} position={[positionX, positionY, 0]}>
				<planeGeometry args={[SIZE * 0.625, SIZE]} />
				<meshBasicMaterial map={texture} transparent />
			</mesh>
			{/* Blinking Text Below */}
			<Text
				position={[positionX, positionY - SIZE / 2 - TEXT_OFFSET, 0]}
				fontSize={0.15}
				color="red"
				anchorX="center"
				anchorY="top"
				visible={isVisible}
			>
				Protect!
			</Text>
		</group>
	)
}

export default Server
