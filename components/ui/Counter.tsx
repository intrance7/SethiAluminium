"use client";

import { useEffect, useRef, useState } from "react";

export function Counter({
  target,
  suffix = "",
  duration = 1200,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            setValue(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(step);
            else setValue(target);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}
