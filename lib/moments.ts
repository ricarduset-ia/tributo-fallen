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
    id: "zfUD7xJ2Q2Q",
    year: "1.6",
    title: {
      pt: "Era 1.6 — os momentos que abriram o caminho",
      en: "1.6 era — the moments that paved the way",
      es: "Era 1.6 — los momentos que abrieron el camino",
    },
    description: {
      pt: "Antes do CS:GO, antes do Major. Os plays do FalleN no 1.6 que mostraram quem ele se tornaria.",
      en: "Before CS:GO, before the Major. FalleN's 1.6 plays that showed who he would become.",
      es: "Antes del CS:GO, antes del Major. Las jugadas de FalleN en el 1.6 que mostraron quién sería.",
    },
    featured: false,
  },
  {
    id: "0KZBprFq_1U",
    year: "2010",
    title: {
      pt: "WCG Pan 2010 — POV de AWP no 1.6",
      en: "WCG Pan 2010 — AWP POV on 1.6",
      es: "WCG Pan 2010 — POV de AWP en el 1.6",
    },
    description: {
      pt: "FalleN de AWP no Counter-Strike 1.6. O Professor antes de virar Professor.",
      en: "FalleN on the AWP in Counter-Strike 1.6. The Professor before becoming the Professor.",
      es: "FalleN con AWP en Counter-Strike 1.6. El Profesor antes de volverse el Profesor.",
    },
    featured: false,
  },
  {
    id: "St0_ViSnfbs",
    year: "2010",
    title: {
      pt: "WCG 2010 — a final que começou tudo",
      en: "WCG 2010 — the final where it all started",
      es: "WCG 2010 — la final donde todo empezó",
    },
    description: {
      pt: "FireGamers x CNB na decisão. POV do FalleN no round final — seis anos antes do primeiro Major.",
      en: "FireGamers vs CNB in the final. FalleN's POV on the closing round — six years before the first Major.",
      es: "FireGamers vs CNB en la final. POV de FalleN en el round final — seis años antes del primer Major.",
    },
    featured: false,
  },
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
      pt: "IEM Katowice — Stop Blowing My Mind",
      en: "IEM Katowice — Stop Blowing My Mind",
      es: "IEM Katowice — Stop Blowing My Mind",
    },
    description: {
      pt: "Quatro kills de AWP sozinho. O clutch que virou lenda.",
      en: "Four AWP kills alone. The clutch that became a legend.",
      es: "Cuatro kills de AWP solo. El clutch que se volvió leyenda.",
    },
    featured: true,
  },
  {
    id: "zqd94_tCosk",
    year: "2016",
    title: {
      pt: "ESL Pro League S4 — o clutch no Dust2",
      en: "ESL Pro League S4 — the Dust2 clutch",
      es: "ESL Pro League S4 — el clutch en Dust2",
    },
    description: {
      pt: "SK contra Cloud9 na final. Mais um clutch do Professor quando o round pedia calma.",
      en: "SK vs Cloud9 in the final. Another Professor clutch when the round demanded composure.",
      es: "SK contra Cloud9 en la final. Otro clutch del Profesor cuando el round exigía calma.",
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
];
