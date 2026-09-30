"use client";

import { useCallback, useRef, useState } from "react";
import { PlaceholderImage } from "./PlaceholderImage";

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = "Before",
  afterLabel = "After",
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, ratio)));
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/10] w-full touch-none select-none overflow-hidden rounded-2xl"
      onPointerDown={(e) => {
        setDragging(true);
        updateFromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging) updateFromClientX(e.clientX);
      }}
      onPointerUp={() => setDragging(false)}
      onPointerLeave={() => setDragging(false)}
    >
      <div className="absolute inset-0">
        {afterSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={afterSrc} alt={afterLabel} className="h-full w-full object-cover" />
        ) : (
          <PlaceholderImage label={afterLabel} className="h-full w-full" />
        )}
      </div>

      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        {beforeSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={beforeSrc} alt={beforeLabel} className="h-full w-full object-cover" />
        ) : (
          <PlaceholderImage label={beforeLabel} className="h-full w-full" />
        )}
      </div>

      <div
        className="absolute inset-y-0 flex w-0.5 -translate-x-1/2 flex-col items-center bg-paper"
        style={{ left: `${position}%` }}
      >
        <div className="mt-auto mb-auto flex h-10 w-10 items-center justify-center rounded-full bg-paper shadow-lg">
          <span className="text-xs text-ink">⇔</span>
        </div>
      </div>

      <span className="absolute left-3 top-3 rounded-full bg-ink/70 px-3 py-1 text-xs font-medium text-paper">
        {beforeLabel}
      </span>
      <span className="absolute right-3 top-3 rounded-full bg-ink/70 px-3 py-1 text-xs font-medium text-paper">
        {afterLabel}
      </span>
    </div>
  );
}
