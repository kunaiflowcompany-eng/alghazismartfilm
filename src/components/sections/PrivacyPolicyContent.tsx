import { Container } from "@/components/ui/Container";
import { contact, site } from "@/content/site";

/**
 * Privacy policy — the legal text.
 *
 * Deliberately NOT translated and NOT driven by the i18n dictionary: a legal
 * notice should have one authoritative wording. The page heading above it
 * follows the active language like every other page; this body stays English.
 *
 * Everything stated here is true of the live site as built:
 *   - the only form is QuoteForm (five fields + locale) -> Supabase `enquiries`
 *   - there is no analytics, no advertising pixel and no tracking cookie
 * If any of that changes, this file has to change with it.
 */

const LAST_UPDATED = "10 November 2026";
const LEGAL_NAME = "AL GHAZI ALUMINIUM & GLASS AND BUILDING MATERIAL LLC";
const RETENTION = "24 months";

/**
 * The address that actually receives privacy requests — confirmed by the
 * client. It is deliberately NOT `contact.email`, which is the general
 * enquiries address shown elsewhere on the site.
 */
const PRIVACY_EMAIL = "alghazismartfilm@gmail.com";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line pt-8">
      <h2 className="display-sm text-ink">{title}</h2>
      <div className="mt-4 flex flex-col gap-4 text-[0.98rem] leading-relaxed text-ink-muted">
        {children}
      </div>
    </section>
  );
}

