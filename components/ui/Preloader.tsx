"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PRELOADER_SEEN_KEY } from "@/lib/preloader";
import { markPreloaderDone } from "@/components/motion/usePreloaderDone";

/*
 * Intro sequence, in four phases:
 *
 *  loading  The outline of an aluminium angle (L) profile draws itself as the
 *           odometer counts up in irregular, realistic steps. It holds below
 *           100 until fonts and the page have actually finished loading.
 *  forged   The outline fills with brushed metal, a glint sweeps across it and
 *           the digits roll away.
 *  reveal   The metal L becomes a window onto the site: it folds open into a
 *           square and expands past the screen edges, revealing the page.
 *  done     Unmounted. Entrance animations waiting on usePreloaderDone() fire
 *           as the window opens, so nothing plays hidden behind the loader.
 *
 * Shown once per browser session; skipped for reduced motion and hidden
 * before first paint for returning visitors (see app/layout.tsx).
 */

type Phase = "loading" | "forged" | "reveal" | "done";

const EXPO = [0.16, 1, 0.3, 1] as const;
const IN_OUT = [0.76, 0, 0.24, 1] as const;

// Profile geometry, centred on 0,0. Both shapes use the same six points so the
// path can morph: the L's inner edge slides right to close into a square.
const SIZE = 120;
const H = SIZE / 2;
const T = SIZE * 0.3; // wall thickness of the angle
const L_PATH = `M${-H} ${-H} L${-H + T} ${-H} L${-H + T} ${H - T} L${H} ${H - T} L${H} ${H} L${-H} ${H} Z`;
const SQUARE_PATH = `M${-H} ${-H} L${H} ${-H} L${H} ${H - T} L${H} ${H - T} L${H} ${H} L${-H} ${H} Z`;

