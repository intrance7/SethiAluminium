import Link from "next/link";
import { SmartImage } from "@/components/ui/SmartImage";
import { RollText } from "@/components/ui/RollText";
import type { Project } from "@/lib/data";

/** Lusion-style work card: rounded image, tag line, title with slide-in arrow. */
export function ProjectCard({ project, size = "lg" }: { project: Project; size?: "lg" | "sm" }) {
  return (
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
      <h3
        className={
          size === "lg"
            ? "mt-2 flex items-center text-[clamp(1.6rem,2.6vw,2.4rem)] leading-tight tracking-tight text-ink"
            : "mt-2 flex items-center text-2xl leading-tight tracking-tight text-ink"
        }
      >
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
  );
}
