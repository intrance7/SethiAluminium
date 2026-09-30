import { clsx } from "clsx";
import type { ReactNode } from "react";

/** The row of "+" registration marks Lusion runs along card edges. */
export function PlusRow({
  count = 4,
  label,
  className,
}: {
  count?: number;
  label?: ReactNode;
  className?: string;
}) {
  const marks = Array.from({ length: count }, (_, i) => (
    <span key={i} aria-hidden className="text-lg leading-none text-ink/70">
      +
    </span>
  ));
  const middle = Math.ceil(count / 2);

  return (
    <div className={clsx("flex items-center justify-between", className)}>
      {marks.slice(0, middle)}
      {label && (
        <span className="text-xs font-medium uppercase tracking-[0.12em] text-ink">{label}</span>
      )}
      {marks.slice(middle)}
    </div>
  );
}
