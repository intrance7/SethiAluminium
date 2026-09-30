# Sethi Aluminium — Website Project

Planning and implementation docs for a 3D-forward marketing website for an
aluminium fabrication / interior & exterior design business (doors, windows,
grills, false ceilings, PVC & ACP work, custom interiors).

Start here, then read the docs in `docs/` in order — each one builds on the last.

## Reading order

1. [`docs/01-brand-and-positioning.md`](docs/01-brand-and-positioning.md) — who this is for, tone, naming, service taxonomy
2. [`docs/02-sitemap-and-information-architecture.md`](docs/02-sitemap-and-information-architecture.md) — pages, routes, SEO URLs
3. [`docs/03-design-system.md`](docs/03-design-system.md) — colors, type, spacing, components
4. [`docs/04-responsive-ux-strategy.md`](docs/04-responsive-ux-strategy.md) — **laptop vs. mobile UX rules** (the core "how do we make this engaging AND usable" doc)
5. [`docs/05-3d-experience-plan.md`](docs/05-3d-experience-plan.md) — where 3D is used, mobile fallback strategy, performance budget
6. [`docs/06-page-specifications.md`](docs/06-page-specifications.md) — section-by-section spec per page
7. [`docs/07-tech-stack-and-architecture.md`](docs/07-tech-stack-and-architecture.md) — stack, folder structure, data model
8. [`docs/08-lead-generation-and-seo.md`](docs/08-lead-generation-and-seo.md) — quote form, WhatsApp, SEO pages, admin
9. [`docs/09-implementation-roadmap.md`](docs/09-implementation-roadmap.md) — phased plan with milestones and definition-of-done

## Non-negotiable design principles

- **Real work over decoration.** 3D earns attention for ~5 seconds; 20 real
  project photos earn trust. Target ~25–30% 3D / 70–75% real photography,
  typography and UI (see doc 05).
- **Mobile is not a shrunk laptop.** Most visitors will find this business via
  a Google search on a phone. Mobile gets its own interaction model, not a
  scaled-down desktop scene (see doc 04).
- **Every page must convert.** Every page — not just Contact — needs a visible
  path to "Get a Quote" or WhatsApp within one scroll on mobile.
- **Performance is part of the design.** A slow 3D hero that makes someone
  bounce on a mid-range Android phone is a worse outcome than no 3D at all.
