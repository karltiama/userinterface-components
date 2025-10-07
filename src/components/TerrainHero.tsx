import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise.js'

interface TerrainHeroProps {
  children?: React.ReactNode
}

function Terrain() {
  const mesh = useRef<THREE.Mesh>(null!)
  const flyingRef = useRef(0)
  
  const { geom, noise, originalPositions } = useMemo(() => {
    // Create terrain geometry: width, height, widthSegments, heightSegments
    // Reduced from 200x150 to 120x90 for better performance (~63% fewer vertices)
    const geom = new THREE.PlaneGeometry(80, 60, 120, 90)
    // Rotate to match p5.js perspective (floor-like view)
    geom.rotateX(-Math.PI / 2.6)
    
    // Store original positions for reference
    const originalPositions = new Float32Array(geom.attributes.position.array)
    
    return { geom, noise: new ImprovedNoise(), originalPositions }
  }, [])

  useFrame(() => {
    // Increment flying to create forward movement effect (reversed direction)
    flyingRef.current += 0.01
    
    const pos = geom.attributes.position as THREE.BufferAttribute
    const arr = pos.array as Float32Array
    
    // Animate terrain vertices with noise that flows forward
    for (let i = 0; i < arr.length; i += 3) {
      // Use original positions for consistent noise sampling
      const x = originalPositions[i] * 0.2
      const y = originalPositions[i + 1] * 0.2
      
      // Add flying offset to y to create forward movement through the terrain
      // This simulates moving along the z-axis through an infinite landscape
      const noiseValue = noise.noise(x, y + flyingRef.current, 0)
      // Apply power to make peaks sharper and valleys deeper
      const sharpened = Math.sign(noiseValue) * Math.pow(Math.abs(noiseValue), 0.5)
      const z = sharpened * 4.0
      
      // Update vertex height
      arr[i + 2] = z
    }
    
    pos.needsUpdate = true
    geom.computeVertexNormals()
  })

  return (
    <mesh ref={mesh} geometry={geom} position={[0, -1.2, 0]}>
      {/* Wireframe material for the classic terrain look */}
      <meshStandardMaterial 
        wireframe 
        transparent 
        opacity={0.75}
        color="#c8c8c8"
      />
    </mesh>
  )
}

export default function TerrainHero({ children }: TerrainHeroProps) {
  return (
    <div className="relative w-full h-[600px] overflow-hidden bg-black">
      {/* Three.js Canvas */}
      <div className="absolute inset-0">
        <Canvas 
          camera={{ position: [0, -10, 13], fov: 55 }} 
          dpr={[1, 2]}
        >
          <fog attach="fog" args={['#000000', 8, 28]} />
          <ambientLight intensity={0.7} />
          <directionalLight position={[4, -7, 3]} intensity={1.2} />
          <Terrain />
        </Canvas>
      </div>
      
      {/* Text overlay */}
      <div className="absolute inset-0 flex items-end justify-center pb-16 pointer-events-none">
        <div className="text-center px-6 pointer-events-auto z-10">
          {children || (
            <>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
                Explore the Terrain
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 drop-shadow-md max-w-3xl mx-auto">
                Experience the power of procedural generation with animated 3D landscapes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
                  Get Started
                </button>
                <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

