// @ts-nocheck
'use client'

import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Sphere, Mesh, Group, Points, BufferGeometry, BufferAttribute, Color, Vector3 } from 'three'
import { OrbitControls } from '@react-three/drei'

const destinations = [
  { name: 'Maldives', lat: 3.2028, lng: 73.2207, color: '#0c93e7' },
  { name: 'Switzerland', lat: 46.8182, lng: 8.2275, color: '#f97316' },
  { name: 'Dubai', lat: 25.2048, lng: 55.2708, color: '#0c93e7' },
  { name: 'Bali', lat: -8.3405, lng: 115.0920, color: '#f97316' },
  { name: 'Paris', lat: 48.8566, lng: 2.3522, color: '#0c93e7' },
  { name: 'Thailand', lat: 15.8700, lng: 100.9925, color: '#f97316' },
  { name: 'Japan', lat: 36.2048, lng: 138.2529, color: '#0c93e7' },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198, color: '#f97316' },
  { name: 'New Zealand', lat: -40.9006, lng: 174.8860, color: '#0c93e7' },
  { name: 'Iceland', lat: 64.9631, lng: -19.0208, color: '#f97316' },
  { name: 'Italy', lat: 41.8719, lng: 12.5674, color: '#0c93e7' },
  { name: 'Australia', lat: -25.2744, lng: 133.7751, color: '#f97316' },
]

function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return new Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  )
}

function GlobeMesh() {
  const groupRef = useRef<Group>(null)

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05
    }
  })

  return (
    <Group ref={groupRef}>
      {/* Earth sphere */}
      <Mesh
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.1}
          roughness={0.8}
          transparent
          opacity={0.9}
        />
      </Mesh>

      {/* Wireframe overlay */}
      <Mesh
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <sphereGeometry args={[1.51, 64, 64]} />
        <meshBasicMaterial
          color="#0c93e7"
          wireframe
          transparent
          opacity={0.15}
        />
      </Mesh>

      {/* Destination markers */}
      {destinations.map((dest, i) => {
        const pos = latLngToVector3(dest.lat, dest.lng, 1.55)
        return (
          <Marker
            key={i}
            position={pos.toArray()}
            color={dest.color}
            name={dest.name}
            index={i}
          />
        )
      })}

      {/* Ambient glow particles */}
      <Particles count={500} radius={2} />
    </Group>
  )
}

function Marker({ position, color, name, index }: { position: number[], color: string, name: string, index: number }) {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [pulse, setPulse] = useState(0)

  useFrame((state, delta) => {
    if (meshRef.current) {
      setPulse(prev => prev + delta * 2)
      meshRef.current.scale.setScalar(1 + Math.sin(pulse) * 0.15)
    }
  })

  return (
    <Mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[hovered ? 0.05 : 0.035, 16, 16]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={hovered ? 1 : 0.8}
      />
    </Mesh>
  )
}

function Particles({ count, radius }: { count: number, radius: number }) {
  const pointsRef = useRef<Points>(null)
  const positionsRef = useRef<Float32Array>(new Float32Array(count * 3))
  const colorsRef = useRef<Float32Array>(new Float32Array(count * 3))
  const velocitiesRef = useRef<Float32Array>(new Float32Array(count * 3))

  useEffect(() => {
    for (let i = 0; i < count; i++) {
      const r = radius * (0.8 + Math.random() * 0.4)
      const phi = Math.acos(2 * Math.random() - 1)
      const theta = Math.random() * Math.PI * 2

      positionsRef.current[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positionsRef.current[i * 3 + 1] = r * Math.cos(phi)
      positionsRef.current[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)

      const isBlue = Math.random() > 0.5
      colorsRef.current[i * 3] = isBlue ? 0.05 : 0.98
      colorsRef.current[i * 3 + 1] = isBlue ? 0.58 : 0.45
      colorsRef.current[i * 3 + 2] = isBlue ? 0.91 : 0.09

      velocitiesRef.current[i * 3] = (Math.random() - 0.5) * 0.0005
      velocitiesRef.current[i * 3 + 1] = (Math.random() - 0.5) * 0.0005
      velocitiesRef.current[i * 3 + 2] = (Math.random() - 0.5) * 0.0005
    }
  }, [count, radius])

  useFrame(() => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array
      for (let i = 0; i < count * 3; i++) {
        positions[i] += velocitiesRef.current[i]
        if (Math.abs(positions[i]) > radius) {
          velocitiesRef.current[i] *= -1
        }
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true
      pointsRef.current.rotation.y += 0.0001
    }
  })

  return (
    <Points ref={pointsRef}>
      <BufferGeometry>
        <BufferAttribute attach="attributes-position" count={count} itemSize={3} array={positionsRef.current} />
        <BufferAttribute attach="attributes-color" count={count} itemSize={3} array={colorsRef.current} />
      </BufferGeometry>
      <PointsMaterial size={0.02} vertexColors sizeAttenuation transparent opacity={0.6} />
    </Points>
  )
}

function Lights() {
  return (
    <>
      <ambientLight color="#ffffff" intensity={0.5} />
      <directionalLight position={[5, 10, 7]} color="#0c93e7" intensity={0.8} />
      <directionalLight position={[-5, -5, -5]} color="#f97316" intensity={0.5} />
      <pointLight position={[0, 0, 5]} color="#ffffff" intensity={0.3} />
    </>
  )
}

export default function Globe({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full h-full relative ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        style={{ touchAction: 'none' }}
      >
        <Lights />
        <GlobeMesh />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.3}
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
        />
      </Canvas>
    </div>
  )
}