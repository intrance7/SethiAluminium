# 03 — Design System

## Visual direction

Architectural, industrial-material, minimal — **not** startup-generic
(no floating glowing spheres, no purple gradients, no neon blobs).

```
Modern architecture + industrial materials + warm interiors + minimal type
```

Reference feel: aluminium brushed metal, poured concrete, glass, warm wood
tones for interior sections, hard architectural shadows, restrained motion.

## Color palette (proposed — confirm with owner)

| Token | Value | Use |
|---|---|---|
| `--color-ink` | `#12141A` | Primary text, dark backgrounds |
| `--color-paper` | `#F7F6F3` | Light background (warm off-white, not pure white) |
| `--color-metal-100` | `#E4E5E7` | Light aluminium surfaces, card backgrounds |
| `--color-metal-500` | `#8A8F98` | Brushed aluminium mid-tone, secondary text |
| `--color-metal-900` | `#2B2E34` | Dark steel sections, footer |
| `--color-accent` | `#C97A3D` (warm copper/bronze) | CTAs, highlights, hover states — reads as "warm metal," not corporate blue |
| `--color-glass` | `rgba(255,255,255,0.08)` | Glassmorphism overlays used sparingly on dark 3D sections only |

Avoid pure black (#000) and pure white (#FFF) everywhere — use ink/paper for
softer, more premium contrast. One accent color only; resist adding a second
"brand blue" — the photography and materials provide color variety.

## Typography

- **Display / headings:** a geometric-architectural sans with tight tracking
  (e.g. Neue Montreal, General Sans, or Inter Display as a free fallback).
- **Body:** a highly legible workhorse sans (Inter, or Söhne-alike).
- **Scale (fluid, `clamp()`-based, not fixed breakpoints):**
  - H1: `clamp(2.25rem, 6vw, 5rem)`
  - H2: `clamp(1.75rem, 4vw, 3rem)`
  - Body: `clamp(1rem, 1.1vw, 1.125rem)`
- Line length capped at ~68ch for body copy even on ultra-wide laptop screens.

## Spacing & grid

- 8px base unit. Section vertical rhythm: 96–140px on desktop, 56–72px on
  mobile — generous whitespace is part of feeling "premium," don't compress it
  just to fit more above the fold.
- 12-column grid on desktop (≥1024px), 4-column on mobile (<768px), with a
  fluid 6–8 column zone for tablet.
- Content max-width: 1280–1440px container, full-bleed for imagery/3D canvas
  sections.

## Core components (build once, reuse everywhere)

- `Button` — primary (accent fill), secondary (outline), ghost (text + arrow)
- `ServiceCard` — icon/thumbnail, title, 2–3 line description, "Explore" link
- `ProjectCard` — image, title, service tags, location
- `BeforeAfterSlider` — draggable, touch-swipeable
- `ProcessStep` — numbered, connecting line, icon
- `QuoteFormField` — consistent input/radio/checkbox styling, large touch targets
- `StickyMobileCTA` — bottom bar (Call / WhatsApp / Quote)
- `SectionHeading` — eyebrow label + heading + optional intro line, used
  consistently so every section feels part of one system

## Motion principles

- Default easing: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo-ish) for
  entrances; nothing bouncy or playful — this is an architecture brand.
- Respect `prefers-reduced-motion`: disable scroll-jacking, camera moves, and
  parallax; fall back to simple fades.
- Motion should reveal information (a frame assembling, a camera moving
  through a doorway), not decorate empty space.

## Accessibility baseline (WCAG 2.1 AA)

- Text contrast ≥ 4.5:1 for body, ≥ 3:1 for large headings, checked against
  both the paper and dark-metal backgrounds.
- All interactive elements reachable by keyboard; 3D scenes must have a
  non-3D equivalent path to the same content (see doc 05).
- Touch targets ≥ 44×44px (mobile), form fields have visible labels (not
  placeholder-only).
- `alt` text on every project photo describing the actual work shown (also
  helps SEO).
