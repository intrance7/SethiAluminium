import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { RollText } from "@/components/ui/RollText";
import { siteConfig, buildWhatsAppLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch for aluminium, glass and interior work.",
};

export default function ContactPage() {
  const whatsappHref = buildWhatsAppLink("Hi, I'd like to know more about your work.");

  const channels = [
    { label: "Call", value: siteConfig.phone, href: siteConfig.phoneHref },
    { label: "WhatsApp", value: "Message us", href: whatsappHref, external: true },
    { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={["Let’s talk", "about your space"]}
        caption="Call, message or drop by the workshop. We usually reply the same day."
      />

      <section className="bg-paper pb-20 lg:pb-32">
        <Container>
          <ul className="border-b border-ink/10">
            {channels.map((channel) => (
              <li key={channel.label} className="border-t border-ink/10">
                <a
                  href={channel.href}
                  {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex flex-col gap-2 py-8 sm:flex-row sm:items-center sm:justify-between lg:py-10"
                >
                  <span className="text-xs font-medium uppercase tracking-[0.15em] text-metal-500 sm:w-40">
                    {channel.label}
                  </span>
                  <span className="flex-1 break-words text-[clamp(1.75rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.03em] text-ink transition-colors duration-300 group-hover:text-accent">
                    <RollText text={channel.value} />
                  </span>
                  <span
                    aria-hidden
                    className="hidden h-14 w-14 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-paper sm:flex"
                  >
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12">
            <div className="space-y-8 lg:col-span-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-metal-500">
                  Workshop
                </p>
                <p className="mt-3 text-2xl tracking-tight text-ink">{siteConfig.address}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-metal-500">
                  Hours
                </p>
                <p className="mt-3 text-2xl tracking-tight text-ink">{siteConfig.hours}</p>
              </div>
              <Link
                href="/quote"
                className="group inline-flex h-12 items-center gap-3 rounded-full bg-ink px-6 text-xs font-medium uppercase tracking-wide text-paper transition-colors hover:bg-accent"
              >
                <RollText text="Get a quote" />
                <span className="h-1 w-1 rounded-full bg-accent transition-colors group-hover:bg-paper" />
              </Link>
            </div>

            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-metal-100 lg:col-span-8 lg:aspect-[16/9]">
              {/* Replace with a real Google Maps embed for the workshop/office location */}
              <iframe
                title="Location map"
                className="h-full w-full border-0 grayscale"
                loading="lazy"
                src={`https://www.google.com/maps?q=${encodeURIComponent(siteConfig.address)}&output=embed`}
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
