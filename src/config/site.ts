/**
 * Configuração central da LN Odontologia Especializada.
 * Edite este arquivo para atualizar telefone, WhatsApp, endereço, horários e redes sociais.
 */

export const siteConfig = {
  name: "LN Odontologia Especializada",
  shortName: "LN",
  tagline: "Odontologia Especializada",
  city: "São José do Rio Preto – SP",

  // Preencha com o número no formato internacional, apenas dígitos. Ex.: "5517999999999"
  // Enquanto estiver vazio, o site não exibe nem inventa nenhum número de WhatsApp.
  whatsappNumber: "",
  whatsappMessage: "Olá! Gostaria de agendar uma avaliação na LN Odontologia Especializada.",

  // Telefone exibido no site. Deixe vazio para ocultar.
  phoneDisplay: "",
  phoneHref: "",

  // Instagram. Deixe vazio para ocultar.
  instagramUrl: "",
  instagramHandle: "",

  address: {
    street: "Av. Constituição, 1554",
    district: "Boa Vista",
    city: "São José do Rio Preto – SP",
    zip: "15025-120",
  },

  hours: {
    days: "Segunda a sexta",
    time: "08h às 18h",
  },

  mapsEmbedUrl:
    "https://www.google.com/maps?q=Av.+Constitui%C3%A7%C3%A3o,+1554+-+Boa+Vista,+S%C3%A3o+Jos%C3%A9+do+Rio+Preto+-+SP,+15025-120&output=embed",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=Av.+Constitui%C3%A7%C3%A3o,+1554+-+Boa+Vista,+S%C3%A3o+Jos%C3%A9+do+Rio+Preto+-+SP,+15025-120",
} as const;

export const whatsappLink = siteConfig.whatsappNumber
  ? `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`
  : null;

export const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "A Clínica", href: "#clinica" },
  { label: "Tratamentos", href: "#tratamentos" },
  { label: "Equipe", href: "#equipe" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Contato", href: "#contato" },
] as const;

/** Depoimentos demonstrativos — substitua pelos textos reais quando disponíveis. */
export const testimonials = [
  {
    quote:
      "Depoimento demonstrativo. Substitua este texto pela experiência real de um paciente da clínica.",
    author: "Paciente",
    detail: "Nome a definir",
  },
  {
    quote:
      "Depoimento demonstrativo. Este espaço está preparado para receber avaliações verdadeiras.",
    author: "Paciente",
    detail: "Nome a definir",
  },
  {
    quote:
      "Depoimento demonstrativo. Edite em src/config/site.ts para publicar relatos autênticos.",
    author: "Paciente",
    detail: "Nome a definir",
  },
] as const;
