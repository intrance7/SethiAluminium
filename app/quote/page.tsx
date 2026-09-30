import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Get a Quote",
  description: "Tell us what you're building and we'll get back to you.",
};

const nextSteps = [
  { title: "We call you back", body: "Usually the same working day, to understand the job." },
  { title: "Free site visit", body: "We measure every opening and talk through materials and finishes." },
  { title: "Clear written quote", body: "Itemised, with timelines — no surprises once work starts." },
];

export default function QuotePage() {
  return (
    <>
      <PageHero eyebrow="Get a quote" title={["Tell us what", "you’re building"]} />

      <section className="bg-paper pb-24 lg:pb-36">
        <Container>
          <div className="grid gap-12 border-t border-ink/10 pt-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Suspense fallback={null}>
                <QuoteForm />
              </Suspense>
            </div>

            <aside className="lg:col-span-4 lg:col-start-9">
              <div className="rounded-2xl bg-metal-100 p-8 lg:sticky lg:top-32">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-metal-500">
                  What happens next
                </p>
                <ol className="mt-6 space-y-6">
                  {nextSteps.map((step, index) => (
                    <li key={step.title} className="flex gap-4">
                      <span className="text-sm text-accent">{String(index + 1).padStart(2, "0")}</span>
                      <div>
                        <p className="text-lg tracking-tight text-ink">{step.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-metal-700">{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="mt-8 border-t border-ink/10 pt-6">
                  <p className="text-sm text-metal-700">Prefer to talk?</p>
                  <a href={siteConfig.phoneHref} className="mt-1 block text-2xl tracking-tight text-ink hover:text-accent">
                    {siteConfig.phone}
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
