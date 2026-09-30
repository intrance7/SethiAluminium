"use client";

import { useSyncExternalStore } from "react";

export type DeviceTier = "full" | "lite" | "off";

function detectWebGL2(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!canvas.getContext("webgl2");
  } catch {
    return false;
  }
}

function detectTier(): DeviceTier {
  if (!detectWebGL2()) return "off";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReducedMotion) return "off";

  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean; effectiveType?: string };
  };

  if (nav.connection?.saveData) return "off";
  if (
    nav.connection?.effectiveType &&
    ["slow-2g", "2g", "3g"].includes(nav.connection.effectiveType)
  ) {
    return "off";
  }

  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory < 4;
  const smallViewport = window.innerWidth < 768;

  if (isCoarsePointer || lowMemory || smallViewport) return "lite";

  return "full";
}

function noopSubscribe() {
  return () => {};
}

function getServerTierSnapshot(): DeviceTier | null {
  return null;
}

/**
 * Runs once per session via useSyncExternalStore rather than
 * useState+useEffect — avoids an extra render pass and a client/server
 * hydration mismatch (server snapshot is `null` until the client reads
 * the real capability check post-hydration).
 */
export function useDeviceTier(): DeviceTier | null {
  return useSyncExternalStore(noopSubscribe, detectTier, getServerTierSnapshot);
}

function subscribePointerFine(callback: () => void) {
  const mq = window.matchMedia("(pointer: fine)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getPointerFineSnapshot() {
  return window.matchMedia("(pointer: fine)").matches;
}

function getServerPointerFineSnapshot() {
  return false;
}

export function usePointerFine(): boolean {
  return useSyncExternalStore(
    subscribePointerFine,
    getPointerFineSnapshot,
    getServerPointerFineSnapshot
  );
}
