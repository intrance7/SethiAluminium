"use client";

import dynamic from "next/dynamic";
import { useDeviceTier } from "@/lib/capability";

const HeroScene = dynamic(
  () => import("./HeroScene").then((mod) => mod.HeroScene),
  { ssr: false }
);

export function Hero3D() {
  const tier = useDeviceTier();

  if (tier === null || tier === "off") return null;

  return <HeroScene tier={tier} />;
}
