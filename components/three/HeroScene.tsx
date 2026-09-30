"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import type { DeviceTier } from "@/lib/capability";

/* ------------------------------------------------------------------ */
/* Profile cross-sections — the actual extrusions the workshop cuts.   */
/* All sizes are in scene units; the shapes are extruded along Z.      */
/* ------------------------------------------------------------------ */

function rect(shape: THREE.Shape | THREE.Path, x: number, y: number, w: number, h: number) {
  shape.moveTo(x, y);
  shape.lineTo(x + w, y);
  shape.lineTo(x + w, y + h);
  shape.lineTo(x, y + h);
  shape.lineTo(x, y);
}

function boxSection() {
  const s = new THREE.Shape();
  rect(s, -0.35, -0.35, 0.7, 0.7);
  const hole = new THREE.Path();
  rect(hole, -0.27, -0.27, 0.54, 0.54);
  s.holes.push(hole);
  return s;
}

function angleSection() {
  const s = new THREE.Shape();
  s.moveTo(-0.4, -0.4);
  s.lineTo(0.4, -0.4);
  s.lineTo(0.4, -0.3);
  s.lineTo(-0.3, -0.3);
  s.lineTo(-0.3, 0.4);
  s.lineTo(-0.4, 0.4);
  s.lineTo(-0.4, -0.4);
  return s;
}

function teeSection() {
  const s = new THREE.Shape();
  s.moveTo(-0.45, 0.3);
  s.lineTo(-0.05, 0.3);
  s.lineTo(-0.05, -0.4);
  s.lineTo(0.05, -0.4);
  s.lineTo(0.05, 0.3);
  s.lineTo(0.45, 0.3);
  s.lineTo(0.45, 0.4);
  s.lineTo(-0.45, 0.4);
  s.lineTo(-0.45, 0.3);
  return s;
}

function channelSection() {
  const s = new THREE.Shape();
  s.moveTo(-0.4, -0.3);
  s.lineTo(0.4, -0.3);
  s.lineTo(0.4, 0.3);
  s.lineTo(0.31, 0.3);
  s.lineTo(0.31, -0.21);
  s.lineTo(-0.31, -0.21);
  s.lineTo(-0.31, 0.3);
  s.lineTo(-0.4, 0.3);
  s.lineTo(-0.4, -0.3);
  return s;
}

function tubeSection() {
  const s = new THREE.Shape();
  s.absarc(0, 0, 0.32, 0, Math.PI * 2, false);
  const hole = new THREE.Path();
  hole.absarc(0, 0, 0.24, 0, Math.PI * 2, true);
  s.holes.push(hole);
  return s;
}

const SECTIONS = [boxSection, angleSection, teeSection, channelSection, tubeSection];

function makeGeometry(section: () => THREE.Shape, length: number) {
  const geometry = new THREE.ExtrudeGeometry(section(), {
    depth: length,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.02,
    bevelSegments: 3,
    curveSegments: 24,
  });
  geometry.center();
  return geometry;
}

/* ------------------------------------------------------------------ */
/* Soft-body-ish simulation: every piece is pulled toward the centre,  */
/* pushed apart from its neighbours and shoved away by the cursor.     */
/* ------------------------------------------------------------------ */

type Body = {
  geometry: THREE.BufferGeometry;
  material: THREE.Material;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  spin: THREE.Vector3;
  radius: number;
};

// Deterministic PRNG so the arrangement is stable between renders.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

class ProfileSim {
  readonly bodies: Body[];
  private readonly materials: THREE.Material[];
  private readonly pointer = new THREE.Vector3(99, 99, 0);
  private readonly delta = new THREE.Vector3();

  constructor(count: number) {
    const aluminium = new THREE.MeshStandardMaterial({ color: "#e2e4e8", metalness: 1, roughness: 0.22, envMapIntensity: 1.4 });
    const anodised = new THREE.MeshStandardMaterial({ color: "#3a3d45", metalness: 0.6, roughness: 0.3, envMapIntensity: 1.2 });
    const copper = new THREE.MeshStandardMaterial({ color: "#d48a4f", metalness: 1, roughness: 0.22, envMapIntensity: 1.3 });
    this.materials = [aluminium, anodised, copper];

    const rand = mulberry32(7);
    this.bodies = Array.from({ length: count }, (_, i) => {
      const length = 1.1 + rand() * 1.1;
      const pick = rand();
      return {
        geometry: makeGeometry(SECTIONS[i % SECTIONS.length], length),
        material: pick < 0.6 ? aluminium : pick < 0.82 ? anodised : copper,
        position: new THREE.Vector3((rand() - 0.5) * 10, (rand() - 0.5) * 6, (rand() - 0.5) * 3),
        velocity: new THREE.Vector3(),
        spin: new THREE.Vector3((rand() - 0.5) * 0.6, (rand() - 0.5) * 0.6, (rand() - 0.5) * 0.6),
        radius: 0.55 + length * 0.18,
      };
    });
  }

