import { clsx } from "clsx";

/**
 * Letter-by-letter roll on hover. Needs a `group` ancestor (the link or
 * button) — each character slides up to reveal a copy of itself.
 */
export function RollText({ text, className }: { text: string; className?: string }) {
  return (
    <span aria-label={text} className={clsx("inline-flex overflow-hidden", className)}>
      {Array.from(text).map((char, i) => (
        <span
          key={i}
          aria-hidden
          data-char={char}
          className="roll-char"
          style={{ "--i": i } as React.CSSProperties}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  );
}
