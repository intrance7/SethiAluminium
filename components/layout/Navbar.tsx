"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { clsx } from "clsx";
import { RollText } from "@/components/ui/RollText";
import { siteConfig } from "@/lib/site-config";
import { getServices } from "@/lib/data";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

const pill =
  "group h-11 items-center gap-3 rounded-full px-5 text-xs font-medium uppercase tracking-wide transition-colors duration-300";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const services = getServices();
  const panelRef = useRef<HTMLDivElement>(null);

  const [trackedPathname, setTrackedPathname] = useState(pathname);
  if (pathname !== trackedPathname) {
    setTrackedPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setMenuOpen(false);
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (panelRef.current?.contains(target)) return;
      if ((target as HTMLElement).closest?.("[data-menu-toggle]")) return;
      setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [menuOpen]);

  const bar =
    "mx-auto flex h-20 w-full max-w-[1440px] items-center px-5 sm:px-8 lg:h-28 lg:px-12";

  return (
    <>
      {/*
      The logo gets its own fixed layer: mix-blend-difference only inverts
      against the page when it isn't trapped inside the header's stacking
      context, so it stays readable over both light and dark sections.
    */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 mix-blend-difference">
        <div className={bar}>
          <Link
            href="/"
            className="pointer-events-auto font-display text-xl uppercase tracking-[0.08em] text-paper lg:text-2xl"
          >
            {siteConfig.shortName}
          </Link>
        </div>
      </div>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div className={clsx(bar, "justify-end")}>
          <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
            <a
              href={siteConfig.phoneHref}
              aria-label={`Call ${siteConfig.phone}`}
              className="hidden h-11 w-11 items-center justify-center rounded-full bg-metal-100 text-ink transition-colors hover:bg-metal-300 sm:flex"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden
              >
                <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
              </svg>
            </a>
            <Link
              href="/quote"
              className={clsx(
                pill,
                "hidden bg-ink text-paper hover:bg-metal-900 sm:inline-flex",
              )}
            >
              <RollText text="Get a Quote" />
              <span className="h-1 w-1 rounded-full bg-accent transition-transform duration-300 group-hover:scale-[2]" />
            </Link>
            <button
              type="button"
              data-menu-toggle
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              onClick={() => setMenuOpen((open) => !open)}
              className={clsx(
                pill,
                "inline-flex",
                menuOpen
                  ? "bg-ink text-paper"
                  : "bg-metal-100 text-ink hover:bg-metal-300",
              )}
            >
              <RollText text={menuOpen ? "Close" : "Menu"} />
              <span className="flex gap-[3px]" aria-hidden>
                <span
                  className={clsx(
                    "h-1 w-1 rounded-full bg-current transition-transform duration-300",
                    menuOpen && "translate-x-[3.5px]",
                  )}
                />
                <span
                  className={clsx(
                    "h-1 w-1 rounded-full bg-current transition-transform duration-300",
                    menuOpen && "-translate-x-[3.5px]",
                  )}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Anchor the panel to the content container so it lines up under MENU on wide screens. */}
        <div className="absolute inset-x-0 top-0 mx-auto max-w-[1440px]">
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                id="site-menu"
                ref={panelRef}
                initial={{ opacity: 0, y: -12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-auto absolute right-3 top-20 w-[calc(100%-1.5rem)] origin-top-right sm:right-8 sm:w-[420px] lg:right-12 lg:top-24"
              >
                <nav className="rounded-2xl bg-paper p-3 shadow-[0_20px_60px_-20px_rgba(18,20,26,0.35)]">
                  <ul>
                    {navLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={clsx(
                            "group flex items-center justify-between rounded-xl px-4 py-3 text-3xl tracking-tight transition-colors hover:bg-metal-100",
                            pathname === link.href ? "text-ink" : "text-ink/80",
                          )}
                        >
                          <RollText
                            text={link.label}
                            className="font-display"
                          />
                          <span
                            className="text-base text-accent opacity-0 transition-opacity group-hover:opacity-100"
                            aria-hidden
                          >
                            →
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-2 rounded-xl bg-metal-100 p-4">
                    <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-metal-500">
                      What we build
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {services.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          className="rounded-full border border-ink/10 bg-paper px-3 py-1.5 text-xs font-medium text-ink/80 transition-colors hover:border-ink/40 hover:text-ink"
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="mt-2 grid grid-cols-2 gap-2 sm:hidden">
                    <a
                      href={siteConfig.phoneHref}
                      className="flex min-h-[48px] items-center justify-center rounded-full border border-ink/20 text-sm font-medium text-ink"
                    >
                      Call Us
                    </a>
                    <Link
                      href="/quote"
                      className="flex min-h-[48px] items-center justify-center rounded-full bg-ink text-sm font-medium text-paper"
                    >
                      Get a Quote
                    </Link>
                  </div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
}
