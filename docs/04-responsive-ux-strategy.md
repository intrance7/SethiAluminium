# 04 — Responsive UX Strategy (Laptop vs. Mobile)

This is the answer to "how do we make this engaging AND professional on both
laptop and mobile." The short version: **don't build one experience and scale
it — design two interaction models that share one visual system.**

## Why this needs its own model, not just breakpoints

For a local fabrication business, mobile traffic will likely be 60–80% of
visits (Google search → phone), but the decision-maker who actually signs off
on a large project often reviews the site on a laptop or with a builder. Both
audiences need to come away impressed, but they browse completely differently:

| | Laptop | Mobile |
|---|---|---|
| Input | Mouse hover, scroll wheel | Touch, swipe, thumb reach |
| Session | Deliberate browsing, more time | Quick, often mid-task, one-handed |
| 3D tolerance | High (GPU, big viewport) | Variable — many mid-range Android devices |
| Attention span for cinematic scroll | Higher | Lower — wants proof fast |
| Primary goal | Evaluate credibility/portfolio depth | Get the phone number / send a WhatsApp |

## Breakpoints

```
xs   <480px    small phones
sm   480–767   large phones
md   768–1023  tablets / small laptops (touch AND pointer both possible)
lg   1024–1439 laptops
xl   1440px+   large desktop monitors
```

Design at three canvas widths minimum: 375px (phone), 768px (tablet), 1440px
(laptop). Treat `md` as a hybrid zone — assume touch capability even at
tablet width; never rely on `:hover` alone to reveal content between 768–1024px.

## Laptop experience — "cinematic and detailed"

- Full scroll-driven storytelling on the homepage (Scene 1→7, see doc 05) with
  GSAP ScrollTrigger camera moves and 3D scene transitions.
- Hover-revealed detail: service cards expand on hover, project cards show a
  secondary image/video on hover.
- Two/three-column layouts for services, projects, and the process timeline.
- Cursor-aware micro-interactions (magnetic buttons, cursor-follow highlight
  on the Material Lab) — nice-to-have, not core.
- Keyboard navigation and visible focus states throughout (some laptop users
  tab through forms).

## Mobile experience — "fast, honest, thumb-first"

Mobile is **not** a vertically-stacked version of the laptop scroll story. Key
differences:

1. **No scroll-jacking / pinned camera sequences on phones.** Hijacking scroll
   on mobile (locking the page while a 3D camera animates) causes jank and
   feels broken on lower-end GPUs, and fights the user's expectation of a
   direct, fast scroll. Homepage sections play as normal scroll-triggered
   *reveals* (fade/slide in once, no scroll-scrubbing), not pinned scenes.
2. **3D hero degrades to a lightweight loop or high-quality static/video
   render on mobile** (see doc 05 for the exact device-capability logic).
   The "wow" comes from a beautifully art-directed hero photo/video with
   subtle parallax, not a live-rendered scene competing for a phone's GPU
   and battery.
3. **Single-column everything**, generous vertical spacing, no hover-only
   content — anything revealed on hover on laptop must have a tap/expand
   equivalent on mobile (e.g. service cards tap to expand instead of hover).
4. **Sticky bottom action bar** (`Call | WhatsApp | Get a Quote`) present on
   every page from first scroll, thumb-reachable, never covered by other
   fixed elements. This is the single most important mobile conversion
   pattern for this business.
5. **Swipeable, not scrollable-with-scrollbars**, for galleries and before/after
   — use native touch/swipe gestures (`overflow-x: scroll` + `scroll-snap`,
   or a lightweight carousel), never require a horizontal scrollbar drag.
6. **Forms optimized for thumbs:** large radio "pills" instead of tiny radio
   buttons, `tel:` and numeric keyboards triggered via correct `inputmode`,
   photo upload using native camera/file picker, autofill-friendly field
   names, one question visible at a time on very small screens if the quote
   form gets long (progressive disclosure rather than one long form).
7. **Tap targets ≥44px**, no adjacent tappable elements closer than 8px.
8. **Images are the hero content**, not 3D — mobile users scroll faster and
   scan for photos of real work; put a strong real photo within the first
   viewport alongside/after the hero, don't make them scroll through multiple
   3D sections to reach proof.
9. **Performance budget is stricter** (see doc 05): target <3s interactive on
   a throttled 4G mid-range Android in Lighthouse mobile, even if the laptop
   experience is heavier.

## Shared rules (both platforms)

- Same visual language, type scale (fluid, not two separate type systems),
  color system, and component shapes — a user switching from phone to laptop
  should recognize it as the same site immediately.
- Same information hierarchy and section order on the homepage — mobile just
  changes *how* each section animates/interacts, not what exists or what
  order it's in.
- CTAs use identical copy across breakpoints ("Get a Quote", "Explore Our
  Work") — don't fragment button labels by device.
- Contact info (phone, WhatsApp, address) sourced from one config value, never
  hardcoded twice for desktop/mobile markup.

## Engagement techniques that work on *both* (no 3D required)

- Scroll-triggered count-up numbers for trust stats (years active, projects
  completed, service areas covered).
- Before/after draggable slider (works great with both mouse-drag and
  touch-drag from the same component).
- Horizontal-scroll workshop gallery (mouse-wheel + drag on laptop, native
  swipe on mobile) — one component, two input adapters.
- Subtle image reveal-on-scroll (clip-path wipe) for project cards — cheap,
  GPU-light, works everywhere, still feels premium.

## Testing checklist before calling a page "done"

- [ ] Tested on an actual mid-range Android phone (not just Chrome DevTools
      device emulation) — emulation does not reflect real GPU throttling.
- [ ] Tested with `prefers-reduced-motion: reduce` enabled.
- [ ] Lighthouse mobile score: Performance ≥85, Accessibility ≥95.
- [ ] All CTAs reachable within one thumb-stretch without a layout shift
      pushing them off-screen.
- [ ] No horizontal overflow/scrollbar at any breakpoint from 320px up.
- [ ] Forms usable with only the on-screen keyboard visible (test that CTA
      buttons aren't hidden behind the keyboard on iOS Safari).
