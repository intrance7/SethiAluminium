# 07 — Tech Stack & Architecture

## This is a brochure site, not a web app — no database at launch

Nothing on this site needs a logged-in user, live user-generated data, or a
dashboard that must stay in sync in real time. Projects, services, and
testimonials are all content *you* control and update rarely (days/weeks
apart, when a new project finishes) — that's a perfect fit for content stored
as files in the repo, not a database. **Skip the database for v1.**

The one place data "comes in" is the quote/contact form, and that's handled
by a third-party form endpoint (below) that emails/WhatsApps you the
submission directly — no server or storage to run yourself.

Add a real database later only if/when you want your dad (or someone
non-technical) to add new projects through an admin page without you pushing
code — see "If you outgrow this" at the bottom.

## Stack (no backend to host or maintain)

```
Next.js (App Router)
├── React + TypeScript
├── Three.js
│   ├── @react-three/fiber
│   └── @react-three/drei
├── GSAP + ScrollTrigger        — cinematic scroll sequences (desktop)
├── Framer Motion               — general UI animation, page transitions
├── Tailwind CSS                — styling, design tokens as CSS vars/theme
├── Web3Forms or Formspree      — quote/contact form → email/WhatsApp,
│                                  no server or database needed
└── Vercel                      — hosting, image optimization, analytics,
                                   free tier is enough for this site
```

Rationale: React/Next.js was already the user's comfort zone; R3F gives
declarative 3D that composes with normal React state (needed for the
category-swap interactions). Everything else is deliberately boring —
static files + a hosted form endpoint — because a showcase site has no
reason to run its own backend.

## Folder structure

```
app/
├── page.tsx                    # Home
├── services/
│   ├── page.tsx
│   └── [category]/page.tsx
├── projects/
│   ├── page.tsx
│   └── [slug]/page.tsx
├── about/page.tsx
├── contact/page.tsx
├── quote/page.tsx
└── (seo)/
    ├── aluminium-doors/page.tsx
    ├── aluminium-windows/page.tsx
    ├── false-ceiling/page.tsx
    └── ...                     # thin pages reusing service content blocks
    # no /admin folder at launch — there's no database to administer yet

components/
├── hero/
│   ├── Hero.tsx
│   └── HeroScene.tsx           # R3F canvas, device-capability gated
├── services/
│   ├── ServiceExplorer.tsx
│   └── MaterialLab.tsx
├── projects/
│   ├── ProjectCard.tsx
│   ├── ProjectGallery.tsx
│   └── BeforeAfterSlider.tsx
├── process/
│   └── ProcessTimeline.tsx
├── 3d/
│   ├── AluminiumWindow.tsx
│   ├── Door.tsx
│   ├── Grill.tsx
│   └── Ceiling.tsx
├── forms/
│   └── QuoteForm.tsx
└── ui/                          # Button, SectionHeading, StickyMobileCTA, etc.

lib/
├── capability.ts                # WebGL/device-memory/connection detection (doc 05)
└── whatsapp.ts                  # click-to-chat URL builder

data/
├── projects.json                # all project content — edit this file,
│                                  no CMS/DB needed (see below)
├── services.json
└── testimonials.json

public/
├── models/                      # .glb assets, desktop + mobile variants
└── images/
```

## Content model (plain JSON files, no database)

Projects, services, and testimonials live in version-controlled JSON files
under `data/`. Adding a new project means editing `data/projects.json` and
pushing — Vercel redeploys in ~1 minute. Next.js reads these at build time
(`generateStaticParams`) so every project/service page is still statically
generated and fast, exactly as if it came from a database.

```jsonc
// data/projects.json
[
  {
    "slug": "modern-residence-tohana",
    "title": "Modern Residence",
    "location": "Tohana, Haryana",
    "services": ["aluminium-windows", "glass-railing", "false-ceiling"],
    "coverImage": "/images/projects/tohana-1.jpg",
    "gallery": ["/images/projects/tohana-1.jpg", "/images/projects/tohana-2.jpg"],
    "beforeImage": "/images/projects/tohana-before.jpg",
    "afterImage": "/images/projects/tohana-after.jpg",
    "materials": ["Aluminium", "Glass"],
    "description": "…"
  }
]
```

Quote/contact form submissions do **not** need to be stored anywhere by you —
Web3Forms/Formspree receives the POST and emails (and can WhatsApp, via
Zapier/Make if wanted) it straight to the business owner. If you later want a
running log of enquiries, that's the trigger to add a database (see below),
not before.

## If you outgrow this (later, not at launch)

Add a database (Supabase Postgres is still the easy option) only when one of
these becomes true:
- Your dad wants to add/edit projects himself through a web form, without you
  touching code.
- You want a searchable enquiries dashboard instead of reading emails/WhatsApp.
- The project catalog grows large enough that editing JSON by hand gets
  unwieldy (unlikely below ~100 projects).

Until then, the file-based approach is strictly simpler to build, host (free),
and maintain — there's no server to keep running, patch, or pay for.

## Key implementation notes

- **Device-capability gating lives in one shared hook** (`useDeviceTier()` in
  `lib/capability.ts`) so every 3D component makes the same decision — don't
  duplicate the WebGL/memory/connection checks per component.
- **Code-split all 3D and GSAP code** via `next/dynamic({ ssr: false })` so
  non-hero pages (services, projects, contact) never load Three.js at all.
- **Images:** use `next/image` everywhere for automatic responsive sizing and
  lazy loading; never ship a single large image to both mobile and desktop.
- **Forms:** validate client-side (immediate feedback) and server-side
  (never trust the client); rate-limit the quote endpoint to prevent spam.
- **WhatsApp deep link:** `https://wa.me/<number>?text=<url-encoded summary>`
  built from the quote form state as a one-tap alternative submit path.
- **Analytics:** track quote-form starts vs. completions, WhatsApp clicks, and
  call-button clicks separately — these are the real conversion events for
  this business, more meaningful than pageviews.
