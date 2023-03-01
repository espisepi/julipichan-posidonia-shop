import { useEffect } from 'react';
import * as THREE from 'three';
import { useLoader, useThree } from '@react-three/fiber';


export default function BackgroundEquirectangular({ ...props }) {
    const texture = useLoader(THREE.TextureLoader, '/img/umhlanga_sunrise.jpg');
    texture.mapping = THREE.EquirectangularReflectionMapping;
    texture.encoding = THREE.sRGBEncoding;
    const {scene} = useThree();
    useEffect(()=>{
        scene.background = texture;
    },[texture]);
    return null;
}
