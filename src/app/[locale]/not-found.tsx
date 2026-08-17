import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { getDictionary } from "@/i18n";
import { defaultLocale, localePath } from "@/i18n/config";

export default function NotFound() {
  // A not-found boundary cannot read route params, so it uses the default locale.
  const locale = defaultLocale;
  const t = getDictionary(locale).notFound;

  return (
    <section className="flex min-h-[80svh] items-center bg-near-black pt-32 pb-20">
      <Container size="wide">
        <div className="flex max-w-[46rem] flex-col gap-7">
          <Eyebrow tone="light">{t.eyebrow}</Eyebrow>
          <h1 className="display-xl text-warm-white">
            {t.titleBefore}
            <span className="text-orange">{t.titleAccent}</span>
          </h1>
          <p className="lead max-w-[46ch] text-warm-white/65">{t.body}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href={localePath("/", locale)}>{t.home}</Button>
            <Button href={localePath("/products", locale)} variant="outline-dark">
              {t.products}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
