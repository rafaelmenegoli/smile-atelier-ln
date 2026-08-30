import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

type ToothKind = "incisor" | "canine" | "premolar" | "molar";

type ToothSpec = {
  position: [number, number, number];
  rotationY: number;
  scale: [number, number, number];
  kind: ToothKind;
};

const RX = 1.75;
const RZ = 2.15;
const SPREAD = Math.PI * 0.72;

function kindFor(indexFromCenter: number): ToothKind {
  if (indexFromCenter < 2) return "incisor";
  if (indexFromCenter < 3) return "canine";
  if (indexFromCenter < 5) return "premolar";
  return "molar";
}

/** 14 dentes por arcada, distribuídos ao longo da curva da arcada. */
function useArch(jaw: "upper" | "lower"): ToothSpec[] {
  return useMemo(() => {
    const perSide = 7;
    const specs: ToothSpec[] = [];
    const shrink = jaw === "lower" ? 0.9 : 1;
    for (let side = -1; side <= 1; side += 2) {
      for (let i = 0; i < perSide; i++) {
        const t = (i + 0.5) / perSide;
        const angle = side * THREE.MathUtils.lerp(0.07, SPREAD, Math.pow(t, 0.92));
        const x = Math.sin(angle) * RX * shrink;
        const z = -Math.cos(angle) * RZ * shrink;
        const kind = kindFor(i);
        const w = kind === "molar" ? 0.5 : kind === "premolar" ? 0.4 : kind === "canine" ? 0.34 : 0.36;
        const h = kind === "molar" ? 0.46 : kind === "premolar" ? 0.52 : kind === "canine" ? 0.68 : 0.6;
        const d = kind === "molar" ? 0.52 : kind === "premolar" ? 0.44 : 0.3;
        specs.push({
          position: [x, 0, z],
          rotationY: angle,
          scale: [w * shrink, h * (jaw === "lower" ? 0.92 : 1), d],
          kind,
        });
      }
    }
    return specs;
  }, [jaw]);
}

function Enamel() {
  return (
    <meshPhysicalMaterial
      color="#f8f2e9"
      roughness={0.24}
      metalness={0}
      clearcoat={1}
      clearcoatRoughness={0.18}
      sheen={0.5}
      sheenColor="#e9d7ba"
      transmission={0.1}
      thickness={0.5}
      ior={1.55}
    />
  );
}

function Tooth({ spec, flip }: { spec: ToothSpec; flip: boolean }) {
  const { kind, scale } = spec;
  const cusps: [number, number][] =
    kind === "molar"
      ? [
          [-0.26, -0.26],
          [0.26, -0.26],
          [-0.26, 0.26],
          [0.26, 0.26],
        ]
      : kind === "premolar"
        ? [
            [-0.22, 0],
            [0.22, 0],
          ]
        : [];

  const dir = flip ? -1 : 1;

  return (
    <group position={spec.position} rotation={[0, spec.rotationY, 0]} scale={[1, dir, 1]}>
      {/* coroa */}
      <RoundedBox
        args={[1, 1, 1]}
        radius={kind === "incisor" ? 0.3 : 0.34}
        smoothness={5}
        scale={scale}
        position={[0, scale[1] * 0.5, 0]}
        castShadow
        receiveShadow
      >
        <Enamel />
      </RoundedBox>

      {/* cúspides */}
      {cusps.map(([cx, cz], i) => (
        <mesh
          key={i}
          castShadow
          position={[cx * scale[0] * 2, scale[1] * 0.98, cz * scale[2] * 2]}
          scale={[scale[0] * 0.42, scale[1] * 0.3, scale[2] * 0.42]}
        >
          <sphereGeometry args={[0.5, 16, 12]} />
          <Enamel />
        </mesh>
      ))}

      {/* ponta do canino */}
      {kind === "canine" && (
        <mesh castShadow position={[0, scale[1] * 1.02, 0]} scale={[scale[0] * 0.8, scale[1] * 0.45, scale[2] * 0.8]}>
          <coneGeometry args={[0.5, 1, 16]} />
          <Enamel />
        </mesh>
      )}

      {/* raiz sugerida na gengiva */}
      <mesh position={[0, -scale[1] * 0.18, 0]} scale={[scale[0] * 1.08, scale[1] * 0.5, scale[2] * 1.08]}>
        <sphereGeometry args={[0.5, 16, 12]} />
        <meshStandardMaterial color="#d9a898" roughness={0.75} />
      </mesh>
    </group>
  );
}

