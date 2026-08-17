"use client";

import { useId, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ButtonSubmit } from "@/components/ui/Button";
import { getProductOptions } from "@/content/localized";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { getSupabase, type EnquiryInsert } from "@/lib/supabase";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "success" | "error";

const field =
  "w-full rounded-xs border border-line bg-white px-4 py-3.5 text-[0.95rem] text-ink " +
  "placeholder:text-ink-soft/70 transition-colors duration-200 " +
  "focus:border-orange focus:outline-none focus-visible:outline-none " +
  "aria-[invalid=true]:border-orange";

const labelCls = "eyebrow text-ink-soft";

/**
 * Get a Quote.
 *
 * Fields are deliberately limited to Name, Phone, Email, Product and Message.
 * Do not add location, area, timeline, company or project-type fields.
 *
 * Submissions are written to the `enquiries` table in Supabase using the
 * publishable key. That table has RLS enabled with an INSERT-only policy, so the
 * browser can add a row but can never read, edit or delete existing enquiries.
 */
export function QuoteForm({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).form;
  const productOptions = getProductOptions(locale);
  const uid = useId();
  const params = useSearchParams();
  const [status, setStatus] = useState<Status>("idle");

  // Deep link from a product page: /contact?product=Smart%20Film
  const requested = params.get("product") ?? "";
  const preset = productOptions.includes(requested) ? requested : "";

  const [product, setProduct] = useState(preset);
  const [appliedPreset, setAppliedPreset] = useState(preset);

  // Adjust state during render when the query changes — no effect needed
  if (preset !== appliedPreset) {
    setAppliedPreset(preset);
    setProduct(preset);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("submitting");

    const text = (key: string) => String(data.get(key) ?? "").trim();
    const payload: EnquiryInsert = {
      name: text("name"),
      phone: text("phone"),
      email: text("email"),
      product: text("product"),
      message: text("message") || null,
      locale,
    };

    try {
      const supabase = getSupabase();
      if (!supabase) throw new Error("Supabase environment variables are not set");

      const { error } = await supabase.from("enquiries").insert(payload);
      if (error) throw error;

      setStatus("success");
      form.reset();
      setProduct("");
    } catch (err) {
      console.error("Enquiry submission failed:", err);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate={false} className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2.5">
          <label htmlFor={`${uid}-name`} className={labelCls}>
            {t.name} <span className="text-orange">*</span>
          </label>
          <input
            id={`${uid}-name`}
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder={t.namePlaceholder}
            className={field}
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <label htmlFor={`${uid}-phone`} className={labelCls}>
            {t.phone} <span className="text-orange">*</span>
          </label>
          <input
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            placeholder={t.phonePlaceholder}
            className={field}
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <label htmlFor={`${uid}-email`} className={labelCls}>
            {t.email} <span className="text-orange">*</span>
          </label>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={t.emailPlaceholder}
            className={field}
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <label htmlFor={`${uid}-product`} className={labelCls}>
            {t.product} <span className="text-orange">*</span>
          </label>
          <div className="relative">
            <select
              id={`${uid}-product`}
              name="product"
              required
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className={cn(field, "appearance-none pr-11", product === "" && "text-ink-soft/70")}
            >
              <option value="" disabled>{t.choose}</option>
              {productOptions.map((name) => (
                <option key={name} value={name} className="text-ink">
                  {name}
                </option>
              ))}
            </select>
            <svg
              viewBox="0 0 16 16"
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 h-3 w-3 -translate-y-1/2 text-ink-soft"
            >
              <path d="m3 6 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <label htmlFor={`${uid}-message`} className={labelCls}>{t.message}</label>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={5}
          placeholder={t.messagePlaceholder}
          className={cn(field, "resize-y")}
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <ButtonSubmit size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? t.sending : t.send}
        </ButtonSubmit>

        <p
          aria-live="polite"
          className={cn(
            "text-[0.82rem]",
            status === "error" ? "font-medium text-orange" : "text-ink-muted",
          )}
        >
          {status === "success" ? t.success : status === "error" ? t.error : t.idle}
        </p>
      </div>
    </form>
  );
}
