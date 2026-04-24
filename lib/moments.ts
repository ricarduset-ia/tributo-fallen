import type { Locale } from "@/i18n";

export type Moment = {
  id: string;
  year: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  featured: boolean;
};

export const MOMENTS: Moment[] = [
  {
    id: "-PUX1oXVtiY",
    year: "2016",
    title: {
      pt: "MLG Columbus — o primeiro Major do Brasil",
      en: "MLG Columbus — Brazil's first Major",
      es: "MLG Columbus — el primer Major de Brasil",
    },
    description: {
      pt: "Luminosity 2x1 NaVi. A final que mudou o CS brasileiro pra sempre.",
      en: "Luminosity 2-1 NaVi. The final that changed Brazilian CS forever.",
      es: "Luminosity 2-1 NaVi. La final que cambió el CS brasileño para siempre.",
    },
    featured: true,
  },
  {
    id: "ovtpt9Wpfmo",
    year: "2016",
    title: {
      pt: "SK Gaming — The Dream",
      en: "SK Gaming — The Dream",
      es: "SK Gaming — The Dream",
    },
    description: {
      pt: "O documentário do time brasileiro que conquistou o mundo. A história por trás dos dois Majors.",
      en: "The documentary about the Brazilian team that conquered the world. The story behind the two Majors.",
      es: "El documental del equipo brasileño que conquistó el mundo. La historia detrás de los dos Majors.",
    },
    featured: true,
  },
  {
    id: "QD6rT2CVgak",
    year: "2016",
    title: {
      pt: "IEM Katowice — o 1v4 contra NaVi",
      en: "IEM Katowice — the 1v4 vs NaVi",
      es: "IEM Katowice — el 1v4 contra NaVi",
    },
    description: {
      pt: "Quatro kills de AWP sozinho. O clutch que virou lenda.",
      en: "Four AWP kills alone. The clutch that became a legend.",
      es: "Cuatro kills de AWP solo. El clutch que se volvió leyenda.",
    },
    featured: true,
  },
  {
    id: "TJ5qVs_9KK4",
    year: "2022",
    title: {
      pt: "O Professor ranqueia seus 10 melhores plays",
      en: "The Professor ranks his top 10 plays",
      es: "El Profesor rankea sus 10 mejores jugadas",
    },
    description: {
      pt: "O próprio FalleN comenta os momentos que marcaram a carreira dele.",
      en: "FalleN himself breaks down the moments that defined his career.",
      es: "El propio FalleN comenta los momentos que marcaron su carrera.",
    },
    featured: false,
  },
  {
    id: "y9qrxt9DgAI",
    year: "2016",
    title: {
      pt: "Best of FalleN — o compilado da AWP",
      en: "Best of FalleN — the AWP highlights",
      es: "Best of FalleN — el compilado de AWP",
    },
    description: {
      pt: "Flicks, no-scopes, clutches. Uma década de precisão em 10 minutos.",
      en: "Flicks, no-scopes, clutches. A decade of precision in 10 minutes.",
      es: "Flicks, no-scopes, clutches. Una década de precisión en 10 minutos.",
    },
    featured: false,
  },
];
