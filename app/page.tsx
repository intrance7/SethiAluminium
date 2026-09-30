import { Hero } from "@/components/home/Hero";
import { Statement } from "@/components/home/Statement";
import { WorkshopReel } from "@/components/home/WorkshopReel";
import { WhatWeBuild } from "@/components/home/WhatWeBuild";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ClosingCta } from "@/components/home/ClosingCta";

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <WorkshopReel />
      <WhatWeBuild />
      <FeaturedWork />
      <ProcessTimeline />
      <BeforeAfter />
      <WhyChooseUs />
      <ClosingCta />
    </>
  );
}
