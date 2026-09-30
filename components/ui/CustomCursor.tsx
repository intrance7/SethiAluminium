"use client";

import { useEffect, useRef } from "react";
import { usePointerFine } from "@/lib/capability";

const TRAIL_POINTS = 14;

/**
 * Small dot plus a metallic ribbon trail that follows the pointer
 * (a restrained take on Lusion's cursor ribbon). Fine pointers only.
 */
export function CustomCursor() {
  const pointerFine = usePointerFine();
  const dotRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!pointerFine) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = dotRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!dot || !canvas || !ctx) return;

    document.documentElement.classList.add("custom-cursor-active");

    // 1x resolution is plenty for a soft trail and keeps each frame cheap.
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    let mouseX = -100;
    let mouseY = -100;
    const points = Array.from({ length: TRAIL_POINTS }, () => ({ x: mouseX, y: mouseY }));
    let hasMoved = false;
    let raf = 0;
    // Bounding box of what was drawn last frame, so only that area is cleared.
    let dirty: { x: number; y: number; w: number; h: number } | null = null;

    const onMove = (e: PointerEvent) => {
      if (!hasMoved) {
        // Start the trail under the pointer rather than sweeping in from off-screen.
        hasMoved = true;
        points.forEach((p) => {
          p.x = e.clientX;
          p.y = e.clientY;
        });
      }
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      // The loop only runs while the trail is catching up — idle costs nothing.
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onOver = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest("a, button, [data-cursor-hover]")) {
        dot.classList.add("scale-[3]");
      }
    };
    const onOut = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest("a, button, [data-cursor-hover]")) {
        dot.classList.remove("scale-[3]");
      }
    };

    const tick = () => {
      // Each point eases toward the one ahead of it.
      points[0].x += (mouseX - points[0].x) * 0.7;
      points[0].y += (mouseY - points[0].y) * 0.7;
      let minX = points[0].x;
      let maxX = points[0].x;
      let minY = points[0].y;
      let maxY = points[0].y;
      for (let i = 1; i < points.length; i++) {
        points[i].x += (points[i - 1].x - points[i].x) * 0.55;
        points[i].y += (points[i - 1].y - points[i].y) * 0.55;
        minX = Math.min(minX, points[i].x);
        maxX = Math.max(maxX, points[i].x);
        minY = Math.min(minY, points[i].y);
        maxY = Math.max(maxY, points[i].y);
      }

      if (dirty) ctx.clearRect(dirty.x, dirty.y, dirty.w, dirty.h);

      // Trail has collapsed onto the pointer: stop until the next move.
      if (maxX - minX < 0.5 && maxY - minY < 0.5) {
        dirty = null;
        raf = 0;
        return;
      }

      ctx.lineCap = "round";
      for (let i = 1; i < points.length; i++) {
        const t = 1 - i / points.length;
        ctx.beginPath();
        ctx.moveTo(points[i - 1].x, points[i - 1].y);
        ctx.lineTo(points[i].x, points[i].y);
        ctx.lineWidth = 1 + t * 4;
        // Aluminium grey at the head fading into copper toward the tail.
        const r = Math.round(201 + (180 - 201) * t);
        const g = Math.round(122 + (186 - 122) * t);
        const b = Math.round(61 + (196 - 61) * t);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${t * 0.55})`;
        ctx.stroke();
      }
      const pad = 6;
      dirty = { x: minX - pad, y: minY - pad, w: maxX - minX + pad * 2, h: maxY - minY + pad * 2 };

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver);
    window.addEventListener("pointerout", onOut);
    window.addEventListener("resize", resize);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onOut);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [pointerFine]);

  if (!pointerFine) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[99] h-full w-full"
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-paper mix-blend-difference transition-[scale] duration-300 ease-out"
      />
    </>
  );
}
