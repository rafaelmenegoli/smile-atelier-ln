          },
          openingHours: "Mo-Fr 08:00-18:00",
        }),
      },
    ],
  }),
  component: Home,
});
const treatments = [
  {
    title: "Clínica Geral",
    text: "Acompanhamento contínuo, diagnóstico cuidadoso e procedimentos essenciais para manter a saúde bucal em dia.",
  },
  {
    title: "Estética Dental",
    text: "Procedimentos delicados que valorizam a harmonia do sorriso, respeitando as características de cada paciente.",
  },
  {
    title: "Reabilitação Oral",
    text: "Devolução de função e conforto por meio de planejamento individualizado e execução criteriosa.",
  },
  {
    title: "Prevenção e Saúde Bucal",
    text: "Orientação, profilaxia e acompanhamento preventivo para preservar resultados a longo prazo.",
  },
];
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
              <DentalArch className="mx-auto mt-4 h-[22rem] w-full max-w-3xl sm:h-[30rem]" />
              <DentalArch className="mx-auto mt-8 h-[28rem] w-full max-w-4xl sm:h-[36rem]" />
            </Reveal>
            <Reveal delay={200} className="mx-auto max-w-lg text-center">
              <p className="text-[0.9rem] leading-[1.9] text-muted-foreground">

[299 lines collapsed]
