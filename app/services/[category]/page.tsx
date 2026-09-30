import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { PlusRow } from "@/components/ui/PlusRow";
import { RollText } from "@/components/ui/RollText";
import { NextPageLink } from "@/components/ui/NextPageLink";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { getServices, getServiceBySlug, getProjectsByService } from "@/lib/data";

export function generateStaticParams() {
  return getServices().map((service) => ({ category: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const service = getServiceBySlug(category);
  if (!service) return {};
  return {
    title: service.title,
    description: service.shortDescription,
  };
}

export default async function ServiceCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const service = getServiceBySlug(category);
  if (!service) notFound();

  const services = getServices();
  const next = services[(services.indexOf(service) + 1) % services.length];
  const relatedProjects = getProjectsByService(service.slug);

  return (
    <>
      <PageHero
        eyebrow={`${service.number} — Services`}
        title={[service.title]}
        caption={service.shortDescription}
      >
        <div className="mt-10 lg:mt-14">
          <PlaceholderImage
            label={`${service.title} — hero photo`}
            className="aspect-[4/3] w-full rounded-2xl sm:aspect-[16/7]"
          />
          <PlusRow count={4} className="mt-4" />
        </div>
      </PageHero>

      <section className="bg-paper py-16 lg:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] leading-[1] tracking-[-0.03em] text-ink lg:col-span-4">
              What&apos;s included
            </h2>
            <div className="lg:col-span-8">
              <ol className="border-b border-ink/10">
                {service.items.map((item, index) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-6 border-t border-ink/10 py-5 lg:py-6"
                  >
                    <span className="w-8 shrink-0 text-sm text-metal-500">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-2xl tracking-tight text-ink lg:text-3xl">{item}</span>
                  </li>
                ))}
              </ol>
              <Link
                href={`/quote?service=${service.slug}`}
                className="group mt-10 inline-flex h-12 items-center gap-3 rounded-full bg-ink px-6 text-xs font-medium uppercase tracking-wide text-paper transition-colors hover:bg-accent"
              >
                <RollText text={`Get a quote for ${service.title}`} />
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-paper pb-24 lg:pb-36">
        <Container>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] leading-[1] tracking-[-0.03em] text-ink">
            Related work
          </h2>
          {relatedProjects.length === 0 ? (
            <p className="mt-6 text-base text-metal-500">
              Project photos for this category are coming soon.
            </p>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
              {relatedProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          )}
        </Container>
      </section>

      <NextPageLink href={`/services/${next.slug}`} label="Next service" title={next.title} />
    </>
  );
}
