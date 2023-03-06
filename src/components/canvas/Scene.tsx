import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, Sky } from '@react-three/drei'
import Ocean from './Ocean'
import BackgroundEquirectangular from './BackgroundEquirectangular'

export default function Scene({ children, ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas {...props} camera={{far:300000}} style={{height:'100vh',width:'100vw', position:'fixed', top:0, zIndex:-10}}>

      {/* <directionalLight intensity={0.75} /> */}
      <ambientLight intensity={0.1} />

      {/* <Sky
        distance={3000}
        turbidity={0.0}
        rayleigh={3.0}
        mieCoefficient={0.1}
        mieDirectionalG={1}
        inclination={0.5}
        azimuth={180}
      /> */}
      <BackgroundEquirectangular />
      <Ocean />

      {children}
      <Preload all />
      {/* <OrbitControls  maxPolarAngle={Math.PI / 2 } maxDistance={2500} /> */}
    </Canvas>
  )
}
