"use client";

import Link from "next/link";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SmartImage } from "@/components/ui/SmartImage";
import { RollText } from "@/components/ui/RollText";
import { RevealLines } from "@/components/motion/RevealLines";
import { useScrollVelocity } from "@/components/motion/useScrollVelocity";
import { getProjects } from "@/lib/data";

export function FeaturedWork() {
  const projects = getProjects().slice(0, 6);
  const reduceMotion = useReducedMotion();

  // Cards lean slightly with scroll speed, then settle — Lusion's skew-on-scroll.
  const smooth = useScrollVelocity();
  const skewY = useTransform(smooth, [-3000, 0, 3000], [2.5, 0, -2.5], { clamp: true });

  return (
    <section className="bg-paper py-24 lg:py-36">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <RevealLines
            as="h2"
            lines={["Featured Work"]}
            className="text-[clamp(3rem,8vw,7.5rem)] leading-[0.95] tracking-[-0.03em] text-ink"
          />
          <p className="max-w-xs text-xs font-medium uppercase leading-relaxed tracking-wide text-ink/80 lg:pb-4">
            A selection of homes, shops and offices we have fabricated and
            installed across Haryana.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:mt-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              style={reduceMotion ? undefined : { skewY }}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.9, delay: (index % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/projects/${project.slug}`} className="group block">
                <div className="overflow-hidden rounded-2xl">
                  <SmartImage
                    src={project.coverImage}
                    label={`${project.title} — add real photo`}
                    alt={`${project.title} in ${project.location}`}
                    width={900}
                    height={600}
                    className="aspect-[3/2] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                </div>
                <p className="mt-4 text-xs font-medium uppercase tracking-wide text-ink/70">
                  {project.serviceLabels.join(" • ")}
                </p>
                <h3 className="mt-2 flex items-center text-[clamp(1.6rem,2.6vw,2.4rem)] leading-tight tracking-tight text-ink">
                  <span
                    aria-hidden
                    className="inline-block w-0 -translate-x-4 overflow-hidden text-accent opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:mr-3 group-hover:w-[1em] group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    →
                  </span>
                  <RollText text={project.title} />
                </h3>
                <p className="mt-1 text-sm text-metal-500">{project.location}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href="/projects"
            className="group inline-flex h-12 items-center gap-3 rounded-full border border-ink/20 px-6 text-xs font-medium uppercase tracking-wide text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
          >
            <RollText text="See all projects" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
