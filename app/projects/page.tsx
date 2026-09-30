import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ClosingCta } from "@/components/home/ClosingCta";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { getProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description: "Homes, shops and offices fabricated and installed by Sethi Aluminium.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow={`Projects — ${getProjects().length} and counting`}
        title={["Finished work"]}
        caption="Real jobs, measured, fabricated and installed by our own team across Haryana."
      />
      <ProjectsGrid />
      <ClosingCta />
    </>
  );
}
