import { Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import CanvasLoader from '../Loader';

const Earth = () => {
  const earth = useGLTF('./planet/scene.gltf');
  return (
    <primitive
      object={earth.scene}
      scale={2.5}
      position-y={0}
      rotation-y={0}
    />
  )
}

const EarthCanvas = () => {
  const controlsRef = useRef();
  const timeoutRef = useRef(null);
  const isUserInteracting = useRef(false);

  const handleStart = () => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    isUserInteracting.current = true;

    // Disable auto-rotation when user starts interacting
    if (controlsRef.current) {
      controlsRef.current.autoRotate = false;
    }
  };

  const handleEnd = () => {
    isUserInteracting.current = false;

    // Set a timeout to re-enable auto-rotation after natural damping settles
    timeoutRef.current = setTimeout(() => {
      if (controlsRef.current && !isUserInteracting.current) {
        // Only reset momentum when we're about to resume auto-rotation
        // This allows natural damping during user interaction
        if (controlsRef.current._sphericalDelta) {
          controlsRef.current._sphericalDelta.set(0, 0, 0);
        }
        if (controlsRef.current._panOffset) {
          controlsRef.current._panOffset.set(0, 0, 0);
        }

        controlsRef.current.autoRotate = true;
        controlsRef.current.update();
      }
    }, 800); // Longer timeout to allow natural damping to finish
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <Canvas
      shadows
      // Remove frameloop='demand' to allow continuous rendering for auto-rotation
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        far: 200,
        position: [-4, 3, 6],
        near: 0.1,
        fov: 45
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          ref={controlsRef}
          autoRotate={true}
          autoRotateSpeed={1.5}
          enableZoom={false}
          enableDamping={true}
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          onStart={handleStart}
          onEnd={handleEnd}
        />
        <Earth />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}

export default EarthCanvas