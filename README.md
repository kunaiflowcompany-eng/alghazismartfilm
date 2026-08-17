# Al Ghazi Smart Film — Website

Production website for Al Ghazi Smart Film: switchable smart glass, PDLC smart
film, frosted sticker film and interior surface protection film, UAE.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4.

---

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build && npm run start   # production
```

All ten routes (five pages x two locales) prerender as static HTML, but the app
still runs on Node — see Deployment below.

---

## Where to edit content

You should rarely need to touch a component. Copy, contact details, products and
projects all live in `src/content/`:

| File | Contains |
|---|---|
| `site.ts` | Brand, **contact details**, navigation, owner/leadership block |
| `products.ts` | The five products — copy, benefits, specs, media, colour variants |
| `applications.ts` | The four application sectors |
| `projects.ts` | The three project entries (Home + About use the same data) |
| `clients.ts` | Client & partner logo list |

> **Read `CONTENT-TO-CONFIRM.md` first.** It lists every item that could not be
> verified from the supplied assets — contact details, social URLs, owner
> information and project names.

---

## Structure

```
src/
  app/              home, about, products, applications, contact, 404
  components/
    layout/         Header (+ mobile drawer), Footer
    sections/       reusable page sections
    media/          AutoVideo
    forms/          QuoteForm
    ui/             Button, Container, SectionHeading
  content/          ← all editable copy and data
public/media/       optimised video, photography, logos
```

There is **no `/projects` page by design.** Projects appear as a section on both
Home and About Us, driven by the single `ProjectsSection` component.

---

## Design system

Locked palette, defined once as tokens in `src/app/globals.css`:

| Token | Value | Role |
|---|---|---|
| `warm-white` | `#F7F5F0` | Primary canvas |
| `charcoal` | `#171A1D` | Primary type / dark surfaces |
| `near-black` | `#111315` | Deepest surfaces |
| `orange` | `#F47C00` | **Accent only** — CTAs, key words, active states |
| `white` | `#FFFFFF` | Secondary clean surface |

Type: **Barlow Condensed ExtraBold** for display, **Inter** for body.
Radii stay at 1–3px and there are no drop shadows — separation is done with
hairline rules.

**Orange is an accent, never a body colour.** Section headings take an `accent`
prop for the one word that should carry emphasis:

```tsx
<SectionHeading eyebrow="Our Products" accent="Every Need">
  Advanced solutions for{" "}
</SectionHeading>
```

### Two cascade traps to know about

Both of these caused real bugs during the build:

1. **`Button` sets `inline-flex`.** Do not pass `hidden` via `className` — same
   specificity, so Tailwind's output order decides and the button stays visible.
   Wrap it in an element carrying the responsive display instead.
2. **`AutoVideo` sets `relative`.** Do not pass `absolute` — it collapses the box
   to zero height. Wrap it in a positioned element and pass `h-full w-full`.

---

## Media pipeline

Source assets are large (5504×3072 PNGs, 13–21 Mbps video). Everything in
`public/media/` is pre-optimised:

- **Video** — H.264 at 1600px + a 900px variant for mobile, audio stripped,
  `faststart`, plus a poster frame. Seven videos total ≈ 3.2 MB.
- **Photography** — WebP at 2000/1200/700px.
- **Logos** — background removed with an *edge-only flood fill*, so interior
  white detail is preserved. Logos are never recoloured or distorted.

`AutoVideo` only attaches a source once the element is near the viewport, pauses
off-screen, falls back to the poster on decode failure, and loads no video at all
under `prefers-reduced-motion`.

---

## Accessibility

One `<h1>` per page, no heading-level skips, all images have `alt`, all form
controls are labelled, visible orange focus rings, keyboard-operable privacy
slider, and reduced-motion support throughout.

Scroll reveals are gated behind a `.js` class set before first paint — if
JavaScript fails, content is still visible rather than blank.

See `CONTENT-TO-CONFIRM.md` §6 for the one known brand-colour contrast trade-off.

---

## The quote form

Exactly five fields: **Name, Phone, Email, Select Product, Message.** Do not add
location, area, timeline, company or project-type fields.

Submissions are written to the `enquiries` table in Supabase via the publishable
key. RLS allows INSERT only, so the browser can never read or alter enquiries.
See `src/lib/supabase.ts`.

Product pages deep-link into it: `/contact?product=Smart%20Film` preselects that
product.

---

## Deployment

### Environment variables (required)

The repository deliberately contains **no credentials**. `.env.local` is gitignored;
`.env.example` shows the shape. Set these two on the host before building:

```
NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

Use the **publishable** key only. It is safe in the browser because the
`enquiries` table has RLS enabled with an INSERT-only policy. Never set the
secret / service-role key here — anything prefixed `NEXT_PUBLIC_` ships to the client.

### Build

```bash
npm ci
npm run build
npm start        # serves on PORT (default 3000)
```

This is a Node.js application, not static HTML: it uses `next/image` optimisation
and `redirects()` for the locale prefixes. It needs a Hostinger plan that runs
Node (VPS or Cloud hosting), with the start command `npm start`.

### Supabase

The contact form writes to `public.enquiries`. Schema and RLS policy live in the
Supabase project; see `src/lib/supabase.ts` for the client. Read enquiries from
the Supabase dashboard — the public key cannot read them back.
