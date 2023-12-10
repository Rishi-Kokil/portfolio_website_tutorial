import React from 'react'
import { Suspense, useEffect, useState } from 'react'
import { Canvas, events } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';


import CanvasLoader from "../Loader";

const Computers = ({isMobile}) => {
  const computer = useGLTF("./desktop_pc/scene.gltf")

  return (
    // in three js we load the graphic or 3d model inside a mesh tag
    <mesh>
      <hemisphereLight intensity={0.5} groundColor='black' />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={13000}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0 , -4 , -2.2] :[0, -4, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
}

export const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(()=>{
    let mediaQuery = window.matchMedia('(max-width:500px)');

    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (e)=>{
      setIsMobile(e.matches)
    }

    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return ()=>{
      mediaQuery.removeEventListener("change" , handleMediaQueryChange)
    }

  }, []);

  return (
    <Canvas
      frameloop='demand'
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      // position is used to tell from which position are we looking towards the 3d model
      // fov is field of view which is in degrees
      gl={{ preserveDrawingBuffer: true }}
    >
      {/* Suspense is comming from react and not 3js it allows to add a 
      loader to your 3d graphic */}
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
}

export default ComputersCanvas