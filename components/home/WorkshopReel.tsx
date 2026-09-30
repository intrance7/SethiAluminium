"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { PlusRow } from "@/components/ui/PlusRow";

const MotionLink = motion.create(Link);

/**
 * Lusion's pinned "PLAY REEL" card: the section sticks while the card grows
 * from an inset panel to full width as you scroll through it (desktop only).
 * Swap the placeholder for a muted, looping workshop video when available.
 */
export function WorkshopReel() {
  const track = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start end", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.7], [0.62, 1]);
  const spread = useTransform(scrollYProgress, [0, 0.7], [-18, 0]);
  const leftX = useTransform(spread, (v) => `${v}vw`);
  const rightX = useTransform(spread, (v) => `${-v}vw`);

  return (
    <section ref={track} className="relative bg-paper lg:h-[220vh]">
      <div className="flex items-center px-5 py-10 sm:px-8 lg:sticky lg:top-0 lg:h-svh lg:px-12 lg:py-0">
        <div className="mx-auto w-full max-w-[1440px]">
          <PlusRow count={5} className="mb-3 hidden lg:flex" />
          <MotionLink
            href="/about"
            style={reduceMotion ? undefined : { scale }}
            className="group relative block aspect-[4/5] overflow-hidden rounded-2xl sm:aspect-video lg:aspect-auto lg:h-[calc(100svh-9rem)]"
          >
            <PlaceholderImage
              label="Workshop reel — add looping video"
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-ink/35" />
            <div className="absolute inset-0 flex items-center justify-center gap-4 text-[clamp(2.5rem,8vw,7rem)] leading-none tracking-tight text-paper sm:gap-8">
              <motion.span style={reduceMotion ? undefined : { x: leftX }}>SEE THE</motion.span>
              <span className="flex h-[0.8em] w-[1.4em] shrink-0 items-center justify-center rounded-full bg-paper text-ink transition-transform duration-500 group-hover:scale-110">
                <svg viewBox="0 0 24 24" className="h-[0.3em] w-[0.3em]" fill="currentColor" aria-hidden>
                  <path d="M7 4l13 8-13 8z" />
                </svg>
              </span>
              <motion.span style={reduceMotion ? undefined : { x: rightX }}>WORKSHOP</motion.span>
            </div>
          </MotionLink>
          <PlusRow count={5} className="mt-3 hidden lg:flex" />
        </div>
      </div>
    </section>
  );
}
