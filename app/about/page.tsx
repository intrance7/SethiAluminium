import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { NextPageLink } from "@/components/ui/NextPageLink";
import { RevealLines } from "@/components/motion/RevealLines";
import { ScrollWords } from "@/components/motion/ScrollWords";
import { AboutHero } from "@/components/about/AboutHero";
import { ExpertiseTiles } from "@/components/about/ExpertiseTiles";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { ClosingCta } from "@/components/home/ClosingCta";
import { getServices } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description: "The workshop and team behind Sethi Aluminium & Interiors.",
};

/*
 * PLACEHOLDER CONTENT — replace with the owner's real details and figures.
 * Totals shown here are illustrative and must be confirmed before launch.
 */
const TEAM = [
  {
    name: "[Founder name]",
    role: "Founder & head fabricator",
  },
];

const MATERIALS = [
  "Aluminium sections",
  "Toughened glass",
  "ACP sheets",
  "UPVC",
  "PVC panels",
  "Gypsum board",
  "Stainless steel",
  "Mild steel",
];

const TRACK_RECORD = {
  total: 250,
  groups: [
    {
      title: "Projects by type",
      rows: [
        { count: 140, label: "Homes" },
        { count: 60, label: "Shops & showrooms" },
        { count: 30, label: "Offices" },
        { count: 20, label: "Commercial buildings" },
      ],
    },
    {
      title: "In the field",
      rows: [
        { count: 12, label: "Years in business" },
        { count: siteConfig.serviceAreas.length, label: "Towns served" },
        { count: 6, label: "Service categories" },
      ],
    },
  ],
};

const pad = (n: number) => String(n).padStart(3, "0");

export default function AboutPage() {
  const services = getServices();

  return (
    <>
      <AboutHero />

      {/* Manifesto */}
      <section className="bg-paper py-24 lg:py-40">
        <Container>
          <RevealLines
            as="h2"
            lines={["We are a fabrication", "workshop building", "the frames, glass", "and interiors of Haryana"]}
            className="text-[clamp(1.75rem,4.2vw,4rem)] uppercase leading-[1.02] tracking-[-0.02em] text-ink"
          />
          <div className="mt-16 grid lg:mt-24 lg:grid-cols-12">
            <ScrollWords
              text="A local team of fabricators, glaziers and installers who measure on site, build in our own workshop and fit every piece ourselves — so what you approve on paper is exactly what goes on your wall."
              className="text-[clamp(1.5rem,3vw,2.75rem)] leading-[1.2] tracking-tight text-ink lg:col-span-9 lg:col-start-4"
            />
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="bg-paper pb-24 lg:pb-36">
        <Container>
          {TEAM.map((person, index) => (
            <div key={person.name} className="grid gap-8 border-t border-ink/10 pt-8 lg:grid-cols-12 lg:gap-12">
              <p className="font-display text-2xl tracking-tight text-ink/40 lg:col-span-2">
                [[ {pad(index + 1)} ]]
              </p>
              <div className="lg:col-span-4">
                <PlaceholderImage
                  label="Founder portrait — add photo"
                  className="aspect-[4/5] w-full rounded-2xl"
                />
                <p className="mt-4 text-2xl tracking-tight text-ink">{person.name}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.15em] text-metal-500">
                  {person.role}
                </p>
              </div>
              <div className="flex items-end lg:col-span-5 lg:col-start-8">
                <p className="text-lg leading-relaxed text-metal-700">
                  We bring measuring, fabrication and installation into one
                  process, run by one team. Decisions move from the site visit
                  to the workshop floor without getting lost in between — and
                  the result is work that fits, lasts and looks finished.
                </p>
              </div>
            </div>
          ))}
        </Container>
      </section>

      {/* Materials marquee (Lusion's "brands we work with") */}
      <section className="overflow-hidden border-y border-ink/10 bg-paper py-10">
        <p className="px-5 text-center text-xs font-medium uppercase tracking-[0.15em] text-metal-500">
          Materials we work with
        </p>
        <div className="mt-6 flex w-max animate-[marquee_40s_linear_infinite] motion-reduce:animate-none" aria-hidden>
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center">
              {MATERIALS.map((material) => (
                <span
                  key={material}
                  className="flex items-center gap-8 pr-8 text-3xl tracking-tight text-ink/70 lg:text-5xl"
                >
                  {material}
                  <span className="h-2 w-2 rounded-full bg-accent" />
                </span>
              ))}
            </div>
          ))}
        </div>
        <p className="sr-only">{MATERIALS.join(", ")}</p>
      </section>

      {/* Track record (Lusion's awards list) */}
      <section className="bg-paper py-24 lg:py-36">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-metal-500">
                Track record
              </p>
              <p className="mt-4 text-[clamp(5rem,14vw,12rem)] leading-[0.8] tracking-[-0.05em] text-ink">
                {TRACK_RECORD.total}
                <span className="text-accent">+</span>
              </p>
              <p className="mt-4 text-sm text-metal-700">Projects completed</p>
            </div>

            <div className="grid gap-12 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
              {TRACK_RECORD.groups.map((group) => (
                <div key={group.title}>
                  <p className="border-b border-ink/10 pb-3 text-xs font-medium uppercase tracking-[0.15em] text-metal-500">
                    {group.title}
                  </p>
                  <ul>
                    {group.rows.map((row) => (
                      <li
                        key={row.label}
                        className="flex items-baseline gap-6 border-b border-ink/10 py-4"
                      >
                        <span className="w-10 text-sm tabular-nums text-accent">{pad(row.count)}</span>
                        <span className="text-xl tracking-tight text-ink">{row.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Area of expertise */}
      <section className="bg-paper pb-24 lg:pb-36">
        <Container>
          <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <RevealLines
              as="h2"
              lines={["Area of", "expertise"]}
              className="text-[clamp(3rem,8vw,7.5rem)] uppercase leading-[0.92] tracking-[-0.03em] text-ink"
            />
            <p className="max-w-xs text-xs font-medium uppercase leading-relaxed tracking-wide text-ink/80 lg:pb-3">
              Six trades under one roof — pick one to see everything it covers.
            </p>
          </div>
          <ExpertiseTiles services={services} />
        </Container>
      </section>

      <ProcessTimeline />
      <ClosingCta />
      <NextPageLink href="/projects" label="Keep scrolling to see" title="Our projects" />
    </>
  );
}
