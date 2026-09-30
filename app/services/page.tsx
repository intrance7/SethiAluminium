import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Aluminium, glass, exterior, interior, fabrication and design-installation services.",
};

export default function ServicesPage() {
  const services = getServices();

  return (
    <div className="pt-28 pb-20 lg:pt-36 lg:pb-32">
      <Container>
        <SectionHeading
          eyebrow="Services"
          title="Everything we build, in six categories."
          intro="Each category covers a full range of work — from a single window to a complete interior and exterior fit-out."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group rounded-2xl border border-ink/10 p-6 transition-colors hover:border-ink/30"
            >
              <span className="text-xs text-metal-500">{service.number}</span>
              <h3 className="mt-2 text-xl font-medium text-ink">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-metal-700">
                {service.shortDescription}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent">
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
