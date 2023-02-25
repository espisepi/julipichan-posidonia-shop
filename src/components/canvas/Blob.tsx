import * as THREE from 'three'
import { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { useFrame } from '@react-three/fiber'
import { useCursor, MeshDistortMaterial, useGLTF } from '@react-three/drei'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

type GLTFResult = GLTF & {
  nodes: {
    texturedMesh: THREE.Mesh
  }
  materials: {
    ['TextureAtlas_1001']: THREE.MeshPhysicalMaterial
  }
}


const INITIAL_POSITION_Y_MODEL = -0.8;


export default function Blob({ route, ...props }) {
  const router = useRouter()
  const [hovered, hover] = useState(false)
  useCursor(hovered)

  const { nodes, materials } = useGLTF('models/test/untitledDraco.gltf', true) as unknown as GLTFResult

  const meshModel = useRef<THREE.Mesh>()
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    meshModel.current.position.y = ( Math.sin(t) * (Math.PI / 50) ) + INITIAL_POSITION_Y_MODEL
    // mesh.current.rotation.x = Math.cos(t) * (Math.PI / 8)
    // mesh.current.rotation.z -= delta / 4
  })

  return (
    <>
    <group rotation={[0,1,0]}>
      <mesh
        position={[0,1,0]}
        scale={[0.2,0.2,0.2]}
        onClick={() => router.push(route)}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        {...props}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial roughness={0} color={hovered ? 'hotpink' : '#1fb2f5'} />
      </mesh>
      <mesh ref={meshModel} position={[0,INITIAL_POSITION_Y_MODEL,-1.5]} material={materials['TextureAtlas_1001']} geometry={(nodes.texturedMesh as THREE.Mesh).geometry} />
    </group>
    </>
  )
}
