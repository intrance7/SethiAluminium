import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SmartImage } from "@/components/ui/SmartImage";
import { PlusRow } from "@/components/ui/PlusRow";
import { RollText } from "@/components/ui/RollText";
import { NextPageLink } from "@/components/ui/NextPageLink";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { getProjects, getProjectBySlug } from "@/lib/data";
import { publicFileExists } from "@/lib/public-file";

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return { title: project.title, description: project.description };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const projects = getProjects();
  const next = projects[(projects.findIndex((p) => p.slug === slug) + 1) % projects.length];

  const facts = [
    { label: "Type", value: project.projectType },
    { label: "Location", value: project.location },
    { label: "Work", value: project.serviceLabels.join(", ") },
    { label: "Materials", value: project.materials.join(", ") },
  ];

  return (
    <>
      <PageHero eyebrow={`Project — ${project.projectType}`} title={[project.title]}>
        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-ink/10 pt-6 lg:mt-14 lg:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-xs font-medium uppercase tracking-[0.15em] text-metal-500">
                {fact.label}
              </dt>
              <dd className="mt-2 text-base text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <section className="bg-paper">
        <Container>
          <div className="overflow-hidden rounded-2xl">
            <SmartImage
              src={project.coverImage}
              label={`${project.title} — add real photo`}
              alt={`${project.title} in ${project.location}`}
              width={1600}
              height={900}
              priority
              className="aspect-[4/3] w-full object-cover sm:aspect-[16/9]"
            />
          </div>
          <PlusRow count={4} className="mt-4" />
        </Container>
      </section>

      <section className="bg-paper py-20 lg:py-32">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-metal-500 lg:col-span-3">
              About the project
            </p>
            <div className="lg:col-span-8 lg:col-start-5">
              <p className="text-[clamp(1.5rem,2.6vw,2.4rem)] leading-[1.2] tracking-tight text-ink">
                {project.description}
              </p>
              <Link
                href={`/quote?service=${project.services[0] ?? ""}`}
                className="group mt-10 inline-flex h-12 items-center gap-3 rounded-full bg-ink px-6 text-xs font-medium uppercase tracking-wide text-paper transition-colors hover:bg-accent"
              >
                <RollText text="Start a similar project" />
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Hidden until both photos are actually in /public — a broken slider looks worse than none. */}
      {publicFileExists(project.beforeImage) && publicFileExists(project.afterImage) && (
        <section className="bg-paper pb-20 lg:pb-32">
          <Container>
            <div className="grid gap-10 lg:grid-cols-12">
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] leading-[1] tracking-[-0.03em] text-ink lg:col-span-4">
                Before / after
              </h2>
              <div className="lg:col-span-8">
                <BeforeAfterSlider beforeSrc={project.beforeImage} afterSrc={project.afterImage} />
              </div>
            </div>
          </Container>
        </section>
      )}

      {project.gallery.length > 1 && (
        <section className="bg-paper pb-20 lg:pb-32">
          <Container>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
              {project.gallery.slice(1).map((image, index) => (
                <div key={image + index} className="overflow-hidden rounded-2xl">
                  <SmartImage
                    src={image}
                    label={`${project.title} photo ${index + 2}`}
                    alt={`${project.title} photo ${index + 2}`}
                    width={900}
                    height={675}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {next.slug !== project.slug && (
        <NextPageLink href={`/projects/${next.slug}`} label="Next project" title={next.title} />
      )}
    </>
  );
}
