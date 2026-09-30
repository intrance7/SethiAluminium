"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PRELOADER_SEEN_KEY } from "@/lib/preloader";


function alreadySeen() {
  try {
    return sessionStorage.getItem(PRELOADER_SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * Lusion-style intro: dark screen with a 000 → 100 counter, then the panel
 * lifts away. Shown once per browser session; skipped for reduced motion.
 */
export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);
  // Returning visitors: drop the panel without the lift animation.
  const [instant, setInstant] = useState(false);

  useEffect(() => {
    if (
      alreadySeen() ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      const skip = requestAnimationFrame(() => {
        setInstant(true);
        setVisible(false);
      });
      return () => cancelAnimationFrame(skip);
    }

    const duration = 1600;
    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // ease-out so the counter decelerates into 100
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        try {
          sessionStorage.setItem(PRELOADER_SEEN_KEY, "1");
        } catch {}
        setTimeout(() => setVisible(false), 250);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          aria-hidden
          exit={{ y: "-100%" }}
          transition={{ duration: instant ? 0 : 0.9, ease: [0.76, 0, 0.24, 1] }}
          data-preloader
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink text-paper"
        >
          <div className="h-8 w-40 overflow-hidden rounded-sm bg-paper/15">
            <div
              className="h-full bg-paper/40 transition-[width] duration-100"
              style={{ width: `${count}%` }}
            />
          </div>
          <p className="absolute bottom-0 left-0 px-5 font-display text-[clamp(4rem,12vw,9rem)] leading-[0.85] tabular-nums sm:px-8 lg:px-12">
            {String(count).padStart(3, "0")}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
