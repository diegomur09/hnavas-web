// Service landing pages: /services/{slug}/ (EN) and /es/services/{slug}/ (ES).
// One page per service, each targeting "{service} Denver" searches. The page
// order copies what ranks for these searches locally (Denver agencies studied
// 7 Nov 2026): the problem it solves, what's included, which platform fits,
// how a project runs, real projects, service-specific FAQ, related services.
//
// Every claim here must be true and match the project cards in site.ts and
// messages/*.json. Prices stay out until Diego decides to publish ranges.

import type { ServiceId } from "./site";

type Item = { title: string; body: string };
type QA = { q: string; a: string };

export type ServicePageCopy = {
  metaTitle: string; // Goes through the "%s | HNavas Systems" title template
  metaDescription: string;
  breadcrumb: string; // Short name for the breadcrumb trail
  h1: string;
  intro: string; // Answer-first: what you get, for whom, in two sentences
  whenTitle: string;
  when: Item[]; // Problems that make this service worth paying for
  includedTitle: string;
  included: Item[];
  platformsTitle?: string;
  platformsIntro?: string;
  platforms?: Item[];
  processTitle: string;
  process: Item[];
  processNote?: string;
  workTitle: string;
  workSubtitle: string;
  faqTitle: string;
  faq: QA[];
};

