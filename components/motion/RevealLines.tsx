"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { clsx } from "clsx";

/**
 * Masked line-by-line reveal: each line slides up from behind its own
 * overflow-hidden mask when the block scrolls into view.
 */
export function RevealLines({
  lines,
  className,
  lineClassNames,
  delay = 0,
  as: Tag = "p",
}: {
  lines: string[];
  className?: string;
  /** Optional per-line classes, matched by index. */
  lineClassNames?: (string | undefined)[];
  delay?: number;
  as?: "p" | "h1" | "h2";
}) {
  // Observe the unclipped wrapper — the lines themselves start hidden behind
  // their masks, so an observer on them would never report them as visible.
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <Tag ref={ref as React.RefObject<never>} className={className} aria-label={lines.join(" ")}>
      {lines.map((line, i) => (
        <span key={i} aria-hidden className={clsx("block overflow-hidden pb-[0.08em]", lineClassNames?.[i])}>
          <motion.span
            className="block"
            initial={{ y: "110%" }}
            animate={{ y: inView ? "0%" : "110%" }}
            transition={{ duration: 1, delay: delay + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
