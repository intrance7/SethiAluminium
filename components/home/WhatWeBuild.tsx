"use client";

import { useState } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { getServices } from "@/lib/data";

export function WhatWeBuild() {
  const services = getServices();
  const [activeSlug, setActiveSlug] = useState(services[0].slug);
  const active = services.find((service) => service.slug === activeSlug)!;

  return (
    <section id="what-we-build" className="scroll-mt-20 bg-paper py-20 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="What we build"
          title="Six ways we shape a space."
          intro="From the frame to the finish — pick a category to see what's included."
        />

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          {/* Category list */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-1 lg:gap-2">
            {services.map((service) => (
              <button
                key={service.slug}
                type="button"
                onClick={() => setActiveSlug(service.slug)}
                className={clsx(
                  "flex min-h-[44px] items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors",
                  activeSlug === service.slug
                    ? "border-ink bg-ink text-paper"
                    : "border-ink/10 text-ink/80 hover:border-ink/30"
                )}
              >
                <span className="text-xs text-metal-500">
                  {service.number}
                </span>
                {service.title}
              </button>
            ))}
          </div>

          {/* Active category detail */}
          <div className="rounded-3xl border border-ink/10 p-6 sm:p-8">
            <PlaceholderImage
              label={`${active.title} — replace with real / 3D preview`}
              className="aspect-[4/3] w-full rounded-2xl"
            />
            <p className="mt-6 text-sm leading-relaxed text-metal-700">
              {active.shortDescription}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {active.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-metal-100 px-3 py-1.5 text-xs font-medium text-ink/80"
                >
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href={`/services/${active.slug}`}
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-dark"
            >
              Explore {active.title} work →
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
