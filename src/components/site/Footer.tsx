import { Logo } from "./Logo";
import { siteConfig, whatsappLink } from "@/config/site";

const footerLinks = [
  { label: "Início", href: "#inicio" },
  { label: "A Clínica", href: "#clinica" },
  { label: "Tratamentos", href: "#tratamentos" },
  { label: "Equipe", href: "#equipe" },
  { label: "Contato", href: "#contato" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {siteConfig.address.street} — {siteConfig.address.district}
              <br />
              {siteConfig.city}
            </p>
          </div>

          <nav aria-label="Navegação do rodapé">
            <h3 className="eyebrow font-sans">Navegação</h3>
            <ul className="mt-5 space-y-3">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="eyebrow font-sans">Contato</h3>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li>
                {siteConfig.hours.days}, {siteConfig.hours.time}
              </li>
              {siteConfig.phoneDisplay ? (
                <li>
                  <a href={siteConfig.phoneHref} className="transition-colors hover:text-foreground">
                    {siteConfig.phoneDisplay}
                  </a>
                </li>
              ) : null}
              <li className="flex gap-5 pt-2">
                {siteConfig.instagramUrl ? (
                  <a
                    href={siteConfig.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-foreground"
                  >
                    Instagram
                  </a>
                ) : (
                  <span className="opacity-60">Instagram em breve</span>
                )}
                {whatsappLink ? (
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-foreground"
                  >
                    WhatsApp
                  </a>
                ) : (
                  <span className="opacity-60">WhatsApp em breve</span>
                )}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <p>{siteConfig.city}</p>
        </div>
      </div>
    </footer>
  );
}
