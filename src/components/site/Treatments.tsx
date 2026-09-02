import {
  AlignCenterHorizontal,
  CircleDot,
  Sparkles,
  Layers,
  Smile,
  ShieldCheck,
} from "lucide-react";
import { Reveal } from "./Reveal";

const treatments = [
  {
    number: "01",
    title: "Ortodontia",
    description:
      "Alinhadores transparentes e aparelhos convencionais para corrigir a posição dos dentes e melhorar a função da mordida com discreção.",
    icon: AlignCenterHorizontal,
  },
  {
    number: "02",
    title: "Implantes Dentários",
    description:
      "Reposição de dentes ausentes com implantes de titânio e coroas personalizadas, restabelecendo função e estética de forma duradoura.",
    icon: CircleDot,
  },
  {
    number: "03",
    title: "Limpeza e Prevenção",
    description:
      "Remoção de tártaro e placa bacteriana, orientação de higiene e acompanhamento periódico para manter a saúde bucal em dia.",
    icon: Sparkles,
  },
  {
    number: "04",
    title: "Restaurações",
    description:
      "Recuperação de dentes com resinas de alta estética e porcelanas que reproduzem a cor e o formato naturais do sorriso.",
    icon: Layers,
  },
  {
    number: "05",
    title: "Estética Dental",
    description:
      "Harmonização do sorriso com facetas, lentes de contato dental e procedimentos delicados que respeitam as características de cada paciente.",
    icon: Smile,
  },
  {
    number: "06",
    title: "Biossegurança e Cuidado",
    description:
      "Protocolos rigorosos de esterilização, organização e proteção para que cada consulta seja segura, confortável e tranquila.",
    icon: ShieldCheck,
  },
];

export function Treatments() {
  return (
    <section id="tratamentos" className="relative overflow-hidden py-20 md:py-32">
      <div className="paper pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">
            <span className="section-index mr-3 align-middle">02</span>Tratamentos
          </p>
          <h2 className="mt-6 font-serif text-[2.1rem] leading-[1.15] sm:text-5xl">
            Cuidados que transformam
            <span className="italic text-gold"> o sorriso</span>
          </h2>
          <p className="mt-6 text-[0.95rem] leading-[1.9] text-muted-foreground">
            Cada tratamento é conduzido com planejamento individual, tecnologia e atenção aos
            detalhes para resultados naturais e duradouros.
          </p>
        </Reveal>

        <ul className="relative mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {treatments.map((t, i) => (
            <Reveal
              as="li"
              key={t.title}
              delay={i * 80}
              className="group relative flex flex-col bg-card/40 p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:bg-card/70 sm:p-8"
              style={{
                borderRadius: "1.25rem",
                border: "1px solid hsl(var(--border))",
              }}
            >
              <span className="absolute inset-x-0 top-0 h-px w-0 bg-gradient-to-r from-transparent via-gold to-transparent transition-all duration-700 group-hover:w-full" />
              <span className="absolute inset-x-0 bottom-0 h-px w-0 bg-gradient-to-r from-transparent via-gold to-transparent transition-all duration-700 group-hover:w-full" />

              <div className="mb-6 flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background transition-colors duration-500 group-hover:border-gold/40 group-hover:bg-champagne/40">
                  <t.icon
                    className="h-5 w-5 text-muted-foreground transition-colors duration-500 group-hover:text-gold"
                    strokeWidth={1.5}
                  />
                </div>
                <span className="font-serif text-[1.35rem] italic leading-none text-gold/50 transition-colors duration-500 group-hover:text-gold">
                  {t.number}
                </span>
              </div>

              <h3 className="font-serif text-2xl tracking-tight text-foreground transition-colors duration-500 group-hover:text-gold">
                {t.title}
              </h3>
              <p className="mt-3 flex-1 text-[0.9rem] leading-[1.85] text-muted-foreground">
                {t.description}
              </p>

              <div className="mt-6 flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground/70 transition-colors duration-500 group-hover:text-gold">
                <span className="h-px w-6 bg-gold/40 transition-all duration-500 group-hover:w-10" />
                Saiba mais
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
