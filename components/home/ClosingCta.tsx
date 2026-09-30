"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useScrollVelocity } from "@/components/motion/useScrollVelocity";

const PHRASE = "Let’s build together!";

/**
 * Lusion's closing marquee: a giant phrase drifting sideways, sped up by
 * scroll velocity. The whole band links to the quote form.
 */
export function ClosingCta() {
  const reduceMotion = useReducedMotion();
  const baseX = useMotionValue(0);
  const direction = useRef(-1);

  const smoothVelocity = useScrollVelocity({ damping: 50, stiffness: 400 });
  const boost = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

  useAnimationFrame((_, delta) => {
    if (reduceMotion) return;
    const b = boost.get();
    if (b < 0) direction.current = 1;
    else if (b > 0) direction.current = -1;
    const moveBy = direction.current * 2.5 * (delta / 1000) * (1 + Math.abs(b));
    // Two identical copies sit side by side, so wrap within one copy's width (-50%).
    let next = baseX.get() + moveBy;
    if (next <= -50) next += 50;
    if (next > 0) next -= 50;
    baseX.set(next);
  });

  const x = useTransform(baseX, (v) => `${v}%`);

  return (
    <section className="overflow-hidden bg-paper py-24 lg:py-36">
      <p className="px-5 text-center text-xs font-medium uppercase tracking-[0.15em] text-ink/70">
        Is your space ready for an upgrade?
      </p>

      <Link href="/quote" className="group mt-8 block" aria-label={`${PHRASE} Get a quote`}>
        <motion.div style={{ x }} className="flex w-max whitespace-nowrap" aria-hidden>
          {[0, 1].map((copy) => (
            <span
              key={copy}
              className="flex items-center gap-[0.4em] pr-[0.4em] text-[clamp(4rem,14vw,13rem)] leading-none tracking-[-0.04em] text-ink transition-colors duration-500 group-hover:text-accent"
            >
              {PHRASE}
              <span className="inline-block h-[0.18em] w-[0.18em] rounded-full bg-accent" />
              {PHRASE}
              <span className="inline-block h-[0.18em] w-[0.18em] rounded-full bg-accent" />
            </span>
          ))}
        </motion.div>
      </Link>

      <div className="mt-10 flex justify-center px-5">
        <Link
          href="/quote"
          className="inline-flex h-12 items-center gap-3 rounded-full bg-ink px-7 text-xs font-medium uppercase tracking-wide text-paper transition-colors hover:bg-accent"
        >
          Start a project
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
