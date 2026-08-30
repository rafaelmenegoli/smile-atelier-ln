import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

type ToothSpec = {
  position: [number, number, number];
  rotationY: number;
  scale: [number, number, number];
};

/** Distribui os dentes ao longo de um arco (formato de arcada superior). */
function useArch(): ToothSpec[] {
  return useMemo(() => {
    const count = 14;
    const rx = 2.15;
    const rz = 2.75;
    const specs: ToothSpec[] = [];
    for (let i = 0; i < count; i++) {
      // ângulo de -100° a 100° na frente da arcada
      const t = i / (count - 1);
      const angle = THREE.MathUtils.lerp(-Math.PI * 0.62, Math.PI * 0.62, t);
      const x = Math.sin(angle) * rx;
      const z = -Math.cos(angle) * rz;
      // incisivos frontais maiores e mais chatos, molares atrás mais largos
      const front = 1 - Math.abs(angle) / (Math.PI * 0.62);
      const w = THREE.MathUtils.lerp(0.46, 0.3, front);
      const h = THREE.MathUtils.lerp(0.42, 0.6, front);
      const d = THREE.MathUtils.lerp(0.44, 0.24, front);
      specs.push({
        position: [x, Math.sin(front * Math.PI * 0.5) * 0.06, z],
        rotationY: angle,
        scale: [w, h, d],
      });
    }
    return specs;
  }, []);
}

function Tooth({ spec }: { spec: ToothSpec }) {
  return (
    <group position={spec.position} rotation={[0, spec.rotationY, 0]}>
      <RoundedBox args={[1, 1, 1]} radius={0.34} smoothness={5} scale={spec.scale} castShadow>
        <meshPhysicalMaterial
          color="#f7f1e8"
          roughness={0.28}
          metalness={0}
          clearcoat={1}
          clearcoatRoughness={0.22}
          sheen={0.6}
          sheenColor="#e8d5b5"
          transmission={0.12}
          thickness={0.6}
          ior={1.5}
        />
      </RoundedBox>
      {/* raiz discreta */}
      <mesh position={[0, -spec.scale[1] * 0.72, 0]} scale={[spec.scale[0] * 0.55, spec.scale[1] * 0.9, spec.scale[2] * 0.55]}>
        <coneGeometry args={[0.5, 1, 12]} />
        <meshStandardMaterial color="#efe3d2" roughness={0.7} />
      </mesh>
    </group>
  );
}

function Arch() {
  const group = useRef<THREE.Group>(null);
  const specs = useArch();

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const g = group.current;
    if (!g) return;
    g.rotation.y += delta * 0.16;
    const { x, y } = state.pointer;
    g.rotation.x += (THREE.MathUtils.degToRad(18) - y * 0.12 - g.rotation.x) * Math.min(1, delta * 3);
    g.position.x += (x * 0.25 - g.position.x) * Math.min(1, delta * 3);
    g.position.y += (Math.sin(state.clock.elapsedTime * 0.6) * 0.08 - g.position.y) * Math.min(1, delta * 2);
  });

  return (
    <group ref={group}>
      {specs.map((s, i) => (
        <Tooth key={i} spec={s} />
      ))}
    </group>
  );
}

export default function DentalArchScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 2.6, 6.4], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 7, 5]} intensity={1.6} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <directionalLight position={[-5, 2, -3]} intensity={0.5} color="#e3c79a" />
      <Suspense fallback={null}>
        <Arch />
        <ContactShadows position={[0, -1.5, 0]} opacity={0.28} scale={12} blur={3} far={4} color="#7a6650" />
        <Environment>
          <Lightformer intensity={2.2} position={[0, 5, 1]} scale={[10, 10, 1]} color="#fffaf2" />
          <Lightformer intensity={1.1} color="#e6cda3" position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[16, 2, 1]} />
          <Lightformer intensity={0.9} color="#fff3e2" position={[5, 1, 1]} rotation-y={-Math.PI / 2} scale={[16, 2, 1]} />
        </Environment>
      </Suspense>
    </Canvas>
  );
}
