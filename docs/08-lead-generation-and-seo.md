# 08 — Lead Generation, SEO & Admin

## Lead generation

### Sticky mobile bottom bar
`Call | WhatsApp | Get a Quote` — present on every page after the first
scroll, on every breakpoint below `lg`. This alone will likely generate more
enquiries than any other single feature; treat it as must-have for launch,
not a nice-to-have.

### Quote form (`/quote`, see doc 06 for fields)
- Submits directly to **Web3Forms or Formspree** (free tier) — no database,
  no server. The form POSTs to their endpoint; they email the submission to
  the business owner (and can also forward to WhatsApp via a Zapier/Make
  automation if wanted).
- Confirmation state clearly shown (not just a silent redirect) — "We got it,
  we'll call you within 24 hours" with the business's phone number repeated.
- Secondary path: "Prefer WhatsApp? Tap here" building a prefilled message
  from the same form state — this needs no backend at all, just a `wa.me`
  link built client-side.
- Confirm with the business owner which inbox/number should actually receive
  submissions before wiring this up — don't assume they'll check email daily;
  WhatsApp forwarding is usually the safer default for this kind of business.

### Click-to-call / WhatsApp everywhere
- Phone number in the header (desktop) and bottom bar (mobile) is a real
  `tel:` link, not just text.
- WhatsApp icon uses `wa.me` link, not a form that pretends to be WhatsApp.

## SEO

### Landing pages (one per high-intent search term)
```
/aluminium-doors
/aluminium-windows
/aluminium-fabrication
/false-ceiling
/pvc-wall-panels
/grill-fabrication
/acp-cladding
/interior-work
```
Each page: unique H1/title/meta matching the search term, 2–3 relevant real
project photos, short service description, FAQ block (schema-marked), CTA to
`/quote?service=<x>`. These should be statically generated, indexable, and
fast — no 3D, no client-only rendering.

### Structured data
- `LocalBusiness` schema on the homepage (name, address, phone, hours,
  service area, geo coordinates).
- `Service` schema on each service/SEO page.
- `BreadcrumbList` on project and service detail pages.
- `Review`/`AggregateRating` schema if testimonials include ratings.

### Local SEO
- Google Business Profile fully filled out and linked from the footer/contact
  page (matching NAP — name/address/phone — exactly with the website).
- Service-area pages or at least a clear service-area list in the footer and
  on `/about` if the business covers multiple towns.
- `sitemap.xml` and `robots.txt` generated at build time; submit sitemap to
  Google Search Console at launch.

### Technical SEO baseline
- Core Web Vitals: LCP <2.5s, CLS <0.1, INP <200ms — directly enforced by the
  performance budget in doc 05 (3D must not regress these on the homepage).
- Every image has descriptive `alt` text (also doubles as project
  documentation).
- Canonical URLs set; no duplicate content between SEO landing pages and
  `/services/[category]` — SEO pages should be narrower/more specific than
  the category page, not a near-duplicate.

## Admin panel — not needed at launch

There's no database, so there's nothing for an admin panel to manage yet.
New enquiries arrive by email/WhatsApp (above); new projects are added by
editing `data/projects.json` and redeploying (doc 07) — that's a 2-minute
task for whoever maintains the site, not something that needs a UI.

Only build an admin panel (and the database it requires — see doc 07's
"If you outgrow this") if the business owner specifically wants to add
projects or check enquiries himself, without going through a developer.
If/when that happens:

```
/admin
├── Dashboard          — enquiry counts, recent activity
├── Projects           — add/edit/delete, upload photos, mark published
├── Testimonials       — add/edit/delete
└── Enquiries          — list, filter by status, mark contacted/won/lost
```

Auth in that case: simple email/password (Supabase Auth) is sufficient — this
would be a single-business, few-user admin, not a multi-tenant system.
