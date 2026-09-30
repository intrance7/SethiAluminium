import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Counter } from "@/components/ui/Counter";

const stats = [
  { value: 12, suffix: "+", label: "Years in business" },
  { value: 250, suffix: "+", label: "Projects completed" },
  { value: 4, suffix: "", label: "Service areas covered" },
];

const testimonials = [
  {
    quote:
      "The windows and railing came out exactly as discussed — clean finish, on time.",
    name: "Placeholder Customer",
    location: "Tohana",
  },
  {
    quote:
      "Very professional team from measurement to installation. Highly recommend for false ceiling work.",
    name: "Placeholder Customer",
    location: "Fatehabad",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-paper py-20 lg:py-32">
      <Container>
        <SectionHeading eyebrow="Why choose us" title="Built on precision, not promises." />

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="border-t border-ink/10 pt-4">
              <p className="font-display text-4xl font-medium text-ink">
                <Counter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-sm text-metal-500">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {testimonials.map((testimonial) => (
            <blockquote
              key={testimonial.name + testimonial.location}
              className="rounded-2xl bg-metal-100 p-6"
            >
              <p className="text-base leading-relaxed text-ink/90">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <footer className="mt-4 text-sm text-metal-500">
                {testimonial.name} · {testimonial.location}
              </footer>
            </blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}
