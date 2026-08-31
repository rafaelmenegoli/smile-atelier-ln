import { useState } from "react";
import { cn } from "@/lib/utils";
import { testimonials } from "@/config/site";

export function TestimonialsCarousel() {
  const [active, setActive] = useState(0);
  const total = testimonials.length;

  return (
    <div className="mt-14">
      <div className="relative min-h-[16rem] sm:min-h-[13rem]">
        {testimonials.map((t, i) => (
          <blockquote
            key={i}
            aria-hidden={i !== active}
            className={cn(
              "max-w-3xl border-t border-border pt-8 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
              i === active
                ? "relative opacity-100 translate-y-0"
                : "pointer-events-none absolute inset-0 translate-y-3 opacity-0",
            )}
          >
            <span className="font-serif text-4xl leading-none text-gold">”</span>
            <p className="mt-5 font-serif text-2xl leading-[1.6] text-foreground sm:text-[1.75rem]">
              {t.quote}
            </p>
            <footer className="mt-7">
              <p className="text-[0.75rem] uppercase tracking-[0.18em] text-foreground">
                {t.author}
              </p>
              <p className="mt-1 text-[0.75rem] text-muted-foreground">{t.detail}</p>
            </footer>
          </blockquote>
        ))}
      </div>

      <div className="mt-10 flex items-center gap-8">
        <div className="flex items-center gap-3" role="tablist" aria-label="Depoimentos">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Depoimento ${i + 1}`}
              onClick={() => setActive(i)}
              className={cn(
                "h-px transition-all duration-500",
                i === active ? "w-12 bg-gold" : "w-6 bg-border hover:bg-muted-foreground",
              )}
            />
          ))}
        </div>
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => setActive((a) => (a - 1 + total) % total)}
            aria-label="Depoimento anterior"
            className="text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => setActive((a) => (a + 1) % total)}
            aria-label="Próximo depoimento"
            className="text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            →
          </button>
        </div>
      </div>

      <p className="mt-8 text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground/70">
        Avaliações reais de pacientes no Google
      </p>
    </div>
  );
}
