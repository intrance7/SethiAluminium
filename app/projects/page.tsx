"use client";

import { useState } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { getProjects, getServices } from "@/lib/data";

export default function ProjectsPage() {
  const projects = getProjects();
  const services = getServices();
  const [filter, setFilter] = useState<string>("all");

  const filtered =
    filter === "all"
      ? projects
      : projects.filter((project) => project.services.includes(filter));

  return (
    <div className="pt-28 pb-20 lg:pt-36 lg:pb-32">
      <Container>
        <SectionHeading eyebrow="Projects" title="A look at finished work." />

        <div className="mt-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={clsx(
              "min-h-[40px] rounded-full border px-4 text-sm font-medium",
              filter === "all"
                ? "border-ink bg-ink text-paper"
                : "border-ink/15 text-ink/70"
            )}
          >
            All
          </button>
          {services.map((service) => (
            <button
              key={service.slug}
              type="button"
              onClick={() => setFilter(service.slug)}
              className={clsx(
                "min-h-[40px] rounded-full border px-4 text-sm font-medium",
                filter === service.slug
                  ? "border-ink bg-ink text-paper"
                  : "border-ink/15 text-ink/70"
              )}
            >
              {service.title}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`}>
              <SmartImage
                src={project.coverImage}
                label={project.title}
                alt={project.title}
                width={600}
                height={450}
                className="aspect-[4/3] w-full rounded-2xl object-cover"
              />
              <h3 className="mt-3 text-base font-medium text-ink">
                {project.title}
              </h3>
              <p className="text-sm text-metal-500">{project.location}</p>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 text-sm text-metal-500">
            No projects in this category yet.
          </p>
        )}
      </Container>
    </div>
  );
}
