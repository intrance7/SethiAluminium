"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { clsx } from "clsx";
import type { Service } from "@/lib/data";

/**
 * Lusion's S / C / T / P expertise tiles, one per service. The first
 * letter is the tile's hero; opening a tile lists everything it covers.
 */
export function ExpertiseTiles({ services }: { services: Service[] }) {
  const [open, setOpen] = useState<string | null>(services[0]?.slug ?? null);

  return (
    <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => {
        const isOpen = open === service.slug;
        return (
          <div
            key={service.slug}
            className={clsx(
              "rounded-2xl p-6 transition-colors duration-500 lg:p-8",
              isOpen ? "bg-ink text-paper" : "bg-metal-100 text-ink"
            )}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`expertise-${service.slug}`}
              onClick={() => setOpen(isOpen ? null : service.slug)}
              className="flex w-full items-start justify-between text-left"
            >
              <span>
                <span className="block text-xs font-medium uppercase tracking-[0.15em] opacity-60">
                  {service.number}
                </span>
                <span className="mt-2 block text-2xl tracking-tight lg:text-3xl">{service.title}</span>
              </span>
              <span
                aria-hidden
                className={clsx(
                  "font-display text-[5.5rem] leading-[0.75] tracking-[-0.04em] transition-colors duration-500 lg:text-[7rem]",
                  isOpen ? "text-accent" : "text-ink/15"
                )}
              >
                {service.title[0]}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`expertise-${service.slug}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <ul className="mt-6 space-y-2 border-t border-paper/15 pt-5 text-sm text-paper/75">
                    {service.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <Link
                    href={`/services/${service.slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-accent hover:text-paper"
                  >
                    Explore {service.title} →
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
