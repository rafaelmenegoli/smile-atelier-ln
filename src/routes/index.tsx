import { createFileRoute } from "@tanstack/react-router";

import heroClinic from "@/assets/hero-clinic.jpg";
import aboutClinic from "@/assets/about-clinic.jpg";
import teamDentist from "@/assets/team-dentist.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { Reveal } from "@/components/site/Reveal";
import { Gallery } from "@/components/site/Gallery";
import { DentalArch } from "@/components/site/DentalArch";
import { TestimonialsCarousel } from "@/components/site/TestimonialsCarousel";
import { Treatments } from "@/components/site/Treatments";
import { siteConfig, whatsappLink } from "@/config/site";

const title = "LN Odontologia Especializada | São José do Rio Preto";
const description =
  "Clínica odontológica em São José do Rio Preto – SP. Atendimento humanizado, estrutura moderna e cuidado individualizado para o seu sorriso.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Dentist",
          name: siteConfig.name,
          address: {
            "@type": "PostalAddress",
            streetAddress: siteConfig.address.street,
            addressLocality: "São José do Rio Preto",
            addressRegion: "SP",
            postalCode: siteConfig.address.zip,
            addressCountry: "BR",
          },
          openingHours: "Mo-Fr 08:00-18:00",
        }),
      },
    ],
  }),
  component: Home,
});

const differentials = [
  {
    title: "Corpo clínico especializado",
    text: "Atendimento conduzido por profissionais com formação sólida e visão integrada da saúde bucal, para decisões seguras e bem fundamentadas.",
  },
  {
    title: "Fluxo digital e preciso",
    text: "Planejamento com escaneamento intraoral e recursos tecnológicos que tornam o diagnóstico mais previsível e a experiência mais confortável.",
  },
  {
    title: "Atendimento boutique",
    text: "Um ambiente pensado para acolher: tempo dedicado, escuta atenta e um cuidado que acompanha cada paciente do início ao pós-tratamento.",
  },
  {
    title: "Biossegurança premium",
    text: "Protocolos rigorosos de esterilização, organização e proteção para que você se sinta seguro em cada visita.",
  },
];