export type ServicePage = {
  slug: string; // URL segment under /services/
  serviceId: ServiceId; // The matching card on the home page / hub
  serviceType: string; // schema.org Service.serviceType
  projects: string[]; // Project slugs from site.ts, shown in this order
  en: ServicePageCopy;
  es: ServicePageCopy;
};

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: "web-design",
    serviceId: "web",
    serviceType: "Website design & development",
    projects: ["fence-houston", "sky-weekender", "baychata", "luxury-rides"],
    en: {
      metaTitle: "Web Design & Website Development in Denver",
      metaDescription:
        "Fast, mobile-first business websites in English, Spanish or both, on Next.js, WordPress, Shopify, Wix or Base44, with lead forms, SEO and analytics set up.",
      breadcrumb: "Web design",
      h1: "Web design & website development in Denver",
      intro:
        "I design and build fast business websites for Denver companies: mobile-first, in English, Spanish or both, with a form that sends every lead to your inbox and the SEO basics done before launch. You work directly with the engineer who builds your site, from the first call to after launch.",
      whenTitle: "When a new website pays off",
      when: [
        {
          title: "Your site doesn't bring in leads",
          body: "It looks fine, but the phone and the inbox stay quiet. A clear offer, a short form and fast pages turn visits into requests.",
        },
        {
          title: "It's slow or hard to use on a phone",
          body: "Most local searches happen on a phone, and slow pages lose visitors before they read anything. On one WordPress redesign I cut load time from 14.9 to 4.6 seconds.",
        },
        {
          title: "You serve Spanish-speaking customers",
          body: "One site in English and Spanish, with a real page for each language that Google can show to the right person, instead of an automatic translate button.",
        },
        {
          title: "Google and AI assistants can't find you",
          body: "Search engines and assistants like ChatGPT need clear pages, structured data and a sitemap to understand what you do and where. That is set up from day one.",
        },
      ],
      includedTitle: "What's included in a website project",
      included: [
        {
          title: "Pages built around your customers",
          body: "Structure and copy planned around what people in your area actually search for, not a generic template.",
        },
        {
          title: "Mobile-first and fast",
          body: "Built and tested for phones first, with optimized images and code so pages load quickly.",
        },
        {
          title: "English, Spanish or both",
          body: "Bilingual sites with a separate, indexable page for each language and a language switch on every page.",
        },
        {
          title: "Lead capture that works",
          body: "Contact or quote forms that deliver every request to your email, plus a booking link if you take appointments.",
        },
        {
          title: "SEO and analytics set up",
          body: "Titles, descriptions, structured data and a sitemap, connected to Google Search Console, Google Analytics and Bing Webmaster Tools.",
        },
        {
          title: "Launch and care",
          body: "Domain, hosting and SSL handled at launch, and updates afterwards if you want ongoing support.",
        },
      ],
      platformsTitle: "Custom code, WordPress, Shopify, Wix or Base44?",
      platformsIntro:
        "There is no single best platform. I work with all of these and recommend the simplest one that does the job for your budget and how you plan to update the site.",
      platforms: [
        {
          title: "Custom code (Next.js)",
          body: "The fastest pages and full freedom for custom features like calculators, bookings or payments, hosted on AWS or Google Cloud. Best when speed and search traffic matter most.",
        },
        {
          title: "WordPress",
          body: "Best when you want to edit text and photos yourself. I build it lean, with only the plugins it needs, so it stays fast.",
        },
        {
          title: "Shopify",
          body: "Best for online stores: products, inventory, checkout and shipping in one place, with a design that matches your brand.",
        },
        {
          title: "Wix",
          body: "Best for a simple site you want to manage yourself with drag-and-drop editing, set up properly for search from the start.",
        },
        {
          title: "Base44 (low-code)",
          body: "The quickest way to launch a site with simple app features, like bookings or forms, when budget and time are tight.",
        },
      ],
      processTitle: "How a website project works",
      process: [
        {
          title: "Free first call",
          body: "We talk about your business, your customers and what the site has to do. You get a written estimate before any work starts.",
        },
        {
          title: "Structure and content",
          body: "I plan the pages around real searches in your area and draft the copy with you, in one or both languages.",
        },
        {
          title: "Design and build",
          body: "You review a working preview of the site, not static mockups, and ask for changes before anything goes live.",
        },
        {
          title: "Launch",
          body: "Domain, hosting, forms, Search Console and Analytics are set up and tested on launch day.",
        },
        {
          title: "After launch",
          body: "I check that Google indexes the pages and that leads arrive, and I keep the site updated if you want ongoing support.",
        },
      ],
      processNote: "Most small business sites go live in 1 to 3 weeks.",
      workTitle: "Websites I've built",
      workSubtitle: "Live sites with real visitors, leads and sales.",
      faqTitle: "Website design questions",
      faq: [
        {
          q: "How much does a website cost?",
          a: "It depends on the number of pages, languages and features such as booking, payments or a price calculator. A one-page site for a local business is a small project; a multi-page bilingual site with custom tools is larger. After a free call you get a written estimate before any work starts.",
        },
        {
          q: "How long does it take to build a website?",
          a: "Most small business websites take 1 to 3 weeks from the first call to launch. Larger sites with many pages, two languages or custom tools are built in phases, so you see working pages early.",
        },
        {
          q: "Will my website show up on Google?",
          a: "It will be built to be found: indexable pages, titles and descriptions, structured data, and a sitemap submitted to Google Search Console and Bing. Rankings take weeks to build and nobody can honestly guarantee a position, but the technical side will not hold you back.",
        },
        {
          q: "Can I edit the website myself?",
          a: "Yes, if you choose WordPress, Shopify or Wix, which let you change text, photos and products yourself. Custom-coded sites are faster and more flexible, and I make the changes for you. We pick the platform based on how often you plan to update it.",
        },
        {
          q: "Do you build websites in Spanish?",
          a: "Yes. I'm bilingual and build sites in English, Spanish or both, with a separate page for each language so Google shows the right one to each searcher. The Houston fence site I built runs fully in both languages.",
        },
        {
          q: "Can you redesign my current website?",
          a: "Yes. I can rebuild a slow or outdated site, keep the pages that already bring traffic and redirect the old addresses so you don't lose visitors. On one WordPress redesign, mobile PageSpeed went from 46 to 72.",
        },
      ],
    },
    es: {
      metaTitle: "Diseño y Desarrollo de Páginas Web en Denver",
      metaDescription:
        "Páginas web rápidas para negocios, hechas para el celular, en inglés, español o ambos, en Next.js, WordPress, Shopify, Wix o Base44, con SEO y Analytics listos.",
      breadcrumb: "Diseño web",
      h1: "Diseño y desarrollo de páginas web en Denver",
      intro:
        "Diseño y construyo páginas web rápidas para negocios de Denver: pensadas primero para el celular, en inglés, español o ambos, con un formulario que manda cada cliente potencial a tu correo y el SEO básico listo antes del lanzamiento. Trabajas directamente con el ingeniero que construye tu sitio, desde la primera llamada hasta después del lanzamiento.",
      whenTitle: "Cuándo vale la pena una página web nueva",
      when: [
        {
          title: "Tu sitio no te trae clientes",
          body: "Se ve bien, pero el teléfono y el correo siguen callados. Una oferta clara, un formulario corto y páginas rápidas convierten las visitas en solicitudes.",
        },
        {
          title: "Es lento o difícil de usar en el celular",
          body: "La mayoría de las búsquedas locales se hacen desde el celular, y las páginas lentas pierden visitas antes de que lean algo. En un rediseño de WordPress bajé el tiempo de carga de 14.9 a 4.6 segundos.",
        },
        {
          title: "Atiendes clientes que hablan español",
          body: "Un solo sitio en inglés y español, con una página real para cada idioma que Google puede mostrar a la persona correcta, en vez de un botón de traducción automática.",
        },
        {
          title: "Google y los asistentes de IA no te encuentran",
          body: "Los buscadores y asistentes como ChatGPT necesitan páginas claras, datos estructurados y un sitemap para entender qué haces y dónde. Eso queda listo desde el primer día.",
        },
      ],
      includedTitle: "Qué incluye un proyecto de página web",
      included: [
        {
          title: "Páginas pensadas en tus clientes",
          body: "Estructura y textos planeados según lo que la gente de tu zona realmente busca, no una plantilla genérica.",
        },
        {
          title: "Primero el celular, y rápida",
          body: "Construida y probada primero para el celular, con imágenes y código optimizados para que cargue rápido.",
        },
        {
          title: "Inglés, español o ambos",
          body: "Sitios bilingües con una página propia e indexable para cada idioma y un selector de idioma en cada página.",
        },
        {
          title: "Formularios que sí funcionan",
          body: "Formularios de contacto o cotización que mandan cada solicitud a tu correo, y un enlace para agendar si trabajas con citas.",
        },
        {
          title: "SEO y Analytics listos",
          body: "Títulos, descripciones, datos estructurados y sitemap, conectados a Google Search Console, Google Analytics y Bing Webmaster Tools.",
        },
        {
          title: "Lanzamiento y mantenimiento",
          body: "Dominio, hosting y SSL listos en el lanzamiento, y actualizaciones después si quieres soporte continuo.",
        },
      ],
      platformsTitle: "¿Código a la medida, WordPress, Shopify, Wix o Base44?",
      platformsIntro:
        "No hay una plataforma mejor para todos. Trabajo con todas estas y te recomiendo la más sencilla que cumpla con tu presupuesto y con la forma en que piensas actualizar el sitio.",
      platforms: [
        {
          title: "Código a la medida (Next.js)",
          body: "Las páginas más rápidas y libertad total para funciones a la medida, como calculadoras, reservas o pagos, en AWS o Google Cloud. Lo mejor cuando la velocidad y el tráfico de búsqueda importan más.",
        },
        {
          title: "WordPress",
          body: "Lo mejor si quieres editar textos y fotos tú mismo. Lo construyo liviano, solo con los plugins necesarios, para que siga siendo rápido.",
        },
        {
          title: "Shopify",
          body: "Lo mejor para tiendas en línea: productos, inventario, pagos y envíos en un solo lugar, con un diseño que va con tu marca.",
        },
        {
          title: "Wix",
          body: "Lo mejor para un sitio sencillo que quieres manejar tú mismo arrastrando y soltando, bien configurado para Google desde el inicio.",
        },
        {
          title: "Base44 (low-code)",
          body: "La forma más rápida de lanzar un sitio con funciones sencillas de app, como reservas o formularios, cuando el presupuesto y el tiempo son cortos.",
        },
      ],
      processTitle: "Cómo funciona un proyecto de página web",
      process: [
        {
          title: "Primera llamada gratis",
          body: "Hablamos de tu negocio, tus clientes y lo que el sitio tiene que lograr. Recibes una cotización por escrito antes de empezar.",
        },
        {
          title: "Estructura y contenido",
          body: "Planeo las páginas según búsquedas reales en tu zona y preparo los textos contigo, en uno o en los dos idiomas.",
        },
        {
          title: "Diseño y construcción",
          body: "Revisas una versión funcionando del sitio, no imágenes estáticas, y pides cambios antes de que salga en vivo.",
        },
        {
          title: "Lanzamiento",
          body: "Dominio, hosting, formularios, Search Console y Analytics quedan configurados y probados el día del lanzamiento.",
        },
        {
          title: "Después del lanzamiento",
          body: "Reviso que Google indexe las páginas y que lleguen los clientes potenciales, y mantengo el sitio al día si quieres soporte continuo.",
        },
      ],
      processNote: "La mayoría de los sitios de negocios pequeños salen en vivo en 1 a 3 semanas.",
      workTitle: "Páginas web que he construido",
      workSubtitle: "Sitios en vivo con visitas, clientes potenciales y ventas reales.",
      faqTitle: "Preguntas sobre diseño web",
      faq: [
        {
          q: "¿Cuánto cuesta una página web?",
          a: "Depende de la cantidad de páginas, los idiomas y funciones como reservas, pagos o una calculadora de precios. Un sitio de una página para un negocio local es un proyecto pequeño; un sitio bilingüe de varias páginas con herramientas a la medida es más grande. Después de una llamada gratis recibes una cotización por escrito antes de empezar.",
        },
        {
          q: "¿Cuánto tiempo toma hacer una página web?",
          a: "La mayoría de los sitios para negocios pequeños toman de 1 a 3 semanas desde la primera llamada hasta el lanzamiento. Los sitios más grandes, con muchas páginas, dos idiomas o herramientas a la medida, se construyen por fases para que veas páginas funcionando desde temprano.",
        },
        {
          q: "¿Mi página va a aparecer en Google?",
          a: "Va a estar construida para que la encuentren: páginas indexables, títulos y descripciones, datos estructurados y un sitemap enviado a Google Search Console y a Bing. El posicionamiento toma semanas y nadie puede garantizar honestamente un lugar, pero la parte técnica no te va a frenar.",
        },
        {
          q: "¿Puedo editar la página yo mismo?",
          a: "Sí, si eliges WordPress, Shopify o Wix, que te dejan cambiar textos, fotos y productos tú mismo. Los sitios con código a la medida son más rápidos y flexibles, y los cambios los hago yo. Elegimos la plataforma según qué tan seguido piensas actualizarla.",
        },
        {
          q: "¿Haces páginas web en español?",
          a: "Sí. Soy bilingüe y construyo sitios en inglés, español o ambos, con una página separada para cada idioma para que Google le muestre la correcta a cada persona. El sitio de cercas en Houston que construí funciona completo en los dos idiomas.",
        },
        {
          q: "¿Puedes rediseñar mi página actual?",
          a: "Sí. Puedo reconstruir un sitio lento o anticuado, conservar las páginas que ya traen tráfico y redirigir las direcciones viejas para que no pierdas visitas. En un rediseño de WordPress, el PageSpeed en celular pasó de 46 a 72.",
        },
      ],
    },
  },
];

export function getServicePage(slug: string): ServicePage | undefined {
  return SERVICE_PAGES.find((s) => s.slug === slug);
}

/** The service page for a home-page service card, if one exists yet. */
export function servicePageFor(id: ServiceId): ServicePage | undefined {
  return SERVICE_PAGES.find((s) => s.serviceId === id);
}
