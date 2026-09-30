"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Hero3D } from "@/components/three/Hero3D";
import { usePreloaderDone } from "@/components/motion/usePreloaderDone";

const WORD = "SETHI";

/**
 * Dark full-screen opener (Lusion's About hero): the floating aluminium
 * profiles behind a giant wordmark whose letters flip up into place.
 */
export function AboutHero() {
  const reduceMotion = useReducedMotion();
  const ready = usePreloaderDone();

  return (
    <section className="relative flex h-svh min-h-[560px] flex-col justify-end overflow-hidden bg-ink text-paper">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,_#2b2e34,_#12141a_65%)]" />
      <div className="absolute inset-0 opacity-60">
        <Hero3D />
      </div>
      {/* Keeps the wordmark readable over the metal. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />

      <div className="pointer-events-none relative mx-auto w-full max-w-[1440px] px-5 pb-6 sm:px-8 lg:px-12 lg:pb-8">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-paper/60">
          About us
        </p>

        <div className="mt-6 flex justify-between text-lg leading-none text-paper/50" aria-hidden>
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i}>+</span>
          ))}
        </div>

        <h1
          aria-label="Sethi"
          className="mt-4 flex justify-between text-[29vw] font-medium leading-[0.8] tracking-[-0.04em] [perspective:800px] lg:text-[min(29vw,27rem)]"
        >
          {Array.from(WORD).map((letter, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="inline-block origin-bottom"
              initial={reduceMotion ? false : { rotateX: -95, y: "30%", opacity: 0 }}
              animate={ready ? { rotateX: 0, y: "0%", opacity: 1 } : undefined}
              transition={{ duration: 1.2, delay: 0.15 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        <p className="mt-4 text-right text-xs font-medium uppercase tracking-[0.15em] text-paper/80">
          Scroll to explore
        </p>
      </div>
    </section>
  );
}