function List({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span aria-hidden="true" className="mt-[0.6em] h-px w-3 shrink-0 bg-orange" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function PrivacyPolicyContent() {
  return (
    <div className="section-y bg-warm-white" dir="ltr">
      <Container size="narrow">
        <p className="eyebrow text-ink-soft">Last updated {LAST_UPDATED}</p>

        <div className="mt-10 flex flex-col gap-10">
          <Section title="Who we are">
            <p>
              {LEGAL_NAME}, trading as {site.name}, supplies and installs switchable smart
              glass, PDLC smart film, frosted sticker film and interior surface protection film
              in the United Arab Emirates.
            </p>
            <p>
              Our office is at {contact.address.line1}, {contact.address.line2},{" "}
              {contact.address.city}, {contact.address.country}. In this policy &ldquo;we&rdquo;,
              &ldquo;us&rdquo; and &ldquo;our&rdquo; mean that company.
            </p>
            <p>
              This policy explains what personal information we collect, why we collect it, who
              we share it with and what you can ask us to do with it.
            </p>
          </Section>

          <Section title="What we collect">
            <p>We only collect information you give us yourself. That happens in three ways.</p>
            <p className="font-medium text-ink">1. The quotation form on this website</p>
            <List
              items={[
                "Your name",
                "Your phone number",
                "Your email address",
                "The product you are enquiring about",
                "Your message, if you write one",
                "The language you were viewing the site in",
              ]}
            />
            <p className="font-medium text-ink">2. WhatsApp, phone or email</p>
            <p>
              If you contact us on WhatsApp, by phone or by email, we hold the contact details
              you reach us from and whatever you choose to tell us about your enquiry.
            </p>
            <p className="font-medium text-ink">
              3. Lead forms on Facebook and Instagram
            </p>
            <p>
              We advertise on Facebook and Instagram. If you fill in a form inside one of those
              ads, Meta passes us the answers you submitted — typically your name, phone number
              and your answers about the project. Meta collects that information under its own
              privacy policy before it reaches us.
            </p>
            <p>
              Our web host also keeps standard server logs, which include IP addresses, as part
              of running and securing the site.
            </p>
          </Section>

          <Section title="What we do not do">
            <List
              items={[
                "We do not use analytics, advertising pixels or tracking cookies on this website.",
                "We do not build profiles of visitors or track you across other websites.",
                "We do not sell, rent or trade your personal information to anyone.",
                "We do not send marketing emails or messages to people who have not asked us for a quotation.",
              ]}
            />
          </Section>

          <Section title="Why we use it">
            <p>We use what you give us only to deal with your enquiry. In practice that means:</p>
            <List
              items={[
                "Replying to you with a quotation or answer",
                "Arranging a site visit or measurement",
                "Supplying and installing the product you ordered",
                "Keeping a record of the work for warranty and after-sales support",
                "Meeting our legal and tax obligations in the UAE",
              ]}
            />
            <p>
              We rely on your consent, and on the steps needed to prepare or perform a contract
              with you. You can withdraw your consent at any time — see{" "}
              <span className="text-ink">Your choices</span> below.
            </p>
          </Section>

          <Section title="Who we share it with">
            <p>
              We share your information only with the service providers we need to run the
              business, and only so far as they need it:
            </p>
            <List
              items={[
                <>
                  <span className="text-ink">Supabase</span> — stores enquiries submitted through
                  the website form.
                </>,
                <>
                  <span className="text-ink">Hostinger</span> — hosts this website.
                </>,
                <>
                  <span className="text-ink">Meta (Facebook, Instagram, WhatsApp)</span> — where
                  you contacted us through one of those platforms.
                </>,
              ]}
            />
            <p>
              We may also disclose information where a UAE authority requires it by law. Beyond
              that, nobody else receives your details.
            </p>
            <p>
              Some of these providers hold data on servers outside the UAE. Where that happens,
              we rely on the provider&rsquo;s own contractual data-protection commitments.
            </p>
          </Section>

          <Section title="How long we keep it">
            <p>
              We keep enquiry information for <span className="text-ink">{RETENTION}</span> from
              our last contact with you, after which it is deleted. Where a sale went ahead, we
              keep the records longer if UAE tax or warranty rules require it.
            </p>
            <p>You can ask us to delete your information sooner at any time.</p>
          </Section>

          <Section title="How we protect it">
            <p>
              Information sent through this website travels over an encrypted connection. The
              enquiries database is configured so the website can only add new enquiries — it
              cannot read, change or delete anything — and only authorised staff can open the
              records.
            </p>
            <p>
              No system is perfectly secure, and we cannot guarantee absolute security, but we
              take these measures seriously and review them.
            </p>
          </Section>

          <Section title="Your choices">
            <p>You can ask us to:</p>
            <List
              items={[
                "Tell you what information we hold about you",
                "Correct anything that is wrong",
                "Delete your information",
                "Stop contacting you",
                "Withdraw a consent you gave us earlier",
              ]}
            />
            <p>
              Email{" "}
              <a
                href={`mailto:${PRIVACY_EMAIL}`}
                dir="ltr"
                className="text-ink underline decoration-orange underline-offset-4 transition-colors hover:text-orange"
              >
                {PRIVACY_EMAIL}
              </a>{" "}
              and we will respond within 30 days. There is no charge, and asking costs you
              nothing else — we will still quote for your project.
            </p>
          </Section>

          <Section title="Children">
            <p>
              Our services are sold to adults. We do not knowingly collect information from
              anyone under 18. If you believe a child has sent us their details, email us and we
              will delete them.
            </p>
          </Section>

          <Section title="Changes to this policy">
            <p>
              If we change how we handle personal information, we will update this page and
              change the date at the top. Please check it from time to time.
            </p>
          </Section>

          <Section title="Contact us">
            <p>For anything in this policy, including requests about your information:</p>
            <List
              items={[
                <>
                  Email:{" "}
                  <a
                    href={`mailto:${PRIVACY_EMAIL}`}
                    dir="ltr"
                    className="text-ink underline decoration-orange underline-offset-4 transition-colors hover:text-orange"
                  >
                    {PRIVACY_EMAIL}
                  </a>
                </>,
                <>
                  Phone:{" "}
                  <a
                    href={contact.phone.href}
                    dir="ltr"
                    className="text-ink underline decoration-orange underline-offset-4 transition-colors hover:text-orange"
                  >
                    {contact.phone.display}
                  </a>
                </>,
                <>
                  Post: {LEGAL_NAME}, {contact.address.line1}, {contact.address.line2},{" "}
                  {contact.address.city}, {contact.address.country}
                </>,
              ]}
            />
          </Section>
        </div>
      </Container>
    </div>
  );
}