function Home() {
  const cta = whatsappLink ?? "#contato";
  const ctaProps = whatsappLink
    ? { target: "_blank", rel: "noopener noreferrer" as const }
    : {};

  return (
    <div className="paper min-h-screen bg-background">
      <Header />

      <main>
        {/* HERO */}
        <section id="inicio" className="relative pt-28 md:pt-32">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 md:px-10 lg:grid-cols-2 lg:gap-20 lg:pb-28">
            <Reveal>
              <p className="eyebrow">LN — Odontologia Especializada</p>
              <h1 className="mt-7 font-serif text-[2.6rem] leading-[1.08] text-foreground sm:text-6xl lg:text-[4.2rem]">
                Um cuidado especial
                <br />
                para o seu <em className="italic text-gold">sorriso</em>.
              </h1>
              <p className="mt-7 max-w-lg text-[0.95rem] leading-[1.9] text-muted-foreground">
                Na LN Odontologia Especializada, unimos experiência, tecnologia e um atendimento
                acolhedor para cuidar do seu sorriso com atenção em cada detalhe.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={cta}
                  {...ctaProps}
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-primary px-9 py-4 text-[0.75rem] uppercase tracking-[0.2em] text-primary-foreground transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-18px_hsl(var(--foreground)/0.6)] motion-reduce:hover:translate-y-0"
                >
                  Agendar sua avaliação
                  <span className="h-px w-0 bg-gold transition-all duration-500 group-hover:w-7" />
                </a>
                <a
                  href="#clinica"
                  className="group inline-flex items-center justify-center gap-3 rounded-full border border-border px-9 py-4 text-[0.75rem] uppercase tracking-[0.2em] text-foreground transition-all duration-500 hover:border-gold hover:text-gold"
                >
                  Conheça a clínica
                  <span className="h-px w-0 bg-gold transition-all duration-500 group-hover:w-7" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={120} className="relative">
              <div className="absolute -left-4 -top-4 hidden h-full w-full rounded-[2rem] border border-gold/30 lg:block" />
              <img
                src={heroClinic}
                width={1280}
                height={1600}
                alt="Recepção da clínica LN Odontologia Especializada, com iluminação quente e acabamento em tons claros"
                className="relative h-[26rem] w-full rounded-[1.5rem] object-cover sm:h-[34rem] lg:h-[42rem] lg:rounded-[2rem]"
              />
            </Reveal>
          </div>
        </section>

        {/* SOBRE */}
        <section id="clinica" className="relative overflow-hidden bg-sand/60 py-20 md:py-32">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 top-1/2 hidden -translate-y-1/2 select-none font-serif text-[26rem] leading-none text-nude/25 lg:block"
          >
            LN
          </span>
          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-10 lg:grid-cols-2 lg:gap-24">
            <Reveal className="order-2 lg:order-1">
              <img
                src={aboutClinic}
                width={1200}
                height={1408}
                loading="lazy"
                alt="Sala de espera da clínica, com poltronas claras e decoração delicada"
                className="h-[24rem] w-full rounded-[1.5rem] object-cover sm:h-[32rem] lg:h-[38rem]"
              />
            </Reveal>
            <Reveal delay={100} className="order-1 lg:order-2">
              <p className="eyebrow"><span className="section-index mr-3 align-middle">01</span>A Clínica</p>
              <h2 className="mt-6 font-serif text-[2.1rem] leading-[1.15] sm:text-5xl">
                Cuidar do seu sorriso
                <br />é cuidar de você.
              </h2>
              <div className="mt-8 space-y-5 text-[0.95rem] leading-[1.9] text-muted-foreground">
                <p>
                  A LN nasceu do desejo de oferecer uma odontologia próxima, atenta e serena. Aqui,
                  cada atendimento começa por ouvir: entender a história, as expectativas e o ritmo
                  de quem senta na cadeira.
                </p>
                <p>
                  O ambiente foi planejado para transmitir tranquilidade, com protocolos rigorosos de
                  segurança e conforto em cada etapa. O cuidado individualizado orienta todas as
                  decisões clínicas, sempre com transparência sobre o que é indicado.
                </p>
                <p>
                  Excelência, para nós, é a soma de detalhes discretos: tempo dedicado, técnica
                  apurada e acolhimento genuíno.
                </p>
              </div>
              <a
                href="#galeria"
                className="mt-9 inline-flex items-center gap-3 text-[0.75rem] uppercase tracking-[0.2em] text-foreground transition-colors hover:text-gold"
              >
                Conheça nossa clínica
                <span className="h-px w-10 bg-gold" />
              </a>
            </Reveal>
          </div>
        </section>

        {/* ARCADA 3D */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <Reveal className="mx-auto max-w-xl text-center">
              <p className="eyebrow">Detalhe por detalhe</p>
              <h2 className="mt-6 font-serif text-[2rem] leading-[1.15] sm:text-[2.6rem]">
                Cada dente tem a sua
                <em className="italic text-gold"> história</em>.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <DentalArch className="mx-auto mt-4 w-full max-w-3xl" />
            </Reveal>
            <Reveal delay={200} className="mx-auto max-w-lg text-center">
              <p className="text-[0.9rem] leading-[1.9] text-muted-foreground">
                Estudamos a arcada como um conjunto: função, oclusão e estética caminham juntas em
                cada planejamento.
              </p>
            </Reveal>
          </div>
        </section>

        {/* TRATAMENTOS */}
        <Treatments />

        {/* DIFERENCIAIS */}
        <section className="relative overflow-hidden bg-sand/60 py-20 md:py-32">
          <div className="paper pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl px-5 md:px-10">
            <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12 lg:gap-8">
              {/* Left Column: Statement */}
              <Reveal className="lg:col-span-5">
                <div className="space-y-6">
                  <p className="eyebrow">
                    <span className="section-index mr-3 align-middle">03</span>Diferenciais
                  </p>
                  <h2 className="font-serif text-[2.4rem] leading-[1.08] italic text-foreground sm:text-5xl lg:text-[3.6rem]">
                    Onde a ciência encontra
                    <span className="block not-italic">a arte do sorriso.</span>
                  </h2>

                </div>
                <div className="mt-8 h-px w-24 bg-gold/40" />
                <p className="mt-8 max-w-md text-[0.95rem] leading-[1.9] text-muted-foreground">
                  Na LN Odontologia, transcendemos o tratamento convencional. Combinamos precisão
                  tecnológica com um olhar cuidadoso sobre a estética facial, criando resultados que
                  são, acima de tudo, autênticos.
                </p>
                <a
                  href="#clinica"
                  className="group mt-8 inline-flex items-center gap-4 text-[0.75rem] uppercase tracking-[0.2em] text-foreground transition-colors hover:text-gold"
                >
                  Conheça nossa filosofia
                  <span className="h-px w-8 bg-gold transition-all duration-500 group-hover:w-12" />
                </a>
              </Reveal>

              {/* Right Column: Pillars */}
              <ul className="grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2 lg:col-span-7">
                {differentials.map((d, i) => (
                  <Reveal
                    as="li"
                    key={d.title}
                    delay={i * 100}
                    className="group border-t border-border pt-7 transition-colors duration-500 hover:border-gold"
                  >
                    <span className="block font-serif text-[1.6rem] italic leading-none text-gold/70 transition-colors duration-500 group-hover:text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 font-serif text-2xl tracking-tight text-foreground transition-colors duration-500 group-hover:text-gold">
                      {d.title}
                    </h3>
                    <p className="mt-3 text-[0.9rem] leading-[1.9] text-muted-foreground">
                      {d.text}
                    </p>
                  </Reveal>
                ))}
              </ul>

            </div>

            <div className="mt-24 h-px w-full bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
          </div>
        </section>

        {/* EQUIPE */}
        <section id="equipe" className="py-20 md:py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-10 lg:grid-cols-[0.85fr_1fr] lg:gap-24">
            <Reveal>
              <img
                src={teamDentist}
                width={1008}
                height={1264}
                loading="lazy"
                alt="Retrato profissional da Dra. Letícia Nunes, cirurgiã-dentista"
                className="h-[26rem] w-full rounded-[1.5rem] object-cover sm:h-[34rem]"
              />
            </Reveal>
            <Reveal delay={100}>
              <p className="eyebrow"><span className="section-index mr-3 align-middle">04</span>Equipe</p>
              <h2 className="mt-6 font-serif text-[2.1rem] leading-[1.15] sm:text-5xl">
                Dra. Letícia Nunes
              </h2>
              <p className="mt-4 text-[0.8rem] uppercase tracking-[0.18em] text-muted-foreground">
                Cirurgiã-Dentista | CRO 109.161
              </p>
              <div className="mt-8 max-w-lg">
                <span className="block h-px w-16 bg-gold" />
                <p className="mt-8 font-serif text-2xl leading-[1.6] text-foreground sm:text-[1.75rem]">
                  “Com dedicação, ética e atenção aos detalhes, a Dra. Letícia busca oferecer uma
                  experiência odontológica acolhedora, segura e personalizada para cada paciente.”
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* DEPOIMENTOS */}
        <section id="depoimentos" className="bg-sand/60 py-20 md:py-32">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <Reveal className="max-w-2xl">
              <p className="eyebrow"><span className="section-index mr-3 align-middle">05</span>Depoimentos</p>
              <h2 className="mt-6 font-serif text-[2.1rem] leading-[1.15] sm:text-5xl">
                Experiências que nos inspiram
              </h2>
            </Reveal>
            <TestimonialsCarousel />
          </div>
        </section>

        {/* GALERIA */}
        <section id="galeria" className="py-20 md:py-32">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <Reveal className="max-w-2xl">
              <p className="eyebrow"><span className="section-index mr-3 align-middle">06</span>Galeria</p>
              <h2 className="mt-6 font-serif text-[2.1rem] leading-[1.15] sm:text-5xl">
                Um espaço pensado nos detalhes
              </h2>
            </Reveal>
            <Gallery
              images={[
                {
                  src: gallery1,
                  alt: "Consultório odontológico com iluminação suave e acabamento em madeira clara",
                  className: "lg:col-span-2",
                },
                { src: gallery2, alt: "Corredor claro e minimalista da clínica" },
                { src: gallery3, alt: "Detalhe da decoração da clínica com luz natural" },
                {
                  src: aboutClinic,
                  alt: "Ambiente de espera da clínica em tons neutros",
                  className: "lg:col-span-2",
                },
              ]}
            />
          </div>
        </section>

        {/* LOCALIZAÇÃO */}
        <section id="localizacao" className="bg-sand/60 py-20 md:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-10 lg:grid-cols-[0.8fr_1fr] lg:gap-20">
            <Reveal>
              <p className="eyebrow"><span className="section-index mr-3 align-middle">07</span>Localização</p>
              <h2 className="mt-6 font-serif text-[2.1rem] leading-[1.15] sm:text-5xl">
                Venha conhecer a LN
              </h2>
              <div className="mt-10 space-y-8 text-[0.95rem] leading-[1.9] text-muted-foreground">
                <div>
                  <h3 className="eyebrow font-sans">Endereço</h3>
                  <p className="mt-3">
                    {siteConfig.address.street}
                    <br />
                    {siteConfig.address.district}
                    <br />
                    {siteConfig.address.city}
                    <br />
                    {siteConfig.address.zip}
                  </p>
                </div>
                <div>
                  <h3 className="eyebrow font-sans">Horário</h3>
                  <p className="mt-3">
                    {siteConfig.hours.days}
                    <br />
                    {siteConfig.hours.time}
                  </p>
                </div>
                <a
                  href={siteConfig.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-[0.75rem] uppercase tracking-[0.2em] text-foreground transition-colors hover:text-gold"
                >
                  Ver no mapa
                  <span className="h-px w-10 bg-gold" />
                </a>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <iframe
                title="Mapa da localização da LN Odontologia Especializada"
                src={siteConfig.mapsEmbedUrl}
                loading="lazy"
                className="h-[22rem] w-full rounded-[1.5rem] border border-border sm:h-[30rem]"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Reveal>
          </div>
        </section>

        {/* CONTATO */}
        <section id="contato" className="py-24 md:py-36">
          <div className="mx-auto max-w-4xl px-5 text-center md:px-10">
            <Reveal>
              <p className="eyebrow"><span className="section-index mr-3 align-middle">08</span>Contato</p>
              <h2 className="mt-6 font-serif text-[2.3rem] leading-[1.12] sm:text-[3.4rem]">
                Seu sorriso começa
                <br />
                com uma conversa.
              </h2>
              <p className="mx-auto mt-7 max-w-xl text-[0.95rem] leading-[1.9] text-muted-foreground">
                Conte para nós o que você deseja para o seu sorriso. Vamos conversar com calma e
                encontrar o melhor caminho, no seu tempo.
              </p>

              {whatsappLink ? (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-10 inline-flex w-full items-center justify-center rounded-full bg-primary px-12 py-5 text-[0.78rem] uppercase tracking-[0.22em] text-primary-foreground transition-opacity duration-300 hover:opacity-90 sm:w-auto"
                >
                  Agendar pelo WhatsApp
                </a>
              ) : (
                <p className="mx-auto mt-10 max-w-md rounded-full border border-dashed border-border px-8 py-5 text-[0.75rem] uppercase tracking-[0.18em] text-muted-foreground">
                  WhatsApp a configurar em src/config/site.ts
                </p>
              )}

              <div className="mt-16 grid gap-8 border-t border-border pt-10 text-sm text-muted-foreground sm:grid-cols-3">
                <div>
                  <h3 className="eyebrow font-sans">Telefone</h3>
                  <p className="mt-3">
                    {siteConfig.phoneDisplay ? (
                      <a href={siteConfig.phoneHref} className="hover:text-foreground">
                        {siteConfig.phoneDisplay}
                      </a>
                    ) : (
                      "A configurar"
                    )}
                  </p>
                </div>
                <div>
                  <h3 className="eyebrow font-sans">Endereço</h3>
                  <p className="mt-3">
                    {siteConfig.address.street}
                    <br />
                    {siteConfig.address.district} — {siteConfig.address.city}
                  </p>
                </div>
                <div>
                  <h3 className="eyebrow font-sans">Atendimento</h3>
                  <p className="mt-3">
                    {siteConfig.hours.days}
                    <br />
                    {siteConfig.hours.time}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
