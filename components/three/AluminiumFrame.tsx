import { useMemo } from "react";
import { MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

const FRAME_COLOR = "#c7c9cd";
const BAR_THICKNESS = 0.12;
const DEPTH = 0.16;
const WIDTH = 2.6;
const HEIGHT = 3.2;

function Bar({
  position,
  size,
}: {
  position: [number, number, number];
  size: [number, number, number];
}) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={FRAME_COLOR}
        metalness={1}
        roughness={0.32}
        envMapIntensity={1.4}
      />
    </mesh>
  );
}

function GlassPane({
  position,
  size,
  simple,
}: {
  position: [number, number, number];
  size: [number, number];
  simple: boolean;
}) {
  if (simple) {
    return (
      <mesh position={position}>
        <planeGeometry args={size} />
        <meshPhysicalMaterial
          color="#dfe7ea"
          transmission={0.9}
          roughness={0.08}
          thickness={0.2}
          ior={1.4}
          metalness={0}
        />
      </mesh>
    );
  }

  return (
    <mesh position={position}>
      <planeGeometry args={size} />
      <MeshTransmissionMaterial
        transmission={1}
        thickness={0.3}
        roughness={0.04}
        ior={1.4}
        chromaticAberration={0.02}
        anisotropy={0.1}
        distortion={0.05}
        distortionScale={0.2}
        temporalDistortion={0.1}
        color="#eef5f7"
      />
    </mesh>
  );
}

export function AluminiumFrame({ simpleGlass = false }: { simpleGlass?: boolean }) {
  const paneWidth = (WIDTH - BAR_THICKNESS * 3) / 2;
  const paneHeight = (HEIGHT - BAR_THICKNESS * 3) / 2;

  const panePositions = useMemo<[number, number, number][]>(
    () => [
      [-(paneWidth / 2 + BAR_THICKNESS / 2), paneHeight / 2 + BAR_THICKNESS / 2, 0],
      [paneWidth / 2 + BAR_THICKNESS / 2, paneHeight / 2 + BAR_THICKNESS / 2, 0],
      [-(paneWidth / 2 + BAR_THICKNESS / 2), -(paneHeight / 2 + BAR_THICKNESS / 2), 0],
      [paneWidth / 2 + BAR_THICKNESS / 2, -(paneHeight / 2 + BAR_THICKNESS / 2), 0],
    ],
    [paneWidth, paneHeight]
  );

  return (
    <group>
      {/* Outer frame */}
      <Bar position={[0, HEIGHT / 2, 0]} size={[WIDTH, BAR_THICKNESS, DEPTH]} />
      <Bar position={[0, -HEIGHT / 2, 0]} size={[WIDTH, BAR_THICKNESS, DEPTH]} />
      <Bar position={[-WIDTH / 2, 0, 0]} size={[BAR_THICKNESS, HEIGHT, DEPTH]} />
      <Bar position={[WIDTH / 2, 0, 0]} size={[BAR_THICKNESS, HEIGHT, DEPTH]} />

      {/* Mullions */}
      <Bar position={[0, 0, 0]} size={[WIDTH, BAR_THICKNESS, DEPTH * 0.85]} />
      <Bar position={[0, 0, 0]} size={[BAR_THICKNESS, HEIGHT, DEPTH * 0.85]} />

      {/* Glass panes */}
      {panePositions.map((position, index) => (
        <GlassPane
          key={index}
          position={position}
          size={[paneWidth - 0.04, paneHeight - 0.04]}
          simple={simpleGlass}
        />
      ))}
    </group>
  );
}

export const FRAME_BOUNDS = new THREE.Vector2(WIDTH, HEIGHT);
