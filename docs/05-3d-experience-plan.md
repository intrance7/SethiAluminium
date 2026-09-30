# 05 — 3D Experience Plan

## Guiding rule

**Use 3D where it demonstrates something a photo can't (assembly, material
comparison, spatial transition) — never as ambient decoration.** Target mix:
~25–30% 3D, ~70–75% real photography/video/typography (see doc 01).

## Where 3D is used

| Section | 3D role | Priority |
|---|---|---|
| Hero | Modern house facade / window assembly, camera drift | Must-have |
| What We Build | Category explorer — swap a 3D window/door/grill/ceiling per selection | Must-have |
| Material Lab | Material swatch on a frame (aluminium/glass/wood/ACP) | Nice-to-have, phase 2 |
| Process timeline | Small looping frame-assembly animation | Nice-to-have |
| Everything else (projects, workshop, about, testimonials, footer) | **No 3D** — real photos/video only | N/A |

## Homepage scroll story (desktop, GSAP ScrollTrigger + R3F)

```
Scene 1  Hero            "We build spaces."          3D house facade
   ↓
Scene 2  From aluminium…  camera pushes into a window  3D window assembly
   ↓
Scene 3  …to glass.       glass door/panel appears     3D glass door
   ↓
Scene 4  From structure…  facade / grill detail        3D grill or ACP facade
   ↓
Scene 5  …to finishing.   camera enters an interior     3D→photo cross-fade
                          false ceiling + PVC panels    into real interior photo
   ↓
Scene 6  One team. One space.   real project photos appear (3D fades out)
   ↓
Scene 7  Let's build yours.     Quote CTA
```

Scene 5's 3D→photo cross-fade is the hinge of the whole homepage: it's the
moment the site earns credibility by proving the fabricated 3D world maps to
real, physical work.

**On mobile this entire pinned sequence is replaced** (see doc 04) by normal
scroll reveals: a short looping hero video/3D loop, then the same content as
static sections in the same order, no camera hijacking.

## Mobile 3D fallback decision logic

Run this once on load, before deciding what the hero renders:

```
1. Does the browser support WebGL2?          → no  → static hero image/video
2. Is `navigator.deviceMemory` < 4 (if avail) → yes → static hero image/video
3. Is connection `saveData` or effective type
   2g/3g (Network Information API)?          → yes → static hero image/video
4. prefers-reduced-motion: reduce?            → yes → static hero image, no animation
5. Otherwise → lightweight mobile 3D: fewer
   polygons, baked lighting, no post-processing,
   capped pixel ratio (max 1.5×), simple
   auto-rotate/parallax only — no pinned
   scroll-jacked camera path
```

Always ship a real, art-directed static fallback image/poster — never a blank
canvas or spinner as the "fallback."

## Performance budget

| Metric | Laptop target | Mobile target |
|---|---|---|
| Hero 3D asset (compressed .glb) | <2.5MB | <800KB (separate low-poly asset) |
| Total JS for 3D libs (gzipped) | <350KB | <350KB (code-split, lazy-loaded on scroll-into-view) |
| Time to Interactive | <2.5s | <3s on throttled 4G, mid-tier Android |
| Frame rate during scroll animation | 60fps target, 30fps floor | 30fps floor, degrade gracefully |
| `devicePixelRatio` cap for R3F canvas | 2 | 1.5 |

Practical rules:
- Load 3D libraries and models lazily (`next/dynamic`, `ssr: false`, or
  IntersectionObserver-gated) — never block first paint on Three.js.
- Draco/Meshopt-compress all `.glb` models; bake lighting where possible
  instead of real-time shadows on mobile.
- One `<Canvas>` per page section at most, disposed when scrolled far out of
  view, not one giant persistent WebGL context for the whole page.
- Provide a poster image (`<img>`) shown until the WebGL canvas is ready to
  avoid a flash of empty space.

## Accessibility & non-3D path

- Every 3D-communicated fact (e.g. "this window comes in aluminium, glass,
  ACP finishes") must also exist as real text/markup a screen reader can read
  — never encode information only inside a canvas.
- Provide a "Skip animation" control or ensure `prefers-reduced-motion` fully
  disables scroll-jacking, landing the user directly on readable static
  content.

## 3D asset pipeline

```
Reference photos of dad's actual products
        ↓
3D artist (Blender) or stock architectural asset + re-texture
        ↓
Low-poly, PBR-textured .glb export (2 versions: desktop hi-fi, mobile lo-fi)
        ↓
Draco compression
        ↓
Stored in /public/models or a CDN (not committed as huge binaries to git —
consider Git LFS or an asset host)
```

Start with 4–5 hero assets only (house facade, aluminium sliding window,
aluminium/glass door, ACP facade panel, interior room with false ceiling).
Do not attempt to model the full service catalog in 3D before launch.
