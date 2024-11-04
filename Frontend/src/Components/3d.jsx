/* eslint-disable react/no-unknown-property */
import { Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import "./3d.css";

const Model = () => {
  const { scene } = useGLTF('/model/source/asus_rog_strix_scar_17_2023_g733_gaming_laptop.glb'); // Update this path
  const ref = useRef();

  const speed = 0.02; // Adjust speed of oscillation
  const amplitude = 0.5; // Maximum angle of oscillation

  // Animation logic
  useEffect(() => {
    let angle = 0; // Start angle
    const animate = () => {
      if (ref.current) {
        angle += speed; // Increment the angle
        // Oscillate between -amplitude and +amplitude
        ref.current.rotation.y = Math.sin(angle) * amplitude;
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, []);


  return <primitive ref={ref} object={scene} position={[1, -3.5, 0]}/>;
};

const ModelViewer = () => {
  return (
    <Canvas style={{ width: '100%', height: '100vh' }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
      <OrbitControls enableZoom={true} />
    </Canvas>
  );
};

export default ModelViewer;
