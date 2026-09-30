import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  { number: "01", title: "Consult", description: "We understand what you need and where." },
  { number: "02", title: "Measure", description: "Precise on-site measurement of every opening." },
  { number: "03", title: "Design", description: "Material, finish and layout finalised with you." },
  { number: "04", title: "Fabricate", description: "Cut, welded and assembled in our workshop." },
  { number: "05", title: "Install", description: "Fitted on-site by our own installation team." },
  { number: "06", title: "Finish", description: "Final finishing, cleanup and handover." },
];

export function ProcessTimeline() {
  return (
    <section className="bg-metal-900 py-20 text-paper lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Our process"
          title="From measurement to installation."
          light
        />

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <div className="flex items-center gap-3 lg:flex-col lg:items-start lg:gap-4">
                <span className="font-display text-2xl text-accent">
                  {step.number}
                </span>
                <div className="hidden h-px flex-1 bg-paper/15 lg:block" />
              </div>
              <h3 className="mt-3 text-lg font-medium">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-paper/60">
                {step.description}
              </p>
              {index < steps.length - 1 && (
                <div className="mt-6 h-px w-full bg-paper/10 sm:hidden lg:hidden" />
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
