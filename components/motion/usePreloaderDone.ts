"use client";

import { useSyncExternalStore } from "react";

// Module-level flag shared by the Preloader (writer) and any entrance
// animation that should wait for the page to be revealed (readers).
let done = false;
const listeners = new Set<() => void>();

export function markPreloaderDone() {
  if (done) return;
  done = true;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** True once the intro preloader has revealed the page (or was skipped). */
export function usePreloaderDone() {
  return useSyncExternalStore(
    subscribe,
    () => done,
    () => false
  );
}
