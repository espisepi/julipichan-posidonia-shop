

import * as THREE from 'three'
import { useState, useRef, FC, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { useCursor, MeshDistortMaterial, useGLTF, Box, OrbitControls } from '@react-three/drei'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { UiContext } from '@/features/next-teslo/ui'


/* 
    Los valores de los nodes y materials los
    averiguo haciendo:
        const { nodes, materials } = useGLTF('/models/next-teslo/sphere-tshirt/scene.glb', true) as unknown as GLTFResult
        console.log(nodes);
        console.log(materials)
*/
type GLTFResult = GLTF & {
  nodes: {
    Scene: THREE.Group,
    ['Shirt_on_Hanger']: THREE.Group,
    ['Shirt_on_Hanger_1']: THREE.Mesh,
    ['Shirt_on_Hanger_2']: THREE.Mesh,
    Sphere: THREE.Mesh
  }
  materials: {
    ['Material.001']: THREE.MeshStandardMaterial,
    ['03___Default']: THREE.MeshStandardMaterial,
    ['Material.001']: THREE.MeshStandardMaterial
  }
}


// params:
// image: string

export default function ProductScene ({ image, ...props }) {

  const [hovered, hover] = useState(false)
  useCursor(hovered)

  const { nodes, materials } = useGLTF('/models/next-teslo/sphere-tshirt/scene.glb', true) as unknown as GLTFResult;
  console.log(image)
  const [texture_shirt, texture_cemento_normal, texture_cemento_displacement] = useLoader(THREE.TextureLoader, [ 
                                        `${image}`,
                                        '/img/textures/cemento/cemento_normal.jpg',
                                        '/img/textures/cemento/cemento_displacement.png'
                                    ]);
  useEffect(()=>{
    // texture_shirt.flipY = false;
  },[texture_shirt]);

  const groupModel = useRef<THREE.Group>();
  const meshSphere = useRef<THREE.Mesh>();
  let elapsedTime;
  useFrame((state, delta) => {
    if(meshSphere.current) {
      meshSphere.current.rotation.y -= delta * 0.05;
      // meshSphere.current.position.y = ( Math.cos(elapsedTime) ) * ( Math.cos(elapsedTime) * (Math.PI / 10) );
    }
    if(groupModel.current) {
      elapsedTime = state.clock.getElapsedTime();
      groupModel.current.position.y = ( Math.sin(elapsedTime) ) * ( Math.sin(elapsedTime) * (Math.PI / 50) );
    }
  });

  const { is3DModeActivated } = useContext( UiContext );

  //change camera position and restore when unmount this component
  const { camera } = useThree();
  useEffect(()=>{
    const initialPosition = camera.position.clone();
    const initialRotation = camera.rotation.clone();
    
    camera.position.set(initialPosition.x, initialPosition.y, 2);
    return () => {
      camera.position.set(initialPosition.x, initialPosition.y, initialPosition.z);
      camera.rotation.set(initialRotation.x, initialRotation.y, initialRotation.z);
    }

  },[]);

  return (
    <>
    {/* @ts-ignore */}
    {/* <Box 
        position={[2,0,0]}
        material-color={ is3DModeActivated ? '#FF00FF' : '#FFFFFF'}
        // onClick={() => setEnabledOrbitControls(!is3DModeActivated)}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)} 
    /> */}

    {/* @ts-ignore */}
    <directionalLight intensity={0.5} position={[0,100,100]} />
    <directionalLight intensity={0.5} position={[0,100,-100]} />

    
    <group name="product-scene">
        <mesh
            name="sphere"
            ref={meshSphere}
            position={[0,6,0]}
            rotation={[0,0,3.3]}
            scale={[30,30,30]}
            geometry={(nodes.Sphere as THREE.Mesh).geometry}
            material={new THREE.MeshStandardMaterial({
                // color: new THREE.Color('red'),
                side: THREE.DoubleSide,
                map: texture_shirt,
                normalMap: texture_cemento_normal
            })}
        />
        <group ref={groupModel}>
          <mesh
            name="t-shirt"
            // ref={meshModel}
            scale={[2,2,2]}
            geometry={(nodes['Shirt_on_Hanger_1'] as THREE.Mesh).geometry}
            material={new THREE.MeshStandardMaterial({
                // color: new THREE.Color('red'),
                map: texture_shirt
            })}
        />
        <mesh
            name="hanger"
            // ref={meshModel}
            scale={[2,2,2]}
            geometry={(nodes['Shirt_on_Hanger_2'] as THREE.Mesh).geometry}
            material={new THREE.MeshStandardMaterial({
                // color: new THREE.Color('red'),
                // map: texture_shirt,
                color: is3DModeActivated ? new THREE.Color('#804674') : new THREE.Color('#FFFFFF')
            })}
        />
        </group>
        {/* <mesh  position={[0,0,0]} material={materials['Material.001']} geometry={(nodes.Scene as THREE.Mesh).geometry} /> */}
    </group>

    { is3DModeActivated && (<OrbitControls /*minPolarAngle={Math.PI / 2}*/ maxPolarAngle={Math.PI / 2} enableZoom={true} enablePan={false} maxDistance={100} minDistance={1} />) }        
    </>
  )
}
