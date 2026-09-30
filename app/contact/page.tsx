import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { siteConfig, buildWhatsAppLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch for aluminium, glass and interior work.",
};

export default function ContactPage() {
  const whatsappHref = buildWhatsAppLink("Hi, I'd like to know more about your work.");

  return (
    <div className="pt-28 pb-20 lg:pt-36 lg:pb-32">
      <Container>
        <SectionHeading eyebrow="Contact" title="Let's talk about your space." />

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-metal-500">
                Phone
              </p>
              <a href={siteConfig.phoneHref} className="mt-1 block text-lg text-ink">
                {siteConfig.phone}
              </a>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-metal-500">
                Email
              </p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-1 block text-lg text-ink"
              >
                {siteConfig.email}
              </a>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-metal-500">
                Address
              </p>
              <p className="mt-1 text-lg text-ink">{siteConfig.address}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-metal-500">
                Hours
              </p>
              <p className="mt-1 text-lg text-ink">{siteConfig.hours}</p>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <Button href="/quote">Get a Quote</Button>
              <Button href={whatsappHref} variant="secondary">
                Chat on WhatsApp
              </Button>
            </div>
          </div>

          <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-metal-100">
            {/* Replace with a real Google Maps embed for the workshop/office location */}
            <iframe
              title="Location map"
              className="h-full w-full border-0"
              loading="lazy"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                siteConfig.address
              )}&output=embed`}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
