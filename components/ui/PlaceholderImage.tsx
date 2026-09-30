import { clsx } from "clsx";

export function PlaceholderImage({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "relative flex items-center justify-center overflow-hidden bg-metal-100",
        className
      )}
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, var(--color-metal-100) 0px, var(--color-metal-100) 18px, var(--color-metal-300) 18px, var(--color-metal-300) 19px)",
      }}
    >
      <span className="rounded-full bg-ink/80 px-4 py-1.5 text-xs font-medium tracking-wide text-paper">
        {label}
      </span>
    </div>
  );
}
