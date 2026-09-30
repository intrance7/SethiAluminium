"use client";

import { useAnimationFrame, useMotionValue, useScroll, useSpring } from "framer-motion";

/**
 * Smoothed page scroll velocity (px/s) that settles back to 0 when scrolling
 * stops. `useVelocity` holds its last value once scrollY stops changing, so
 * this samples `getVelocity()` (which reports 0 after ~30ms idle) every frame.
 */
export function useScrollVelocity(spring = { damping: 50, stiffness: 300 }) {
  const { scrollY } = useScroll();
  const raw = useMotionValue(0);
  useAnimationFrame(() => raw.set(scrollY.getVelocity()));
  return useSpring(raw, spring);
}
