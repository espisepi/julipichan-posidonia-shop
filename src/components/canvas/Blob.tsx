import * as THREE from 'three'
import { useState } from 'react'
import { useRouter } from 'next/router'
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



export default function Blob({ route, ...props }) {
  const router = useRouter()
  const [hovered, hover] = useState(false)
  useCursor(hovered)

  const { nodes, materials } = useGLTF('models/test/untitledDraco.gltf', true) as unknown as GLTFResult
  console.log(nodes)
  console.log(materials)
//return <mesh material={materials['Material.001']} geometry={(nodes.Suzanne as Mesh).geometry} />

  return (
    <>
    <mesh
      onClick={() => router.push(route)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
      {...props}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial roughness={0} color={hovered ? 'hotpink' : '#1fb2f5'} />
    </mesh>
    <mesh material={materials['TextureAtlas_1001']} geometry={(nodes.texturedMesh as THREE.Mesh).geometry} />
    </>
  )
}
