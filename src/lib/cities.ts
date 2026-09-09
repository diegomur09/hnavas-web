// Local-SEO city data. Each Denver-metro city gets its own landing page
// (/[locale]/[city]) targeting "custom software development {city}" searches.
// Content is bilingual and unique per city (not templated) to avoid thin /
// duplicate-content penalties; the shared sections (services, work, contact,
// FAQ) are reused from the home page.

export type CityCopy = {
  // Unique 2–3 sentence intro shown under the H1. The local angle (county,
  // business scene) is what makes each page distinct for Google.
  intro: string;
  // One line naming nearby areas — reinforces the local relevance signal.
  areas: string;
};

export type City = {
  slug: string; // URL segment, e.g. "denver"
  name: string; // Display name, e.g. "Denver"
  county: string; // Used in the LocalBusiness/Service areaServed schema
  en: CityCopy;
  es: CityCopy;
};

export const CITIES: City[] = [
  {
    slug: "denver",
    name: "Denver",
    county: "Denver County",
    en: {
      intro:
        "Denver businesses move fast, and your software should keep up. I build production web apps, AWS cloud systems and AI automation for startups and established companies across the Mile High City — from downtown to the Tech Center.",
      areas: "Serving downtown Denver, Cherry Creek, RiNo, Capitol Hill and the wider metro area.",
    },
    es: {
      intro:
        "Las empresas de Denver se mueven rápido, y tu software debería ir al mismo ritmo. Construyo aplicaciones web en producción, sistemas en la nube de AWS y automatización con IA para startups y compañías ya establecidas en toda la ciudad — del centro al Tech Center.",
      areas: "Damos servicio al centro de Denver, Cherry Creek, RiNo, Capitol Hill y todo el área metropolitana.",
    },
  },
  {
    slug: "lakewood",
    name: "Lakewood",
    county: "Jefferson County",
    en: {
      intro:
        "Lakewood's small businesses and service companies deserve software built to convert, not just to look good. I design fast websites, custom web apps and automations for Jefferson County companies that want to compete online.",
      areas: "Serving Belmar, Green Mountain, Union Boulevard and the West Colfax corridor.",
    },
    es: {
      intro:
        "Los pequeños negocios y empresas de servicios de Lakewood merecen software hecho para convertir, no solo para verse bien. Diseño sitios rápidos, aplicaciones web a medida y automatizaciones para compañías del condado de Jefferson que quieren competir en línea.",
      areas: "Damos servicio a Belmar, Green Mountain, Union Boulevard y el corredor de West Colfax.",
    },
  },
  {
    slug: "aurora",
    name: "Aurora",
    county: "Arapahoe County",
    en: {
      intro:
        "Aurora is one of Colorado's most diverse and fastest-growing cities — and bilingual, mobile-first software is a real advantage here. I build web apps, automations and high-performance sites in English and Spanish for businesses across the east metro.",
      areas: "Serving the Anschutz Medical Campus area, Southlands, Stapleton/Central Park and Buckley.",
    },
    es: {
      intro:
        "Aurora es una de las ciudades más diversas y de mayor crecimiento de Colorado — y aquí el software bilingüe y pensado para móvil es una ventaja real. Construyo aplicaciones web, automatizaciones y sitios de alto rendimiento en inglés y español para negocios del este del área metro.",
      areas: "Damos servicio a la zona del Anschutz Medical Campus, Southlands, Stapleton/Central Park y Buckley.",
    },
  },
  {
    slug: "boulder",
    name: "Boulder",
    county: "Boulder County",
    en: {
      intro:
        "Boulder's startup and research community sets a high technical bar. I ship modern full-stack products, serverless AWS architecture and AI features that hold up to a founder-and-engineer audience — from MVP to scale.",
      areas: "Serving Pearl Street, the CU Boulder area, Gunbarrel and the Diagonal Highway tech corridor.",
    },
    es: {
      intro:
        "La comunidad de startups e investigación de Boulder pone un listón técnico alto. Entrego productos full-stack modernos, arquitectura serverless en AWS y funciones de IA que aguantan ante un público de fundadores e ingenieros — del MVP al escalado.",
      areas: "Damos servicio a Pearl Street, la zona de CU Boulder, Gunbarrel y el corredor tecnológico de Diagonal Highway.",
    },
  },
  {
    slug: "arvada",
    name: "Arvada",
    county: "Jefferson County",
    en: {
      intro:
        "From Olde Town's local shops to growing service businesses, Arvada companies need a web presence that earns trust and books work. I build conversion-focused sites, custom tools and automations tailored to northwest-metro businesses.",
      areas: "Serving Olde Town Arvada, Candelas, Leyden Rock and the Ralston Road corridor.",
    },
    es: {
      intro:
        "Desde las tiendas locales de Olde Town hasta negocios de servicios en crecimiento, las empresas de Arvada necesitan una presencia web que genere confianza y agende trabajo. Construyo sitios enfocados en conversión, herramientas a medida y automatizaciones pensadas para negocios del noroeste del metro.",
      areas: "Damos servicio a Olde Town Arvada, Candelas, Leyden Rock y el corredor de Ralston Road.",
    },
  },
  {
    slug: "westminster",
    name: "Westminster",
    county: "Adams & Jefferson Counties",
    en: {
      intro:
        "Sitting between Denver and Boulder, Westminster businesses get the best of both markets. I build web apps, fast websites and AI automations that help local companies capture leads and run leaner along the US-36 corridor.",
      areas: "Serving the US-36 corridor, The Orchard, Westminster Station and Standley Lake.",
    },
    es: {
      intro:
        "Ubicada entre Denver y Boulder, las empresas de Westminster aprovechan lo mejor de ambos mercados. Construyo aplicaciones web, sitios rápidos y automatizaciones con IA que ayudan a las compañías locales a captar clientes y operar de forma más eficiente en el corredor de la US-36.",
      areas: "Damos servicio al corredor de la US-36, The Orchard, Westminster Station y Standley Lake.",
    },
  },
  {
    slug: "thornton",
    name: "Thornton",
    county: "Adams County",
    en: {
      intro:
        "Thornton is growing fast, and local businesses are scaling with it. I build websites, custom web apps and automations that help north-metro companies handle more leads, more bookings and more customers without more busywork.",
      areas: "Serving the Larkridge area, Original Thornton, Eastlake and the I-25 north corridor.",
    },
    es: {
      intro:
        "Thornton crece rápido, y los negocios locales escalan con la ciudad. Construyo sitios web, aplicaciones a medida y automatizaciones que ayudan a las empresas del norte del metro a manejar más clientes potenciales, más reservas y más clientes sin más trabajo manual.",
      areas: "Damos servicio a la zona de Larkridge, Original Thornton, Eastlake y el corredor norte de la I-25.",
    },
  },
  {
    slug: "centennial",
    name: "Centennial",
    county: "Arapahoe County",
    en: {
      intro:
        "Centennial and the Denver Tech Center are home to professional firms and B2B companies that run on software. I build dependable web apps, AWS systems and integrations (CRM, payments, scheduling) for south-metro businesses that need things to just work.",
      areas: "Serving the Denver Tech Center, Streets at SouthGlenn, Arapahoe Road and the I-25 south corridor.",
    },
    es: {
      intro:
        "Centennial y el Denver Tech Center albergan firmas profesionales y empresas B2B que funcionan con software. Construyo aplicaciones web confiables, sistemas en AWS e integraciones (CRM, pagos, agendamiento) para negocios del sur del metro que necesitan que todo simplemente funcione.",
      areas: "Damos servicio al Denver Tech Center, Streets at SouthGlenn, Arapahoe Road y el corredor sur de la I-25.",
    },
  },
  {
    slug: "broomfield",
    name: "Broomfield",
    county: "Broomfield County",
    en: {
      intro:
        "Broomfield's Interlocken business park and growing tech scene are right in my backyard. I partner directly with local companies — no agency middlemen — to build production web apps, cloud systems and AI automation that ship.",
      areas: "Serving Interlocken, Arista, Broomfield Town Center and the US-36 / Northwest Parkway area.",
    },
    es: {
      intro:
        "El parque empresarial de Interlocken y la creciente escena tecnológica de Broomfield están justo en mi zona. Colaboro directamente con las empresas locales — sin intermediarios de agencia — para construir aplicaciones web en producción, sistemas en la nube y automatización con IA que se entregan.",
      areas: "Damos servicio a Interlocken, Arista, Broomfield Town Center y la zona de US-36 / Northwest Parkway.",
    },
  },
];

export function getCity(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}
