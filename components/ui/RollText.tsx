/**
 * Letter-by-letter roll on hover. Needs a `group` ancestor (the link or
 * button) — each character slides up to reveal a copy of itself. Each word
 * is its own clipped box, so long text still wraps between words.
 */
export function RollText({ text, className }: { text: string; className?: string }) {
  let index = 0;

  return (
    <span aria-label={text} className={className}>
      {text.split(" ").map((word, w) => (
        <span key={w} aria-hidden>
          {w > 0 && " "}
          <span className="inline-flex overflow-hidden align-bottom leading-[1.2]">
            {Array.from(word).map((char, i) => (
              <span
                key={i}
                data-char={char}
                className="roll-char"
                style={{ "--i": index++ } as React.CSSProperties}
              >
                {char}
              </span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
}
