# 02 — Sitemap & Information Architecture

## Site map

```
Home (/)
├── What We Build (in-page section, deep-linkable)
├── Services
│   ├── /services                      (overview — 6 categories)
│   ├── /services/aluminium
│   ├── /services/glass
│   ├── /services/exterior
│   ├── /services/interior
│   ├── /services/fabrication
│   └── /services/design-installation
├── Projects
│   ├── /projects                      (filterable grid)
│   └── /projects/[slug]               (case study)
├── /about                             (workshop, story, team)
├── /contact
├── /quote                             (lead form — also embedded as a
│                                        section/modal on other pages)
└── SEO landing pages (thin wrappers around service content, one per
    high-intent search term — see doc 08):
    /aluminium-doors
    /aluminium-windows
    /aluminium-fabrication
    /false-ceiling
    /pvc-wall-panels
    /grill-fabrication
    /acp-cladding
    /interior-work
```

## Navigation rules

**Desktop nav (sticky, transparent-over-hero → solid on scroll):**
`Logo | Work  Services ▾  About  Contact | [Get a Quote button] [Phone icon]`

**Mobile nav:**
`Logo | ☰` → full-screen menu on open, NOT a small dropdown. Large tap targets
(min 48px height), the quote CTA and phone/WhatsApp icons pinned at the
**bottom** of the menu sheet (reachable by thumb), not buried at the top.

**Persistent mobile bottom bar** (does not scroll away): `Call | WhatsApp |
Get a Quote` — three equal-width tap targets, always visible. This is the
single highest-leverage conversion element on the whole site for this kind of
local business — see doc 04 for full spec.

## Homepage section order

```
1. Hero (3D)
2. What We Build (interactive category explorer)
3. Selected Projects (real photos)
4. Material Lab (3D material swatches) — optional, phase 2
5. From Measurement to Installation (process timeline)
6. Before / After slider
7. Workshop (real photo/video gallery)
8. Why Choose Us / trust signals (years in business, projects completed,
   service areas, testimonials)
9. Built Around Your Space (emotional close + CTA)
10. Footer (services, service areas, contact, socials, map)
```

Note: real project photography appears **twice** before any secondary 3D
section — trust signals need to land early, especially for mobile visitors
who may not scroll past section 3.

## URL & routing notes

- Use Next.js App Router with static generation for all service/SEO pages —
  these must be fast and crawlable, not client-rendered behind 3D.
- Project case studies (`/projects/[slug]`) are data-driven (CMS/DB-backed —
  see doc 07) so the business can add new work without a code deploy.
- Every SEO landing page links back to the relevant `/services/*` category
  and to `/quote` with a pre-filled service type (query param, e.g.
  `/quote?service=false-ceiling`).
