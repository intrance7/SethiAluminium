import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/Button";
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

  const relatedProjects = getProjectsByService(service.slug);

  return (
    <div className="pt-28 pb-20 lg:pt-36 lg:pb-32">
      <Container>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-metal-500">
          {service.number} · Services
        </p>
        <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-medium tracking-tight text-ink">
          {service.title}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-metal-700">
          {service.shortDescription}
        </p>

        <PlaceholderImage
          label={`${service.title} — hero photo`}
          className="mt-10 aspect-[16/7] w-full rounded-3xl"
        />

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <div>
            <h2 className="text-lg font-medium text-ink">What&apos;s included</h2>
            <ul className="mt-4 space-y-2">
              {service.items.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-ink/10 px-4 py-3 text-sm text-ink/80"
                >
                  {item}
                </li>
              ))}
            </ul>
            <Button
              href={`/quote?service=${service.slug}`}
              className="mt-6 w-full sm:w-auto"
            >
              Get a Quote for {service.title}
            </Button>
          </div>

          <div>
            <h2 className="text-lg font-medium text-ink">Related work</h2>
            {relatedProjects.length === 0 ? (
              <p className="mt-4 text-sm text-metal-500">
                Project photos for this category are coming soon.
              </p>
            ) : (
              <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {relatedProjects.map((project) => (
                  <Link key={project.slug} href={`/projects/${project.slug}`}>
                    <SmartImage
                      src={project.coverImage}
                      label={project.title}
                      alt={project.title}
                      width={600}
                      height={450}
                      className="aspect-[4/3] w-full rounded-xl object-cover"
                    />
                    <p className="mt-2 text-sm font-medium text-ink">
                      {project.title}
                    </p>
                    <p className="text-xs text-metal-500">{project.location}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
