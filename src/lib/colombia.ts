// /colombia/ (EN) and /es/colombia/ (ES): one page for Colombian companies that
// sell, or want to sell, in the United States. Decided 14-16 Nov 2026 (Diego
// chose "option A": not the local Colombian SMB market). Spanish is the main
// language here; the English version exists so the language switch works and
// for teams that read English.
//
// Same rules as services.ts: every claim must be true. Diego studied civil
// engineering in Colombia (Cvs fact bank); no currency or prices until he decides.

import type { ServicePageCopy } from "./services";

// metaTitle is used as an absolute title (no "| HNavas Systems" suffix) so
// "Colombia" and "EE.UU." fit in what Google shows.
export const COLOMBIA_PROJECTS = ["fence-houston", "sky-weekender", "dynamic-bachata", "salesforce-portal"];

export const COLOMBIA_COPY: Record<"en" | "es", ServicePageCopy> = {
  es: {
    metaTitle: "Software y Páginas Web para Vender en EE.UU. desde Colombia",
    metaDescription:
      "Sitios bilingües, software, AWS, IA y Salesforce para empresas colombianas que venden en EE.UU., con un ingeniero formado en Colombia que vive en Denver.",
    breadcrumb: "Colombia",
    h1: "Páginas web y software para empresas colombianas que venden en Estados Unidos",
    intro:
      "Ayudo a empresas colombianas a vender en Estados Unidos con sitios en inglés y español escritos para el comprador de allá, software a la medida, AWS, chatbots con IA y Salesforce. Me formé como ingeniero en Colombia y trabajo desde Denver, Colorado: hablamos en español y conozco cómo busca y compra el cliente de EE.UU.",
    whenTitle: "Para quién es",
    when: [
      {
        title: "Exportadoras y fabricantes",
        body: "Tu producto ya se vende afuera, pero tu sitio está pensado para Colombia. Un sitio en inglés con fichas claras, certificaciones y un formulario para distribuidores te pone frente al comprador de EE.UU.",
      },
      {
        title: "BPO, contact centers y servicios profesionales",
        body: "Atiendes clientes de EE.UU. y tu sitio, tu soporte y tus procesos tienen que verse y funcionar como los de una empresa de allá, incluido Salesforce para manejar los casos.",
      },
      {
        title: "Startups y empresas de software",
        body: "Construyes un producto para el mercado de EE.UU. y necesitas llevarlo a producción en AWS, con ambientes de producción y de pruebas desde el primer día.",
      },
      {
        title: "Negocios que reciben clientes de EE.UU.",
        body: "Turismo, salud, educación o finca raíz: si tus clientes vienen de Estados Unidos, tu sitio tiene que responderles en inglés, cargar rápido allá y aparecer cuando buscan en Google.",
      },
    ],
    includedTitle: "Lo que necesita tu sitio para vender en EE.UU.",
    included: [
      {
        title: "Inglés escrito para el comprador de allá",
        body: "Textos pensados para cómo busca y decide un cliente de EE.UU., no traducidos palabra por palabra del español.",
      },
      {
        title: "Rápido en Estados Unidos",
        body: "Hosting en AWS con CloudFront, que entrega tus páginas desde servidores cerca de tus clientes.",
      },
      {
        title: "Encontrable en Google de EE.UU.",
        body: "Títulos, datos estructurados, sitemap y Search Console configurados para búsquedas en inglés.",
      },
      {
        title: "Español también, sin perder nada",
        body: "Una versión real en español para tu mercado en Colombia o para hispanos en EE.UU., cada idioma con su propia página indexable.",
      },
      {
        title: "Atención en el horario de tus clientes",
        body: "Formularios que llegan a tu correo y, si lo quieres, un chatbot con IA que responde en inglés a cualquier hora y toma los datos del cliente.",
      },
      {
        title: "Confianza y accesibilidad",
        body: "Accesibilidad (WCAG) y señales de confianza como casos de éxito y reseñas, que el comprador de EE.UU. espera ver.",
      },
    ],
    platformsTitle: "Lo que hago para empresas colombianas",
    platformsIntro: "Cada servicio tiene su propia página con detalles, proyectos y preguntas frecuentes.",
    platforms: [
      {
        title: "Páginas web bilingües",
        body: "Sitios rápidos en inglés y español en Next.js, WordPress, Shopify, Wix o Base44.",
        href: "/services/web-design/",
      },
      {
        title: "Software a la medida",
        body: "Portales de clientes, sistemas de reservas y pagos, paneles y productos SaaS.",
        href: "/services/custom-software/",
      },
      {
        title: "AWS y Google Cloud",
        body: "Aplicaciones serverless, migraciones y hosting en la nube con los costos bajo control.",
        href: "/services/cloud-services/",
      },
      {
        title: "Automatización con IA",
        body: "Chatbots que atienden a tus clientes en inglés y español, seguimientos automáticos y contenido con IA.",
        href: "/services/ai-automation/",
      },
      {
        title: "Salesforce",
        body: "Service Cloud, Email-to-Case y portales de clientes para equipos de soporte.",
        href: "/services/salesforce/",
      },
    ],
    processTitle: "Cómo trabajamos a distancia",
    process: [
      {
        title: "Llamada gratis por video, en español",
        body: "Me cuentas de tu empresa, a quién le vendes en EE.UU. y qué necesitas. Sin costo y sin compromiso.",
      },
      {
        title: "Alcance y cotización por escrito",
        body: "Qué se construye, en qué orden y cuánto cuesta, antes de empezar.",
      },
      {
        title: "Avances que revisas en vivo",
        body: "Ves el sitio o la aplicación funcionando en un ambiente de pruebas y pides cambios antes de publicar.",
      },
      {
        title: "Lanzamiento",
        body: "Dominio, hosting, formularios, Search Console y Analytics configurados y probados.",
      },
      {
        title: "Soporte después",
        body: "Ajustes, mejoras y nuevas funciones del mismo ingeniero, por correo o videollamada.",
      },
    ],
    processNote:
      "Colombia va 2 horas adelante de Denver entre noviembre y marzo y 1 hora el resto del año, así que nuestras jornadas se cruzan casi por completo.",
    workTitle: "Proyectos para el mercado de EE.UU.",
    workSubtitle: "Construidos y funcionando en Estados Unidos, en inglés, en español o en los dos.",
    faqTitle: "Preguntas de empresas colombianas",
    faq: [
      {
        q: "¿Trabajas con empresas que están en Colombia?",
        a: "Sí. Trabajo a distancia, con videollamadas en español, documentos compartidos y versiones de prueba que revisas desde tu navegador. Vivo en Denver, Colorado, y me formé como ingeniero en Colombia.",
      },
      {
        q: "¿Cuál es la diferencia de horario con Denver?",
        a: "Colombia va 2 horas adelante de Denver entre noviembre y marzo, y 1 hora el resto del año, porque Colombia no cambia la hora y Denver sí. Las jornadas laborales se cruzan casi por completo.",
      },
      {
        q: "¿Por qué no traducir mi sitio actual al inglés?",
        a: "Porque el comprador de EE.UU. busca con otras palabras, compara distinto y espera ver otra información. Un sitio pensado para ese mercado, con textos escritos en inglés y SEO para las búsquedas de allá, funciona mejor que una traducción literal.",
      },
      {
        q: "¿Puedo tener el sitio en inglés y en español?",
        a: "Sí. Cada idioma tiene su propia página que Google puede indexar, con un selector de idioma en cada página. El sitio de cercas en Houston que construí funciona completo en los dos idiomas.",
      },
      {
        q: "¿Me ayudas a aparecer en Google en Estados Unidos?",
        a: "Sí. El sitio sale con lo técnico listo para Google y Bing en EE.UU., y puedo seguir con SEO: páginas por servicio y por ciudad, datos estructurados y seguimiento en Search Console. Nadie puede garantizar una posición, pero la parte técnica no te va a frenar.",
      },
      {
        q: "¿Cuánto cuesta?",
        a: "Depende del alcance: cuántas páginas e idiomas, y si necesitas software, IA o Salesforce. Después de una llamada gratis recibes una cotización por escrito antes de empezar.",
      },
    ],
  },
  en: {
    metaTitle: "Software & Websites for Colombian Companies Selling in the US",
    metaDescription:
      "Bilingual websites, custom software, AWS, AI and Salesforce for Colombian companies selling in the US, from a Colombia-trained engineer based in Denver.",
    breadcrumb: "Colombia",
    h1: "Websites and software for Colombian companies selling in the US",
    intro:
      "I help Colombian companies sell in the United States with English and Spanish websites written for US buyers, custom software, AWS, AI chatbots and Salesforce. I trained as an engineer in Colombia and work from Denver, Colorado: we can talk in Spanish, and I know how US customers search and buy.",
    whenTitle: "Who it's for",
    when: [
      {
        title: "Exporters and manufacturers",
        body: "Your product already sells abroad, but your website was made for Colombia. An English site with clear product pages, certifications and a distributor form puts you in front of US buyers.",
      },
      {
        title: "BPOs, contact centers and professional services",
        body: "You serve US clients, so your website, your support and your processes have to look and work like a US company's, including Salesforce to manage cases.",
      },
      {
        title: "Startups and software companies",
        body: "You're building a product for the US market and need it in production on AWS, with production and test environments from day one.",
      },
      {
        title: "Businesses with US customers",
        body: "Tourism, health, education or real estate: if your customers come from the United States, your site has to answer them in English, load fast there and show up when they search on Google.",
      },
    ],
    includedTitle: "What your website needs to sell in the US",
    included: [
      {
        title: "English written for US buyers",
        body: "Copy built around how US customers search and decide, not translated word for word from Spanish.",
      },
      {
        title: "Fast in the United States",
        body: "Hosting on AWS with CloudFront, which serves your pages from servers close to your customers.",
      },
      {
        title: "Findable on US Google",
        body: "Titles, structured data, a sitemap and Search Console set up for English searches.",
      },
      {
        title: "Spanish too, with nothing lost",
        body: "A real Spanish version for your market in Colombia or for Hispanics in the US, each language with its own indexable page.",
      },
      {
        title: "Reachable in your customers' hours",
        body: "Forms that reach your inbox and, if you want one, an AI chatbot that answers in English at any hour and takes the customer's details.",
      },
      {
        title: "Trust and accessibility",
        body: "Accessibility (WCAG) and trust signals like case studies and reviews, which US buyers expect to see.",
      },
    ],
    platformsTitle: "What I do for Colombian companies",
    platformsIntro: "Each service has its own page with details, projects and common questions.",
    platforms: [
      {
        title: "Bilingual websites",
        body: "Fast English and Spanish sites on Next.js, WordPress, Shopify, Wix or Base44.",
        href: "/services/web-design/",
      },
      {
        title: "Custom software",
        body: "Customer portals, booking and payment systems, dashboards and SaaS products.",
        href: "/services/custom-software/",
      },
      {
        title: "AWS & Google Cloud",
        body: "Serverless apps, migrations and cloud hosting with costs under control.",
        href: "/services/cloud-services/",
      },
      {
        title: "AI automation",
        body: "Chatbots that answer your customers in English and Spanish, automatic follow-ups and AI content.",
        href: "/services/ai-automation/",
      },
      {
        title: "Salesforce",
        body: "Service Cloud, Email-to-Case and customer portals for support teams.",
        href: "/services/salesforce/",
      },
    ],
    processTitle: "How we work remotely",
    process: [
      {
        title: "Free video call, in Spanish or English",
        body: "Tell me about your company, who you sell to in the US and what you need. No cost and no commitment.",
      },
      {
        title: "Written scope and estimate",
        body: "What gets built, in what order and what it costs, before work starts.",
      },
      {
        title: "Progress you review live",
        body: "You see the site or app working in a test environment and ask for changes before anything goes live.",
      },
      {
        title: "Launch",
        body: "Domain, hosting, forms, Search Console and Analytics set up and tested.",
      },
      {
        title: "Support afterwards",
        body: "Adjustments, improvements and new features from the same engineer, by email or video call.",
      },
    ],
    processNote:
      "Colombia is 2 hours ahead of Denver from November to March and 1 hour ahead the rest of the year, so our working days overlap almost completely.",
    workTitle: "Projects for the US market",
    workSubtitle: "Built and running in the United States, in English, Spanish or both.",
    faqTitle: "Questions from Colombian companies",
    faq: [
      {
        q: "Do you work with companies based in Colombia?",
        a: "Yes. I work remotely, with video calls in Spanish, shared documents and test versions you review in your browser. I live in Denver, Colorado, and trained as an engineer in Colombia.",
      },
      {
        q: "What is the time difference with Denver?",
        a: "Colombia is 2 hours ahead of Denver from November to March and 1 hour ahead the rest of the year, because Colombia doesn't change its clocks and Denver does. Working days overlap almost completely.",
      },
      {
        q: "Why not just translate my current site into English?",
        a: "Because US buyers search with different words, compare differently and expect different information. A site built for that market, with copy written in English and SEO for US searches, works better than a literal translation.",
      },
      {
        q: "Can my site be in English and Spanish?",
        a: "Yes. Each language gets its own page that Google can index, with a language switch on every page. The Houston fence site I built runs fully in both languages.",
      },
      {
        q: "Can you help me show up on Google in the United States?",
        a: "Yes. The site launches with the technical side ready for Google and Bing in the US, and I can continue with SEO: service and city pages, structured data and Search Console tracking. Nobody can guarantee a position, but the technical side won't hold you back.",
      },
      {
        q: "How much does it cost?",
        a: "It depends on the scope: how many pages and languages, and whether you need software, AI or Salesforce. After a free call you get a written estimate before any work starts.",
      },
    ],
  },
};
