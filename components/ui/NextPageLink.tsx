import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { RollText } from "@/components/ui/RollText";

/** Full-width "next" link that closes out a detail page (Lusion's NEXT PAGE). */
export function NextPageLink({ href, label, title }: { href: string; label: string; title: string }) {
  return (
    <section className="border-t border-ink/10 bg-paper">
      <Container>
        <Link href={href} className="group flex items-end justify-between gap-6 py-16 lg:py-24">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-metal-500">{label}</p>
            <p className="mt-3 text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.95] tracking-[-0.03em] text-ink">
              <RollText text={title} />
            </p>
          </div>
          <span
            aria-hidden
            className="mb-2 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-ink text-xl text-paper transition-all duration-500 group-hover:scale-110 group-hover:bg-accent lg:h-20 lg:w-20 lg:text-2xl"
          >
            →
          </span>
        </Link>
      </Container>
    </section>
  );
}
