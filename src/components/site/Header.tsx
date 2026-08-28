import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { navLinks, whatsappLink } from "@/config/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const cta = whatsappLink ?? "#contato";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500",
        scrolled
          ? "bg-background/90 backdrop-blur-md shadow-[0_1px_0_0_var(--border)]"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 md:px-10 lg:grid-cols-[auto_1fr_auto]">
        <a href="#inicio" className="min-w-0" aria-label="LN Odontologia Especializada — início">
          <Logo compact />
        </a>

        <nav className="hidden justify-center lg:flex" aria-label="Navegação principal">
          <ul className="flex items-center gap-9">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative text-[0.8125rem] tracking-[0.08em] text-muted-foreground transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:text-foreground hover:after:w-full"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <a
            href={cta}
            target={whatsappLink ? "_blank" : undefined}
            rel={whatsappLink ? "noopener noreferrer" : undefined}
            className="hidden rounded-full border border-gold/60 px-6 py-2.5 text-[0.75rem] uppercase tracking-[0.18em] text-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary md:inline-flex"
          >
            Agendar avaliação
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span
              className={cn(
                "block h-px w-6 bg-foreground transition-transform duration-300",
                open && "translate-y-[3px] rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-px w-6 bg-foreground transition-transform duration-300",
                open && "-translate-y-[3px] -rotate-45",
              )}
            />
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border bg-background transition-[max-height,opacity] duration-500 lg:hidden",
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="px-5 py-6" aria-label="Navegação mobile">
          <ul className="flex flex-col">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-border/70 py-4 font-serif text-2xl text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={cta}
            target={whatsappLink ? "_blank" : undefined}
            rel={whatsappLink ? "noopener noreferrer" : undefined}
            onClick={() => setOpen(false)}
            className="mt-7 flex items-center justify-center rounded-full bg-primary px-8 py-4 text-[0.75rem] uppercase tracking-[0.2em] text-primary-foreground"
          >
            Agendar avaliação
          </a>
        </nav>
      </div>
    </header>
  );
}
