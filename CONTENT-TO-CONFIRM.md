# Content to confirm before going live

Everything on the site is drawn from the supplied assets. Nothing was invented.
The items below are the ones that could **not** be fully verified from those
assets — please confirm each, then edit the file named beside it.

---

## 1. Contact details — `src/content/site.ts`

| Field | Currently published | Source | Status |
|---|---|---|---|
| Address | Office No. 13B, Ras Al Khor Industrial Area 2, Dubai, UAE | Official AG brand poster | ✅ Verified |
| Phone | +971 54 247 5540 | Official AG brand poster + banner | ✅ Verified |
| WhatsApp | +971 54 247 5540 | **Assumed** same line as phone | ⚠️ Confirm |
| Email | info@alghazismartfilm.com | **Assumed** from the brand domain | ⚠️ Confirm |
| Opening hours | Mon–Sat 9:00–18:00, Sun closed | **Not supplied** — placeholder | ⚠️ Confirm |

**Note on the conflicting source.** The Al Ghazi *Group* company profile PDF
(`alghazi-group--2026.pdf`, p.14) lists a different office and number:
*Office no. 11-2, 8A Street, Ras Al Khor Industrial Area 2* / *+971 54 500 7471*
/ *alghazigroup.ae*. The site uses the **Smart Film** brand poster details
instead, since those match the brand domain and the homepage reference. Confirm
which entity's details should be published.

The email seen in supplied assets is `alghazismartfilm@gmail.com` (Instagram
signup screenshot). `info@alghazismartfilm.com` is currently published as the
more professional business address — switch it if that mailbox does not exist.
**The quote form sends to this address**, so it must be a working mailbox.

---

## 2. Social profile links — `src/content/site.ts` → `contact.social`

The brand poster shows Facebook, Instagram and LinkedIn icons but **no URLs**.
The Instagram handle appears as **@alghazismartfilm**.

Icons are hidden while `href` is empty. Paste the full URLs to make them appear:

```ts
social: [
  { label: "Instagram", href: "https://instagram.com/alghazismartfilm" },
  { label: "Facebook",  href: "" },
  { label: "LinkedIn",  href: "" },
],
```

---

## 3. Owner / leadership block — `src/content/site.ts` → `owner`

No owner name, title, portrait or quote existed in any supplied asset. The About
page renders a **clearly-marked placeholder panel** so the layout is complete and
obviously awaiting content — it is not broken, and it will not be mistaken for
real information.

To finish it: drop a portrait at `public/media/brand/owner.jpg`, then set

```ts
owner = {
  name: "…",
  role: "…",
  photo: "/media/brand/owner.jpg",
  quote: "…",
  bio: "…",
}
```

---

## 4. Project names and locations — `src/content/projects.ts`

Three real installation photographs were supplied with **no** client names,
project names or locations. Titles are neutral descriptions of what is visible:

- Branded Office Partition — *Frosted Sticker Film*
- Executive Suite Glazing — *Frosted Sticker Film*
- Meeting Room Privacy Wall — *Privacy Film Installation*

`location` is empty on all three, which hides that line. Fill in real details
when confirmed. **Do not** publish client names without permission — one photo
shows an identifiable third-party brand mark on the glass.

---

## 5. Dubai Airport Freezone logo — `src/content/clients.ts`

The supplied DAFZA logo file is **cropped mid-word** and the wordmark reads
"Freezne" (a typo in the source file). It is therefore excluded from the client
wall rather than published damaged.

To include it: drop a corrected file at `public/media/clients/dafza.png` and
uncomment the last entry in `clients.ts`.

All 18 other logos are published in their true colours, background removed by an
edge-only flood fill so interior white detail (EMAAR, The Dubai Mall, HMS Mirdif)
is preserved. No logo was recoloured, redrawn or stretched.

---

## 6. Accessibility note — orange contrast

`#F47C00` is a locked brand colour and has been kept exactly as specified. Two
combinations fall below the WCAG AA threshold:

| Combination | Ratio | AA needs |
|---|---|---|
| White text on orange buttons | 2.7 : 1 | 4.5 : 1 |
| Orange small text on warm white | 2.5 : 1 | 4.5 : 1 |

This is a property of the brand palette, not a coding error, and the reference
design uses white-on-orange throughout — so it was **left as designed**.

If AA compliance is required, the one-line fix is to switch button text to
near-black in `src/components/ui/Button.tsx`:

```ts
primary: "bg-orange text-near-black hover:bg-orange-hover",   // 6.6 : 1
```

Body text, headings and all muted greys already pass AA.

---

## 7. Product content

All product copy and every specification figure comes verbatim from the supplied
company profile PDF. **Frosted Sticker Film** and **Surface Protection Film
(Interior PPF)** have descriptive copy but **no specification table**, because no
verified figures were supplied for them. Do not add numbers unless confirmed.