/** Faixa de gengiva seguindo a curva da arcada. */
function Gum({ jaw }: { jaw: "upper" | "lower" }) {
  const geometry = useMemo(() => {
    const shrink = jaw === "lower" ? 0.9 : 1;
    const pts: THREE.Vector3[] = [];
    const steps = 64;
    for (let i = 0; i <= steps; i++) {
      const angle = THREE.MathUtils.lerp(-SPREAD - 0.12, SPREAD + 0.12, i / steps);
      pts.push(new THREE.Vector3(Math.sin(angle) * RX * shrink, 0, -Math.cos(angle) * RZ * shrink));
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    return new THREE.TubeGeometry(curve, 96, 0.3, 16, false);
  }, [jaw]);

  return (
    <mesh geometry={geometry} receiveShadow castShadow scale={[1, 0.8, 1]}>
      <meshPhysicalMaterial color="#dda393" roughness={0.62} clearcoat={0.4} clearcoatRoughness={0.6} sheen={0.4} sheenColor="#f0c4b6" />
    </mesh>
  );
}

function Jaw({ jaw }: { jaw: "upper" | "lower" }) {
  const specs = useArch(jaw);
  const y = jaw === "upper" ? 0.5 : -0.5;
  return (
    <group position={[0, y, 0]}>
      <Gum jaw={jaw} />
      {specs.map((s, i) => (
        <Tooth key={i} spec={s} flip={jaw === "upper"} />
      ))}
    </group>
  );
}

function Mouth() {
  const group = useRef<THREE.Group>(null);
  const upper = useRef<THREE.Group>(null);

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const g = group.current;
    if (!g) return;
    g.rotation.y += delta * 0.16;
    const { x, y } = state.pointer;
    g.rotation.x += (THREE.MathUtils.degToRad(14) - y * 0.12 - g.rotation.x) * Math.min(1, delta * 3);
    g.position.x += (x * 0.25 - g.position.x) * Math.min(1, delta * 3);
    g.position.y += (Math.sin(state.clock.elapsedTime * 0.6) * 0.06 - g.position.y) * Math.min(1, delta * 2);

    // leve abertura/fechamento da arcada superior
    if (upper.current) {
      const open = (Math.sin(state.clock.elapsedTime * 0.5) * 0.5 + 0.5) * 0.32;
      upper.current.position.y = open;
      upper.current.rotation.x = -open * 0.12;
    }
  });

  return (
    <group ref={group}>
      <group ref={upper}>
        <Jaw jaw="upper" />
      </group>
      <Jaw jaw="lower" />
    </group>
  );
}

export default function DentalArchScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 2.4, 6.8], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 7, 5]} intensity={1.6} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <directionalLight position={[-5, 2, -3]} intensity={0.5} color="#e3c79a" />
      <Suspense fallback={null}>
        <Mouth />
        <ContactShadows position={[0, -1.8, 0]} opacity={0.16} scale={12} blur={5} far={5} color="#7a6650" />
        <Environment>
          <Lightformer intensity={2.2} position={[0, 5, 1]} scale={[10, 10, 1]} color="#fffaf2" />
          <Lightformer intensity={1.1} color="#e6cda3" position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[16, 2, 1]} />
          <Lightformer intensity={0.9} color="#fff3e2" position={[5, 1, 1]} rotation-y={-Math.PI / 2} scale={[16, 2, 1]} />
        </Environment>
      </Suspense>
    </Canvas>
  );
}
