import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description: "The workshop and story behind Sethi Aluminium & Interiors.",
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20 lg:pt-36 lg:pb-32">
      <Container>
        <SectionHeading
          eyebrow="About"
          title="Made in the workshop, fitted on-site."
          intro={siteConfig.description}
        />

        <PlaceholderImage
          label="Workshop / team photo — replace with real image"
          className="mt-10 aspect-[16/7] w-full rounded-3xl"
        />

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-lg font-medium text-ink">Our story</h2>
            <p className="mt-3 text-sm leading-relaxed text-metal-700">
              [Add the founding story here — when the workshop started, what
              it specialises in, and what sets the work apart.]
            </p>
          </div>
          <div>
            <h2 className="text-lg font-medium text-ink">Service areas</h2>
            <ul className="mt-3 space-y-1 text-sm text-metal-700">
              {siteConfig.serviceAreas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
            <h2 className="mt-6 text-lg font-medium text-ink">Hours</h2>
            <p className="mt-2 text-sm text-metal-700">{siteConfig.hours}</p>
          </div>
        </div>
      </Container>
    </div>
  );
}
