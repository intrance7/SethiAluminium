import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { RollText } from "@/components/ui/RollText";
import { RevealLines } from "@/components/motion/RevealLines";

export function Statement() {
  return (
    <section className="bg-paper py-24 lg:py-40">
      <Container>
        <RevealLines
          as="h2"
          lines={["Precise frames,", "built to last"]}
          lineClassNames={["pl-[12%] lg:pl-[16%]"]}
          className="text-[clamp(3rem,9vw,8.5rem)] leading-[0.95] tracking-[-0.03em] text-ink"
        />

        <div className="mt-12 grid gap-8 lg:mt-20 lg:grid-cols-12">
          <div className="lg:col-span-5 lg:col-start-7">
            <p className="text-lg leading-relaxed text-metal-700 lg:text-xl">
              We measure every opening on site, cut and assemble every frame in
              our own workshop, and install with our own team. Aluminium, glass,
              ceilings and facades — one crew from first visit to final polish.
            </p>
            <Link
              href="/about"
              className="group mt-8 inline-flex h-11 items-center gap-3 rounded-full bg-ink px-5 text-xs font-medium uppercase tracking-wide text-paper transition-colors hover:bg-metal-900"
            >
              <RollText text="Our approach" />
              <span className="h-1 w-1 rounded-full bg-accent transition-transform duration-300 group-hover:scale-[2]" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
