'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { createXRStore, XR } from '@react-three/xr'
import { useGLTF } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { YBot } from '../_components/Y'
import { RectangleGoggles } from 'lucide-react'

// Create the store once, outside component scope
const store = createXRStore()

function OfficeEnvironment() {
    const gltf = useGLTF('/models/modern_office_com.glb')
    return (
        <primitive object={gltf.scene} rotation={[0, 4.74, 0]} position={[0, 0, 0]} scale={5} />
    )
}

// Camera movement and bounds logic
function CameraController() {
    const { camera } = useThree()
    const velocity = useRef([0, 0])
    const bounds = {
        minX: -9, maxX: 9,
        minZ: 1.5, maxZ: 10
    }

    // Mouse control state
    const isDragging = useRef(false)
    const lastMouse = useRef({ x: 0, y: 0 })
    const rotationY = useRef(0)
    // rotationY.current = Math.PI / 2
    // Only horizontal rotation

    useEffect(() => {
        function handleKeyDown(e) {
            if (e.key === 'w') velocity.current[1] = 1
            if (e.key === 's') velocity.current[1] = -1
            if (e.key === 'd') velocity.current[0] = -1
            if (e.key === 'a') velocity.current[0] = 1
        }
        function handleKeyUp(e) {
            if (['w', 's'].includes(e.key)) velocity.current[1] = 0
            if (['a', 'd'].includes(e.key)) velocity.current[0] = 0
        }

        function handleMouseDown(e) {
            isDragging.current = true
            lastMouse.current = { x: e.clientX, y: e.clientY }
        }
        function handleMouseUp() {
            isDragging.current = false
        }
        function handleMouseMove(e) {
            if (!isDragging.current) return
            const dx = e.clientX - lastMouse.current.x
            lastMouse.current = { x: e.clientX, y: e.clientY }
            // Only horizontal rotation
            rotationY.current -= dx * 0.005
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)
        window.addEventListener('mousedown', handleMouseDown)
        window.addEventListener('mouseup', handleMouseUp)
        window.addEventListener('mousemove', handleMouseMove)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
            window.removeEventListener('mousedown', handleMouseDown)
            window.removeEventListener('mouseup', handleMouseUp)
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    useFrame(() => {
        // Lock vertical rotation
        camera.rotation.x = 0
        camera.rotation.y = rotationY.current

        // Calculate movement direction based on camera rotation
        const speed = 0.08
        const forward = velocity.current[1]
        const strafe = velocity.current[0]
        const angle = camera.rotation.y

        // Move forward/backward
        if (forward !== 0) {
            camera.position.x -= Math.sin(angle) * speed * forward
            camera.position.z -= Math.cos(angle) * speed * forward
        }
        // Strafe left/right (fixed direction)
        if (strafe !== 0) {
            camera.position.x -= Math.cos(angle) * speed * strafe
            camera.position.z += Math.sin(angle) * speed * strafe
        }

        // Clamp camera position to bounds
        camera.position.x = Math.max(bounds.minX, Math.min(bounds.maxX, camera.position.x))
        camera.position.z = Math.max(bounds.minZ, Math.min(bounds.maxZ, camera.position.z))
    })

    return null
}

export default function MockVR({ currentAnimation }) {
    return (
        <div className='flex fixed top-0 left-0 w-screen h-screen'>
            <div className='flex w-200 gap-2 fixed bottom-2 left-2 z-100'>
                <Button size='sm' className='text-xs' onClick={() => store.enterVR()}>Enter VR Mode <RectangleGoggles /></Button>
            </div>
            <Canvas camera={{ position: [0, 0, 10], fov: 75 }} style={{ background: 'black' }}>
                <XR store={store}>
                    <OfficeEnvironment />
                    <ambientLight />
                    <directionalLight position={[-2, -5, 5]} castShadow shadow-mapSize={1024} intensity={1.5} />

                    <directionalLight position={[4, -5, 5]} castShadow shadow-mapSize={1024} intensity={0.5} color='#d9d9d9' />

                    <CameraController />
                    <YBot currentAnimation={currentAnimation} />
                    <pointLight position={[10, 10, 10]} />
                </XR>
            </Canvas>

        </div>
    )
}
