import React from 'react'
import { Cloud } from '@react-three/drei'



export default function Clouds({ ...props }) {
    return (
        <>
        <group name="clouds" position={[0,-30,0]}>
            <Cloud position={[-4, -2, 0]} args={[3, 2]} />
            <Cloud position={[-4, 2, 0]} args={[3, 2]} />
            <Cloud args={[3, 2]} />
            <Cloud position={[4, -2, 0]} args={[3, 2]} />
            <Cloud position={[4, 2, 0]} args={[3, 2]} />
        </group>
        </>
    )
}