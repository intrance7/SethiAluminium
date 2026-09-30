# 06 — Page-by-Page Specifications

Each section below lists: purpose, content needed, desktop behavior, mobile
behavior. Build in this order (also mirrors doc 09's roadmap).

## Home

### Hero
- **Purpose:** immediate differentiation — "this is not a generic contractor
  site."
- **Content:** headline ("Built to fit your space."), subline (Aluminium •
  Glass • Interiors • Exteriors), two CTAs (Explore Our Work / Get a Quote).
- **Desktop:** live 3D house facade/window, camera drift on load, scroll
  begins the pinned story (doc 05, Scene 1).
- **Mobile:** static/video hero with subtle parallax, CTAs stacked full-width,
  sticky bottom bar appears after hero scrolls past.

### What We Build
- **Content:** 6 categories from doc 01's taxonomy.
- **Desktop:** central 3D viewer, category buttons swap the model with a
  crossfade/morph; hovering a category previews it.
- **Mobile:** horizontal swipeable card carousel, each card opens to a short
  description + "See Aluminium Work" link to `/services/aluminium`; 3D only if
  device-capability check (doc 05) passes, otherwise a strong static render.

### Selected Projects
- **Content:** 4–6 real projects, large image, title, 2–3 service tags,
  location, "View Project" link.
- **Desktop:** large alternating-layout cards (image/text), hover reveals a
  secondary photo or short video loop.
- **Mobile:** stacked full-width cards, tap to open case study, no hover
  dependency.

### Material Lab (phase 2)
- Desktop: interactive material swap on a 3D frame + spec panel.
- Mobile: simplified — static comparison swatches with the same spec text,
  no 3D required (this section is explicitly allowed to be 3D-light on
  mobile since the Hero and What We Build already carry the 3D budget).

### From Measurement to Installation
- **Content:** 6 steps (Consult → Measure → Design → Fabricate → Install →
  Finish).
- **Desktop:** horizontal timeline, animated connecting line draws in on
  scroll.
- **Mobile:** vertical timeline, same steps, connecting line still animates
  but scroll-triggered fade-in only (no pinning).

### Before / After
- **Content:** 3–5 real before/after project pairs.
- **Both platforms:** draggable slider component — mouse-drag on desktop,
  touch-drag on mobile, same component/logic, different input adapter.

### Workshop
- **Content:** real photos/video of cutting, welding, assembly, installation.
- **Desktop:** horizontal scroll gallery (mouse wheel maps to horizontal
  scroll).
- **Mobile:** native swipeable gallery with snap points.

### Why Choose Us
- Count-up stats (years active, projects completed, service areas), 2–3
  short testimonials. Same layout both platforms, grid → stack.

### Built Around Your Space (closing CTA)
- Short emotional copy + "Start a Project" CTA. Subtle slow-rotating 3D scene
  as background on desktop only; static textured background image on mobile.

### Footer
- Services list, service-area list, phone/WhatsApp/email, embedded Google Map
  (lazy-loaded iframe), social links, business hours, copyright.

## Services overview (`/services`) + category pages (`/services/[category]`)

- **Overview:** grid of the 6 categories linking to each detail page.
- **Category page:** hero image for that category, sub-service list (from
  doc 01's table), 3–6 relevant project photos, category-specific FAQ (good
  for SEO), CTA to `/quote?service=<category>`.
- No 3D required on these pages — they're SEO/conversion-focused, must load
  fast and be fully crawlable static content.

## Projects (`/projects`, `/projects/[slug]`)

- **Grid:** filterable by service category (chip filters), search not needed
  initially given likely catalog size (<100 projects).
- **Case study page:** location, services used (tags), before/after (if
  available), photo gallery (lightbox), materials used, short narrative,
  related projects at the bottom, quote CTA.

## About

- Founder/workshop story, real photos of the team/workshop, years in
  business, service area map, certifications/associations if any.

## Contact

- Phone, WhatsApp (click-to-chat link with prefilled message), email,
  address + embedded map, business hours, quick contact form (name, phone,
  message — lighter than the full quote form).

## Quote (`/quote`)

- **Fields:** service needed (radio: Aluminium/Glass/False Ceiling/PVC/
  Grill-Gate/Interior/Exterior/Other), project type (Home/Shop/Office/
  Commercial/Other), location, phone, optional photo upload, optional notes.
- Pre-fill service field from `?service=` query param when arriving from a
  category or SEO page.
- On mobile: large pill-style radio buttons, one section visible at a time
  if the form feels long, numeric keyboard for phone field, native file
  picker for photo upload (camera or gallery).
- On submit: store to backend (doc 07/08) + optionally deep-link to WhatsApp
  with a prefilled summary message as a secondary "or send via WhatsApp
  instead" option — don't force a form as the only path, some users will
  always prefer WhatsApp.

## Asset checklist to collect before final content pass

- [ ] 30–50 real photos: finished doors/windows/grills/ceilings/PVC/ACP work,
      in-progress fabrication, workshop, installation, team
- [ ] 3–5 before/after photo pairs (same angle, before and after)
- [ ] Short workshop video clips (cutting, welding, installation) if available
- [ ] 3–5 written or video testimonials with customer permission
- [ ] Logo files, business registration/certification details if any
- [ ] Exact service area list (towns/cities covered)
