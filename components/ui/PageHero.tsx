import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { RevealLines } from "@/components/motion/RevealLines";

/**
 * Standard inner-page opener: small uppercase eyebrow, a huge display title
 * revealed line by line, and an optional caption pinned to the right — the
 * same layout as the homepage "Featured Work" header.
 */
export function PageHero({
  eyebrow,
  title,
  caption,
  children,
}: {
  eyebrow: string;
  /** One entry per line of the display title. */
  title: string[];
  caption?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="bg-paper pb-12 pt-32 lg:pb-20 lg:pt-44">
      <Container>
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-metal-500">
          {eyebrow}
        </p>
        <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <RevealLines
            as="h1"
            lines={title}
            className="text-[clamp(3rem,8.5vw,8rem)] leading-[0.95] tracking-[-0.03em] text-ink"
          />
          {caption && (
            <div className="max-w-xs text-xs font-medium uppercase leading-relaxed tracking-wide text-ink/80 lg:pb-4">
              {caption}
            </div>
          )}
        </div>
        {children}
      </Container>
    </section>
  );
}
