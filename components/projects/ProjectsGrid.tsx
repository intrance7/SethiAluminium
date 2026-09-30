"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { clsx } from "clsx";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { getProjects, getServices } from "@/lib/data";

export function ProjectsGrid() {
  const projects = getProjects();
  // Only offer filters that would actually show something.
  const services = getServices().filter((service) =>
    projects.some((project) => project.services.includes(service.slug))
  );
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.services.includes(filter));

  const filters = [{ slug: "all", title: "All work" }, ...services];

  return (
    <section className="bg-paper pb-24 lg:pb-36">
      <Container>
        <div className="flex flex-wrap gap-2 border-t border-ink/10 pt-6" role="group" aria-label="Filter projects">
          {filters.map((f) => (
            <button
              key={f.slug}
              type="button"
              aria-pressed={filter === f.slug}
              onClick={() => setFilter(f.slug)}
              className={clsx(
                "h-11 rounded-full px-5 text-xs font-medium uppercase tracking-wide transition-colors",
                filter === f.slug
                  ? "bg-ink text-paper"
                  : "bg-metal-100 text-ink hover:bg-metal-300"
              )}
            >
              {f.title}
              {f.slug !== "all" && (
                <span className="ml-2 opacity-50">
                  {projects.filter((p) => p.services.includes(f.slug)).length}
                </span>
              )}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
