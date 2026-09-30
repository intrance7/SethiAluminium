import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SmartImage } from "@/components/ui/SmartImage";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { Button } from "@/components/ui/Button";
import { getProjects, getProjectBySlug } from "@/lib/data";

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

  return (
    <div className="pt-28 pb-20 lg:pt-36 lg:pb-32">
      <Container>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-metal-500">
          {project.projectType} · {project.location}
        </p>
        <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-medium tracking-tight text-ink">
          {project.title}
        </h1>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.serviceLabels.map((label) => (
            <span
              key={label}
              className="rounded-full bg-metal-100 px-3 py-1 text-xs font-medium text-ink/70"
            >
              {label}
            </span>
          ))}
        </div>

        <SmartImage
          src={project.coverImage}
          label={project.title}
          alt={project.title}
          width={1200}
          height={800}
          className="mt-10 aspect-[16/9] w-full rounded-3xl object-cover"
        />

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <div>
            <h2 className="text-lg font-medium text-ink">About this project</h2>
            <p className="mt-3 text-sm leading-relaxed text-metal-700">
              {project.description}
            </p>
            <h3 className="mt-6 text-sm font-medium text-ink">
              Materials used
            </h3>
            <ul className="mt-2 flex flex-wrap gap-2">
              {project.materials.map((material) => (
                <li
                  key={material}
                  className="rounded-full border border-ink/10 px-3 py-1 text-xs text-ink/70"
                >
                  {material}
                </li>
              ))}
            </ul>
            <Button href="/quote" className="mt-6 w-full sm:w-auto">
              Start a Similar Project
            </Button>
          </div>

          <div>
            {project.beforeImage && project.afterImage ? (
              <>
                <h2 className="text-lg font-medium text-ink">Before / After</h2>
                <div className="mt-3">
                  <BeforeAfterSlider
                    beforeSrc={project.beforeImage}
                    afterSrc={project.afterImage}
                  />
                </div>
              </>
            ) : (
              project.gallery.length > 0 && (
                <>
                  <h2 className="text-lg font-medium text-ink">Gallery</h2>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {project.gallery.map((image, index) => (
                      <SmartImage
                        key={image + index}
                        src={image}
                        label={`${project.title} ${index + 1}`}
                        alt={`${project.title} photo ${index + 1}`}
                        width={500}
                        height={375}
                        className="aspect-[4/3] w-full rounded-xl object-cover"
                      />
                    ))}
                  </div>
                </>
              )
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
