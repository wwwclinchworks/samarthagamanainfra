import { Canvas, useFrame } from "@react-three/fiber"
import { Float, SoftShadows } from "@react-three/drei"
import { useMemo, useRef } from "react"
import type { Group, Points } from "three"
import * as THREE from "three"

function Crane({ progress }: { progress: number }) {
  const arm = useRef<Group>(null)
  useFrame((state) => {
    if (!arm.current) return
    arm.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.8
  })
  const visible = progress > 0.12
  return (
    <group position={[6.2, 0, -1.4]} visible={visible}>
      <mesh position={[0, 4.2, 0]} castShadow>
        <boxGeometry args={[0.18, 8.4, 0.18]} />
        <meshStandardMaterial color="#c4a574" metalness={0.4} roughness={0.35} />
      </mesh>
      <group ref={arm} position={[0, 8.2, 0]}>
        <mesh position={[2.4, 0, 0]} castShadow>
          <boxGeometry args={[5.2, 0.12, 0.12]} />
          <meshStandardMaterial color="#5d6b5a" metalness={0.3} roughness={0.4} />
        </mesh>
        <mesh position={[4.8, -1.6, 0]}>
          <boxGeometry args={[0.5, 0.4, 0.5]} />
          <meshStandardMaterial color="#edd6cc" />
        </mesh>
      </group>
    </group>
  )
}

function Building({ progress }: { progress: number }) {
  const floors = 8
  const shown = Math.floor(progress * (floors + 0.2))
  const windows = useMemo(() => {
    const list: Array<[number, number, number]> = []
    for (let f = 0; f < floors; f += 1) {
      for (let x = -1; x <= 1; x += 1) {
        for (let z = -1; z <= 1; z += 1) {
          if (x === 0 && z === 0) continue
          list.push([x * 0.72, 0.55 + f * 0.92, z * 0.55])
        }
      }
    }
    return list
  }, [])

  return (
    <group>
      <mesh position={[0, 0.12, 0]} receiveShadow>
        <boxGeometry args={[4.4, 0.24, 3.4]} />
        <meshStandardMaterial color="#d8cbb8" roughness={0.8} />
      </mesh>
      {Array.from({ length: floors }).map((_, i) => (
        <mesh
          key={i}
          position={[0, 0.55 + i * 0.92, 0]}
          castShadow
          receiveShadow
          visible={i < shown}
        >
          <boxGeometry args={[3.2, 0.86, 2.4]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#efe6da" : "#e4d5c4"}
            roughness={0.62}
            metalness={0.05}
          />
        </mesh>
      ))}
      {windows.map((p, i) => {
        const floor = Math.floor(i / 8)
        return (
          <mesh key={i} position={p} visible={floor < shown}>
            <boxGeometry args={[0.28, 0.34, 0.04]} />
            <meshStandardMaterial
              color="#8aa8b8"
              emissive="#d5e4ee"
              emissiveIntensity={0.25}
              roughness={0.2}
              metalness={0.4}
            />
          </mesh>
        )
      })}
      <mesh position={[0, 0.55 + shown * 0.46, 1.22]} visible={shown > 0 && shown < floors}>
        <boxGeometry args={[1.6, 0.08, 0.9]} />
        <meshStandardMaterial color="#c4a574" />
      </mesh>
    </group>
  )
}

function Trees() {
  const spots: Array<[number, number, number]> = [
    [-5.2, 0, 2.4],
    [-4.2, 0, -3.1],
    [5.4, 0, 2.8],
    [4.6, 0, -2.6],
    [-6.4, 0, -0.4],
  ]
  return (
    <>
      {spots.map((p, i) => (
        <Float key={i} speed={1.2} floatIntensity={0.15} rotationIntensity={0.05}>
          <group position={p}>
            <mesh position={[0, 0.4, 0]}>
              <cylinderGeometry args={[0.08, 0.12, 0.8, 8]} />
              <meshStandardMaterial color="#8b6b4a" />
            </mesh>
            <mesh position={[0, 1.15, 0]}>
              <coneGeometry args={[0.55, 1.3, 8]} />
              <meshStandardMaterial color={i % 2 ? "#8aa08a" : "#6f8a72"} />
            </mesh>
          </group>
        </Float>
      ))}
    </>
  )
}

function Dust({ progress }: { progress: number }) {
  const mesh = useRef<Points>(null)
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const count = 180
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      pos[i * 3] = (Math.random() - 0.5) * 12
      pos[i * 3 + 1] = Math.random() * 6
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3))
    return g
  }, [])
  useFrame((state) => {
    if (!mesh.current) return
    mesh.current.rotation.y = state.clock.elapsedTime * 0.03
  })
  return (
    <points ref={mesh} geometry={geo} visible={progress > 0.05}>
      <pointsMaterial color="#e8dcc8" size={0.045} transparent opacity={0.45} />
    </points>
  )
}

function CameraRig({ progress }: { progress: number }) {
  useFrame((state) => {
    const t = progress
    const dist = 14 - t * 5.5
    const height = 8.5 - t * 4.2
    const angle = 0.9 - t * 0.55
    state.camera.position.lerp(
      new THREE.Vector3(Math.sin(angle) * dist, height, Math.cos(angle) * dist),
      0.06,
    )
    state.camera.lookAt(0, 2.2, 0)
  })
  return null
}

export function ConstructionWorld({ progress }: { progress: number }) {
  return (
    <>
      <CameraRig progress={progress} />
      <color attach="background" args={["#e9e3d8"]} />
      <fog attach="fog" args={["#e9e3d8", 12, 28]} />
      <hemisphereLight args={["#f6f1ea", "#c5d0c4", 0.9]} />
      <directionalLight
        position={[8, 12, 6]}
        intensity={1.35}
        castShadow
        shadow-mapSize={[1024, 1024]}
        color="#fff4e8"
      />
      <SoftShadows size={18} samples={8} focus={0.6} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#dfe8dc" roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 8]}>
        <planeGeometry args={[4.2, 18]} />
        <meshStandardMaterial color="#e8dcc8" />
      </mesh>
      <Building progress={progress} />
      <Crane progress={progress} />
      <Trees />
      <Dust progress={progress} />
    </>
  )
}

export function ConstructionCanvas({ progress }: { progress: number }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      camera={{ fov: 42, position: [10, 8, 12], near: 0.1, far: 60 }}
    >
      <ConstructionWorld progress={progress} />
    </Canvas>
  )
}

export function AmbientCanvas() {
  return (
    <Canvas
      dpr={[1, 1.25]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: 40, position: [7, 4.2, 8] }}
    >
      <color attach="background" args={["#efe8dc"]} />
      <fog attach="fog" args={["#efe8dc", 10, 22]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[6, 8, 4]} intensity={1.1} color="#fff1de" />
      <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.25}>
        <group position={[0, 0.2, 0]}>
          <mesh castShadow>
            <boxGeometry args={[2.4, 2.8, 1.8]} />
            <meshStandardMaterial color="#efe6da" roughness={0.55} />
          </mesh>
          <mesh position={[0, 1.7, 0]}>
            <boxGeometry args={[2.55, 0.18, 1.95]} />
            <meshStandardMaterial color="#c4a574" metalness={0.2} roughness={0.4} />
          </mesh>
        </group>
      </Float>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
        <circleGeometry args={[6, 48]} />
        <meshStandardMaterial color="#dce6d8" />
      </mesh>
    </Canvas>
  )
}