  /** Advance one frame and copy the result onto the meshes. */
  step(dt: number, pointer: { x: number; y: number } | null, meshes: (THREE.Mesh | null)[]) {
    const { bodies, delta } = this;
    if (pointer) this.pointer.set(pointer.x, pointer.y, 0);
    else this.pointer.set(99, 99, 0);

    for (let i = 0; i < bodies.length; i++) {
      const a = bodies[i];

      // Pull toward a flattened centre so the pile reads as a cluster.
      a.velocity.x += -a.position.x * 1.2 * dt;
      a.velocity.y += -a.position.y * 1.6 * dt;
      a.velocity.z += -a.position.z * 2.0 * dt;

      // Separation from neighbours.
      for (let j = i + 1; j < bodies.length; j++) {
        const b = bodies[j];
        delta.subVectors(a.position, b.position);
        const dist = delta.length() || 0.0001;
        const minDist = a.radius + b.radius;
        if (dist < minDist) {
          delta.multiplyScalar(((minDist - dist) / dist) * 6 * dt);
          a.velocity.add(delta);
          b.velocity.sub(delta);
        }
      }

      // Cursor repulsion.
      delta.subVectors(a.position, this.pointer);
      delta.z *= 0.3;
      const pd = delta.length();
      if (pd < 1.8) {
        delta.normalize().multiplyScalar(((1.8 - pd) / 1.8) * 38 * dt);
        a.velocity.add(delta);
        a.spin.x += delta.y * 0.4;
        a.spin.y -= delta.x * 0.4;
      }

      a.velocity.multiplyScalar(1 - 2.4 * dt);
      a.spin.multiplyScalar(1 - 0.35 * dt);
      a.position.addScaledVector(a.velocity, dt);

      const mesh = meshes[i];
      if (mesh) {
        mesh.position.copy(a.position);
        mesh.rotation.x += (a.spin.x + 0.05) * dt;
        mesh.rotation.y += (a.spin.y + 0.08) * dt;
        mesh.rotation.z += a.spin.z * dt;
      }
    }
  }

  dispose() {
    this.bodies.forEach((b) => b.geometry.dispose());
    this.materials.forEach((m) => m.dispose());
  }
}

function Profiles({ count, pointerActive }: { count: number; pointerActive: React.RefObject<boolean> }) {
  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  const { viewport } = useThree();
  const sim = useMemo(() => new ProfileSim(count), [count]);

  useEffect(() => () => sim.dispose(), [sim]);

  useFrame((state, dt) => {
    const pointer = pointerActive.current
      ? { x: (state.pointer.x * viewport.width) / 2, y: (state.pointer.y * viewport.height) / 2 }
      : null;
    sim.step(Math.min(dt, 1 / 30), pointer, meshes.current);
  });

  return (
    <>
      {sim.bodies.map((body, i) => (
        <mesh
          key={i}
          ref={(el) => {
            meshes.current[i] = el;
          }}
          geometry={body.geometry}
          material={body.material}
          position={body.position.toArray()}
          rotation={[i * 0.7, i * 1.3, i * 0.4]}
        />
      ))}
    </>
  );
}

export function HeroScene({ tier }: { tier: DeviceTier }) {
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(true);
  const wrapper = useRef<HTMLDivElement>(null);
  const pointerActive = useRef(false);

  // Stop rendering entirely once the hero scrolls out of view.
  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapper}
      className="absolute inset-0"
      onPointerEnter={() => (pointerActive.current = true)}
      onPointerLeave={() => (pointerActive.current = false)}
    >
      <Canvas
        frameloop={inView ? "always" : "never"}
        dpr={tier === "full" ? [1, 2] : [1, 1.5]}
        camera={{ position: [0, 0, 9], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={() => setReady(true)}
        style={{ opacity: ready ? 1 : 0, transition: "opacity 0.8s ease" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 6, 5]} intensity={1.6} />
        <directionalLight position={[-6, -3, 2]} intensity={0.5} color="#ffd9b8" />

        <Suspense fallback={null}>
          {/* Studio strip lights give the metal those long Lusion-style highlights. */}
          <Environment resolution={256}>
            <color attach="background" args={["#5b6068"]} />
            <Lightformer form="rect" intensity={5} position={[0, 5, -2]} scale={[12, 1.2, 1]} />
            <Lightformer form="rect" intensity={3} position={[0, 0, 8]} scale={[10, 4, 1]} />
            <Lightformer form="rect" intensity={2.5} position={[-6, 1, 2]} rotation-y={Math.PI / 2} scale={[8, 0.8, 1]} />
            <Lightformer form="rect" intensity={2} position={[6, -1, 2]} rotation-y={-Math.PI / 2} scale={[8, 0.8, 1]} />
            <Lightformer form="ring" intensity={1.5} color="#ffb27a" position={[0, -4, 3]} scale={3} />
          </Environment>
          <Profiles count={tier === "full" ? 30 : 16} pointerActive={pointerActive} />
        </Suspense>
      </Canvas>
    </div>
  );
}
