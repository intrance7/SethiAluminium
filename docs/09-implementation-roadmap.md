# 09 — Implementation Roadmap

Phased so the site is useful (generating leads) well before the full 3D
experience is finished. Each phase has a definition-of-done — don't move on
until it's met.

## Phase 1 — Brand & Foundation (Days 1–2)

- [ ] Business name, logo, palette, typefaces confirmed (doc 01, 03)
- [ ] Service taxonomy finalized (doc 01)
- [ ] Sitemap/routes finalized (doc 02)
- [ ] Photo/video collection started (30–50 real assets — doc 06 checklist)
- **Done when:** design tokens (colors/type/spacing) are locked in code and
  at least 15 real project photos are in hand.

## Phase 2 — Static Website, No 3D (Days 3–5)

- [ ] Next.js project scaffolded per doc 07's folder structure
- [ ] Navbar (desktop + mobile full-screen menu + sticky bottom bar), Footer
- [ ] Home page built with static hero image (no 3D yet), all sections from
      doc 06 in place with placeholder or real content
- [ ] Services overview + 6 category pages
- [ ] Projects grid + case study template (can run on 3–5 real projects)
- [ ] About, Contact pages
- [ ] Quote form wired to a real backend (Supabase) — **this can go live
      before 3D is done**
- **Done when:** the site is fully navigable, responsive from 320px–1920px,
  and can already accept and store a real enquiry end-to-end.

## Phase 3 — 3D Experience (Days 6–10)

- [ ] Device-capability hook (`useDeviceTier`) implemented and tested on a
      real mid-range Android phone
- [ ] Hero 3D scene (desktop) + static/video mobile fallback
- [ ] What We Build interactive category explorer
- [ ] GSAP ScrollTrigger cinematic sequence on desktop homepage (Scenes 1–7,
      doc 05)
- [ ] Mobile equivalent sections built as normal scroll reveals (no pinning)
- [ ] Performance budget from doc 05 verified via Lighthouse (mobile + desktop)
- **Done when:** homepage Lighthouse mobile Performance ≥85 with 3D enabled,
  and `prefers-reduced-motion` correctly disables all pinned/scroll-jacked
  animation.

## Phase 4 — Real Content (Days 11–13)

- [ ] All collected real photos/videos placed into projects, workshop gallery,
      before/after slider
- [ ] 5+ full project case studies published
- [ ] 3+ testimonials added
- [ ] Workshop section populated with real process photos/video
- **Done when:** every placeholder image on the site has been replaced by a
  real photo of the business's actual work.

## Phase 5 — Lead Generation Polish (Days 14–15)

- [ ] Sticky mobile CTA bar finalized and tested on real devices
- [ ] WhatsApp deep-link integration tested end-to-end
- [ ] Quote form confirmation states, validation, and spam protection done
- [ ] Notification path for new enquiries confirmed with the business owner
      (WhatsApp/email — whichever they'll actually check)
- **Done when:** a test enquiry submitted from a phone results in the
  business owner being notified within minutes.

## Phase 6 — SEO & Deployment (Days 16–18)

- [ ] Metadata, sitemap.xml, robots.txt, structured data (doc 08) in place
- [ ] 8 SEO landing pages published
- [ ] Google Business Profile linked and NAP-consistent
- [ ] Core Web Vitals verified in production (not just local Lighthouse)
- [ ] Deployed to Vercel with a custom domain
- **Done when:** the site is indexed in Google Search Console with no crawl
  errors, and Core Web Vitals pass in the field (CrUX/PageSpeed Insights), not
  just in the lab.

## Phase 7 — Admin Panel (post-launch, ongoing)

- [ ] Enquiries dashboard (highest priority)
- [ ] Projects CRUD (second priority)
- [ ] Testimonials, service content editing (can wait)

## Explicitly out of scope for v1 (revisit later)

- Material Lab full 3D interaction (ship simplified static version first,
  see doc 06)
- Multi-language support
- E-commerce / online payment
- Full CMS for every piece of copy (start with a mix of hardcoded copy +
  data-driven projects/enquiries/testimonials)
