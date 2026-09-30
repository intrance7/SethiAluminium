import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { RollText } from "@/components/ui/RollText";
import { siteConfig } from "@/lib/site-config";
import { getServices } from "@/lib/data";

export function Footer() {
  const services = getServices();

  return (
    <footer className="overflow-hidden bg-metal-900 pb-24 pt-16 text-paper lg:pb-8 lg:pt-24">
      <Container>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-sm leading-relaxed text-paper/70">
              {siteConfig.address}
              <br />
              {siteConfig.hours}
            </p>
            <p className="mt-4 text-sm text-paper/50">
              Serving {siteConfig.serviceAreas.join(", ")}
            </p>
          </div>

          <div className="lg:col-span-3">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-paper/50">
              What we build
            </p>
            <ul className="mt-4 space-y-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group text-sm text-paper/70 hover:text-paper"
                  >
                    <RollText text={service.title} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-paper/50">
              Talk to us
            </p>
            <ul className="mt-4 space-y-2 text-2xl tracking-tight">
              <li>
                <a href={siteConfig.phoneHref} className="group hover:text-accent">
                  <RollText text={siteConfig.phone} />
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="group break-all hover:text-accent">
                  <RollText text={siteConfig.email} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p
          aria-hidden
          className="mt-20 select-none whitespace-nowrap font-display text-[15.5vw] uppercase leading-[0.8] tracking-[-0.04em] text-paper/10 lg:text-[min(15.5vw,14rem)]"
        >
          Sethi
        </p>

        <div className="mt-8 flex flex-col gap-3 border-t border-paper/10 pt-6 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}
          </p>
          <p>Built to fit your space.</p>
        </div>
      </Container>
    </footer>
  );
}