function alreadySeen() {
  try {
    return sessionStorage.getItem(PRELOADER_SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function pageLoaded() {
  const load =
    document.readyState === "complete"
      ? Promise.resolve()
      : new Promise<void>((resolve) => window.addEventListener("load", () => resolve(), { once: true }));
  // Never let a slow asset hold the intro hostage.
  const timeout = new Promise<void>((resolve) => setTimeout(resolve, 4000));
  return Promise.race([Promise.all([load, document.fonts?.ready]).then(() => undefined), timeout]);
}

/** One odometer wheel: a 0–9 strip that rolls to the current digit. */
function Digit({ value }: { value: number }) {
  return (
    <span className="relative inline-block h-[1em] overflow-hidden">
      <span
        className="flex flex-col transition-transform duration-[650ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
        style={{ transform: `translateY(${-value * 10}%)` }}
      >
        {Array.from({ length: 10 }, (_, d) => (
          <span key={d} className="block h-[1em] leading-none">
            {d}
          </span>
        ))}
      </span>
    </span>
  );
}

export function Preloader() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [progress, setProgress] = useState(0);
  const [revealScale, setRevealScale] = useState(20);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const later = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms));

    if (alreadySeen() || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      later(() => {
        setPhase("done");
        markPreloaderDone();
      }, 0);
      return () => timers.forEach(clearTimeout);
    }

    // Hold the page still (and at the top) while the intro plays.
    window.scrollTo(0, 0);
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    let loaded = false;
    let current = 0;
    const startedAt = performance.now();
    pageLoaded().then(() => (loaded = true));

    const step = () => {
      // Hold at 90 until the page is really ready; always run at least ~1.6s.
      const minTimeMet = performance.now() - startedAt > 1600;
      const cap = loaded && minTimeMet ? 100 : 90;
      if (current < cap) {
        current = Math.min(cap, current + 6 + Math.round(Math.random() * 14));
        setProgress(current);
      }
      if (current >= 100) {
        try {
          sessionStorage.setItem(PRELOADER_SEEN_KEY, "1");
        } catch {}
        // Scale needed for the square window to clear every screen corner.
        setRevealScale((Math.hypot(window.innerWidth, window.innerHeight) / SIZE) * 1.15);
        later(() => setPhase("forged"), 650);
        later(() => setPhase("reveal"), 1500);
        later(markPreloaderDone, 1750);
        later(() => {
          setPhase("done");
          root.style.overflow = previousOverflow;
        }, 2750);
        return;
      }
      later(step, 170 + Math.random() * 190);
    };
    later(step, 350);

    return () => {
      timers.forEach(clearTimeout);
      root.style.overflow = previousOverflow;
    };
  }, []);

  if (phase === "done") return null;

  const forged = phase !== "loading";
  const revealing = phase === "reveal";
  const digits = String(progress).padStart(3, "0").split("").map(Number);

  return (
    <div data-preloader aria-hidden className="pointer-events-none fixed inset-0 z-[200] text-paper">
      {/* Ink panel with an L-shaped hole that opens into the full page. */}
      <svg className="absolute inset-0 h-full w-full">
        <defs>
          <mask id="preloader-window">
            <rect width="100%" height="100%" fill="white" />
            <svg x="50%" y="50%" overflow="visible">
              <motion.path
                fill="black"
                initial={{ d: L_PATH, scale: 1, opacity: 0 }}
                animate={
                  revealing
                    ? { d: SQUARE_PATH, scale: revealScale, opacity: 1 }
                    : { d: L_PATH, scale: 1, opacity: 0 }
                }
                transition={{
                  opacity: { duration: 0.01 },
                  d: { duration: 0.5, ease: IN_OUT },
                  scale: { duration: 1.1, delay: 0.3, ease: [0.7, 0, 0.2, 1] },
                }}
              />
            </svg>
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="#12141a" mask="url(#preloader-window)" />
      </svg>

      {/* The profile itself: outline while loading, brushed metal once forged. */}
      <motion.svg
        viewBox={`${-H - 4} ${-H - 4} ${SIZE + 8} ${SIZE + 8}`}
        className="absolute left-1/2 top-1/2 -ml-[64px] -mt-[64px] h-[128px] w-[128px] overflow-visible"
        animate={{ opacity: revealing ? 0 : 1 }}
        transition={{ duration: 0.12 }}
      >
        <defs>
          <linearGradient id="preloader-metal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f4f5f7" />
            <stop offset="0.35" stopColor="#a4a9b1" />
            <stop offset="0.55" stopColor="#e6e8eb" />
            <stop offset="1" stopColor="#7d828b" />
          </linearGradient>
          <linearGradient id="preloader-glint" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <clipPath id="preloader-clip">
            <path d={L_PATH} />
          </clipPath>
        </defs>

        {/* Faint track + the outline drawing on with progress. */}
        <path d={L_PATH} fill="none" stroke="currentColor" strokeOpacity={0.12} strokeWidth={1.5} />
        <path
          d={L_PATH}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          pathLength={1}
          strokeDasharray="1 1"
          strokeDashoffset={1 - progress / 100}
          className="transition-[stroke-dashoffset] duration-[650ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
        />

        {/* Metal fill + a single glint sweeping across the face. */}
        <motion.path
          d={L_PATH}
          fill="url(#preloader-metal)"
          initial={{ opacity: 0 }}
          animate={{ opacity: forged ? 1 : 0 }}
          transition={{ duration: 0.5, ease: EXPO }}
        />
        <g clipPath="url(#preloader-clip)">
          <motion.rect
            y={-H}
            width={SIZE * 0.45}
            height={SIZE}
            fill="url(#preloader-glint)"
            transform="skewX(-20)"
            initial={{ x: -H * 2.2 }}
            animate={{ x: forged ? H * 1.6 : -H * 2.2 }}
            transition={{ duration: 0.8, delay: forged ? 0.15 : 0, ease: [0.45, 0, 0.2, 1] }}
          />
        </g>
      </motion.svg>

      {/* Corner copy — fades as the profile is forged. */}
      <motion.div
        className="absolute inset-x-0 top-0 mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 text-xs font-medium uppercase tracking-[0.15em] sm:px-8 lg:h-28 lg:px-12"
        animate={{ opacity: forged ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >
        <span className="font-display text-xl normal-case tracking-[0.08em] lg:text-2xl">
          SETHI ALUMINIUM
        </span>
        <span className="text-paper/50">Loading</span>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 mx-auto flex max-w-[1440px] items-end justify-between px-5 pb-5 sm:px-8 lg:px-12 lg:pb-8">
        <div className="overflow-hidden">
          <motion.p
            className="flex font-display text-[clamp(4.5rem,13vw,10rem)] leading-none tracking-[-0.04em] tabular-nums"
            animate={{ y: forged ? "105%" : "0%" }}
            transition={{ duration: 0.7, ease: IN_OUT }}
          >
            {digits.map((d, i) => (
              <Digit key={i} value={d} />
            ))}
          </motion.p>
        </div>
        <motion.p
          className="hidden pb-3 text-right text-xs font-medium uppercase leading-relaxed tracking-[0.15em] text-paper/50 sm:block"
          animate={{ opacity: forged ? 0 : 1 }}
          transition={{ duration: 0.4 }}
        >
          Measured · Fabricated
          <br />
          Installed
        </motion.p>
      </div>
    </div>
  );
}
