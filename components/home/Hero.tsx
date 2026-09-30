"use client";

import { Container } from "@/components/ui/Container";
import { PlusRow } from "@/components/ui/PlusRow";
import { RevealLines } from "@/components/motion/RevealLines";
import { Hero3D } from "@/components/three/Hero3D";

const intro = [
  "We fabricate aluminium, glass",
  "and interior work that makes",
  "homes and shops stand out",
];

export function Hero() {
  return (
    <section className="relative bg-paper pt-24 lg:pt-8">
      <Container>
        <RevealLines
          as="h1"
          lines={intro}
          delay={0.2}
          className="text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.12] tracking-tight text-ink lg:ml-[26%] lg:max-w-[40rem]"
        />

        <div className="relative mt-8 aspect-[4/5] overflow-hidden rounded-2xl bg-ink sm:aspect-[16/10] lg:mt-12 lg:aspect-auto lg:h-[calc(100svh-15rem)] lg:min-h-[480px]">
          {/*
            Static fallback — always present. Hero3D renders on top once the
            device-capability check resolves (docs/05-3d-experience-plan.md);
            on low-tier devices or prefers-reduced-motion it renders nothing
            and this gradient stays.
          */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,_#2b2e34,_#12141a_70%)]" />
          <Hero3D />
        </div>

        <PlusRow count={4} label="Scroll to explore" className="mt-4" />
      </Container>
    </section>
  );
}
