import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { RollText } from "@/components/ui/RollText";
import { ClosingCta } from "@/components/home/ClosingCta";
import { getServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Aluminium, glass, exterior, interior, fabrication and design-installation services.",
};

export default function ServicesPage() {
  const services = getServices();

  return (
    <>
      <PageHero
        eyebrow="Services"
        title={["Everything", "we build"]}
        caption="Six categories, one team. From a single window to a complete interior and exterior fit-out."
      />

      <section className="bg-paper pb-24 lg:pb-36">
        <Container>
          <ul className="border-b border-ink/10">
            {services.map((service) => (
              <li key={service.slug} className="border-t border-ink/10">
                <Link
                  href={`/services/${service.slug}`}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-2 py-8 sm:gap-x-8 lg:grid-cols-[6rem_1fr_minmax(0,22rem)_auto] lg:py-10"
                >
                  <span className="self-start pt-2 text-sm text-metal-500 lg:pt-4">
                    {service.number}
                  </span>
                  <span className="text-[clamp(2.25rem,6vw,5rem)] leading-[1.05] tracking-[-0.03em] text-ink transition-colors duration-300 group-hover:text-accent">
                    <RollText text={service.title} />
                  </span>
                  <span className="col-span-3 col-start-2 row-start-2 text-sm leading-relaxed text-metal-700 lg:col-span-1 lg:col-start-3 lg:row-start-1">
                    {service.shortDescription}
                  </span>
                  <span
                    aria-hidden
                    className="col-start-3 row-start-1 flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-paper lg:col-start-4 lg:h-14 lg:w-14"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ClosingCta />
    </>
  );
}
