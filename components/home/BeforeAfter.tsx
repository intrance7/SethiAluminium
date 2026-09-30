import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { getProjects } from "@/lib/data";
import { publicFileExists } from "@/lib/public-file";

export function BeforeAfter() {
  const project = getProjects().find(
    (p) => publicFileExists(p.beforeImage) && publicFileExists(p.afterImage)
  );

  if (!project) return null;

  return (
    <section className="bg-paper py-20 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Before / after"
          title="Drag to see the difference."
          intro={`${project.title} — ${project.location}`}
        />
        <div className="mt-10 max-w-4xl">
          <BeforeAfterSlider
            beforeSrc={project.beforeImage}
            afterSrc={project.afterImage}
          />
        </div>
      </Container>
    </section>
  );
}
