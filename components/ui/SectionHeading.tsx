import { clsx } from "clsx";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div
      className={clsx(
        "max-w-4xl",
        align === "center" && "mx-auto text-center"
      )}
    >
      {eyebrow && (
        <p
          className={clsx(
            "mb-3 text-xs font-medium uppercase tracking-[0.2em]",
            light ? "text-paper/60" : "text-metal-500"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={clsx(
          "text-[clamp(2.25rem,5.5vw,4.75rem)] leading-[1] tracking-[-0.03em]",
          light ? "text-paper" : "text-ink"
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={clsx(
            "mt-5 max-w-2xl text-base leading-relaxed lg:text-lg",
            light ? "text-paper/70" : "text-metal-700"
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
