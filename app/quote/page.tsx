import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { QuoteForm } from "@/components/forms/QuoteForm";

export const metadata: Metadata = {
  title: "Get a Quote",
  description: "Tell us what you're building and we'll get back to you.",
};

export default function QuotePage() {
  return (
    <div className="pt-28 pb-20 lg:pt-36 lg:pb-32">
      <Container className="max-w-2xl">
        <SectionHeading
          eyebrow="Get a quote"
          title="Tell us what you're building."
        />
        <div className="mt-10">
          <Suspense fallback={null}>
            <QuoteForm />
          </Suspense>
        </div>
      </Container>
    </div>
  );
}
