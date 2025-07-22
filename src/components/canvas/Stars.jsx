import { useState, useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const getStarColor = (larger) => {
  if (larger) return "#f272c8";
  const hexSoft = "#e7a6d1";
  return hexSoft;
};

const isLowEndDevice = () => {
  const cores = navigator.hardwareConcurrency || 4;
  const memory = navigator.deviceMemory || 4;
  return cores <= 2 || memory <= 2;
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const Stars = ({ larger = false, rotation, starCount, ...props }) => {
  const ref = useRef();
  const [sphere] = useState(() =>
    random.inSphere(
      new Float32Array(starCount * 3),
      { radius: 1.2 }
    )
  );

  const size = larger ? 0.004 : 0.002;
  const opacity = larger ? 0.90 : 1;
  const color = getStarColor(larger);

  return (
    <group rotation={rotation}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color={color}
          size={size}
          sizeAttenuation={true}
          opacity={opacity}
        />
      </Points>
    </group>
  );
};

// Shared rotation controller for both star layers
const StarsController = () => {
  const [rotation, setRotation] = useState([0, 0, Math.PI / 4]);
  // Reduce star count on low-end devices
  const starCount = useMemo(() => isLowEndDevice() ? 300 : 1000, []);
  const largeStarCount = useMemo(() => isLowEndDevice() ? 5 : 100, []);

  useFrame((state, delta) => {
    if (!prefersReducedMotion) {
      setRotation(([x, y, z]) => [
        x - delta / 10,
        y - delta / 10,
        z - delta / 20,
      ]);
    }
  });

  return (
    <>
      <Stars larger={false} rotation={rotation} starCount={starCount} />
      <Stars larger={true} rotation={rotation} starCount={largeStarCount} />
    </>
  );
};

const StarsCanvas = () => (
  <div className="w-full h-auto absolute inset-0 z-[-1]">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <StarsController />
      </Suspense>
      <Preload all />
    </Canvas>
  </div>
);

export default StarsCanvas;