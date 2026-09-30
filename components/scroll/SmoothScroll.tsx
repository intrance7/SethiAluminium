"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { usePointerFine } from "@/lib/capability";

export function SmoothScroll() {
  const pointerFine = usePointerFine();

  useEffect(() => {
    if (!pointerFine) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    let raf: number;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [pointerFine]);

  return null;
}
