// /colombia/ (EN) and /es/colombia/ (ES): software, websites and AI for
// businesses in Colombia, as clients. Diego set the focus on 16 Nov 2026:
// "vender para Colombia", not Colombian companies selling in the US. Work is
// remote, in Spanish, from Denver. Spanish is the main version; the English one
// exists so the language switch works.
//
// Same rules as services.ts: every claim must be true. Diego studied civil
// engineering in Colombia (Cvs fact bank), so the copy says he trained there,
// not his nationality. No prices or currency until he decides, no WhatsApp
// contact or Colombian payment gateways named until he confirms them.

import type { ServicePageCopy } from "./services";

// Mixed on purpose: business systems, AI and the no-code field app (closest to
// Colombian construction and inspection firms). All are live US projects.
export const COLOMBIA_PROJECTS = ["dynamic-bachata", "ai-agent", "ccc-field-app", "scoreflow"];

export const COLOMBIA_COPY: Record<"en" | "es", ServicePageCopy> = {
  es: {
    metaTitle: "Desarrollo de Software y Páginas Web en Colombia",
    metaDescription:
      "Software a la medida, páginas web, chatbots con IA, AWS y Salesforce para empresas en Colombia, con un ingeniero formado en Colombia que trabaja desde Denver.",
    breadcrumb: "Colombia",
    h1: "Desarrollo de software, páginas web e IA para empresas en Colombia",
    intro:
      "Construyo software a la medida, páginas web, chatbots con IA y sistemas en la nube para empresas en Colombia, con los mismos estándares que uso con mis clientes en Estados Unidos. Me formé como ingeniero en Colombia y trabajo desde Denver, Colorado: todo el proceso es en español y por videollamada, con empresas de Bogotá, Medellín, Cali, Barranquilla o cualquier ciudad del país.",
    whenTitle: "Cuándo te sirve",
    when: [
      {
        title: "Tu operación vive en Excel y WhatsApp",
        body: "Pedidos, inventario, citas o cobros repartidos entre hojas de cálculo, chats y papel. Una aplicación a la medida pone todo en un solo lugar, evita errores y te ahorra horas cada semana.",
      },
      {
        title: "Inspecciones y reportes en papel",
        body: "Constructoras, interventorías, inmobiliarias y equipos de mantenimiento que llenan formatos a mano. Construí una app de inspección que reemplazó el papel en más de 100 propiedades y genera los reportes en PDF automáticamente.",
      },
      {
        title: "Tu página web no te trae clientes",
        body: "O todavía no tienes página. Un sitio rápido en el celular, con un formulario claro y bien configurado para Google, convierte visitas en solicitudes.",
      },
      {
        title: "Respondes lo mismo todo el día",
        body: "Precios, horarios, disponibilidad. Un chatbot con IA que conoce tu negocio responde al instante, a cualquier hora, y te pasa los clientes interesados.",
      },
    ],
    includedTitle: "Qué recibes",
    included: [
      {
        title: "Alcance y cotización por escrito",
        body: "Antes de empezar sabes qué se construye, en qué orden y cuánto cuesta.",
      },
      {
        title: "Funciona en celular y computador",
        body: "Aplicaciones y páginas pensadas primero para el celular, que es donde están tus clientes y tu equipo.",
      },
      {
        title: "Conectado con lo que ya usas",
        body: "Integraciones con tus pasarelas de pago, correo, hojas de cálculo y CRM, para que nadie tenga que copiar datos a mano.",
      },
      {
        title: "Seguro y en la nube",
        body: "Hosting en AWS o Google Cloud, claves fuera del código, un ambiente de pruebas separado de producción e inicio de sesión con roles.",
      },
      {
        title: "Todo en español",
        body: "Reuniones, documentos, capacitación y soporte en español, en un horario que se cruza casi por completo con el tuyo.",
      },
      {
        title: "Soporte después del lanzamiento",
        body: "Arreglos, mejoras y nuevas funciones del mismo ingeniero que lo construyó.",
      },
    ],
    platformsTitle: "Lo que hago para empresas en Colombia",
    platformsIntro: "Cada servicio tiene su propia página con detalles, proyectos y preguntas frecuentes.",
    platforms: [
      {
        title: "Software a la medida",
        body: "Aplicaciones web, portales de clientes, sistemas de reservas y pagos, paneles y productos SaaS.",
        href: "/services/custom-software/",
      },
      {
        title: "Páginas web",
        body: "Sitios rápidos en Next.js, WordPress, Shopify, Wix o Base44, en español, inglés o ambos.",
        href: "/services/web-design/",
      },
      {
        title: "Automatización con IA",
        body: "Chatbots que responden con la información de tu negocio, seguimientos automáticos y contenido con IA.",
        href: "/services/ai-automation/",
      },
      {
        title: "AWS y Google Cloud",
        body: "Aplicaciones serverless, migraciones a la nube y costos bajo control.",
        href: "/services/cloud-services/",
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
        title: "Llamada gratis por videollamada",
        body: "Me cuentas de tu empresa y del problema que quieres resolver. Sin costo y sin compromiso.",
      },
      {
        title: "Alcance y cotización por escrito",
        body: "Qué se construye, en qué orden y cuánto cuesta, antes de empezar.",
      },
      {
        title: "Una primera versión que puedes probar",
        body: "Ves la aplicación o la página funcionando en un ambiente de pruebas y pides cambios antes de publicar.",
      },
      {
        title: "Lanzamiento",
        body: "Dominio, hosting, formularios y analítica configurados y probados, y tu equipo preparado para usarlo.",
      },
      {
        title: "Soporte después",
        body: "Ajustes, mejoras y nuevas funciones por correo o videollamada.",
      },
    ],
    processNote:
      "Colombia va 2 horas adelante de Denver entre noviembre y marzo y 1 hora el resto del año, así que nuestras jornadas se cruzan casi por completo.",
    workTitle: "Proyectos en producción",
    workSubtitle: "Sistemas que funcionan hoy con usuarios, pagos e IA reales.",
    faqTitle: "Preguntas de empresas en Colombia",
    faq: [
      {
        q: "¿Trabajas con empresas en Colombia aunque vivas en Denver?",
        a: "Sí. Trabajo a distancia con empresas de cualquier ciudad del país, con videollamadas en español, documentos compartidos y versiones de prueba que revisas desde tu navegador. Me formé como ingeniero en Colombia y vivo en Denver, Colorado.",
      },
      {
        q: "¿Cuál es la diferencia de horario?",
        a: "Colombia va 2 horas adelante de Denver entre noviembre y marzo, y 1 hora el resto del año, porque Colombia no cambia la hora y Denver sí. Las jornadas laborales se cruzan casi por completo.",
      },
      {
        q: "¿Cuánto cuesta un software a la medida o una página web?",
        a: "Depende del alcance: cuántas pantallas o páginas, qué integraciones y cuánto tiene que funcionar desde el primer día. Después de una llamada gratis recibes una cotización por escrito antes de empezar.",
      },
      {
        q: "¿Puedo empezar con algo pequeño?",
        a: "Sí. Puedes empezar con una página, una automatización o una primera versión de la aplicación, y crecer por fases cuando veas resultados.",
      },
      {
        q: "¿Qué gano trabajando con un ingeniero que trabaja en Estados Unidos?",
        a: "Los mismos estándares que uso con mis clientes allá: ambientes de pruebas y de producción separados, seguridad desde el inicio y experiencia real con pagos, nube e IA en producción. La plataforma que construí para un estudio de baile, por ejemplo, ha procesado $51K en 864 transacciones.",
      },
      {
        q: "¿Mi página va a aparecer en Google en Colombia?",
        a: "Va a estar construida para que la encuentren: páginas indexables, títulos y descripciones, datos estructurados y un sitemap enviado a Google Search Console. El posicionamiento toma semanas y nadie puede garantizar un lugar, pero la parte técnica no te va a frenar.",
      },
    ],
  },
  en: {
    metaTitle: "Software Development & Websites in Colombia",
    metaDescription:
      "Custom software, websites, AI chatbots, AWS and Salesforce for businesses in Colombia, from a Colombia-trained engineer working from Denver.",
    breadcrumb: "Colombia",
    h1: "Software development, websites and AI for businesses in Colombia",
    intro:
      "I build custom software, websites, AI chatbots and cloud systems for businesses in Colombia, to the same standards I use with my clients in the United States. I trained as an engineer in Colombia and work from Denver, Colorado: the whole process runs in Spanish over video calls, with companies in Bogotá, Medellín, Cali, Barranquilla or anywhere else in the country.",
    whenTitle: "When it helps",
    when: [
      {
        title: "Your operation runs on Excel and WhatsApp",
        body: "Orders, inventory, appointments or payments spread across spreadsheets, chats and paper. A custom app puts everything in one place, stops mistakes and saves hours every week.",
      },
      {
        title: "Inspections and reports on paper",
        body: "Construction firms, inspectors, property managers and maintenance teams filling in forms by hand. I built an inspection app that replaced paper across 100+ properties and generates the PDF reports automatically.",
      },
      {
        title: "Your website doesn't bring in customers",
        body: "Or you don't have one yet. A site that's fast on phones, with a clear form and set up properly for Google, turns visits into requests.",
      },
      {
        title: "You answer the same questions all day",
        body: "Prices, hours, availability. An AI chatbot that knows your business answers instantly, at any hour, and passes interested customers to you.",
      },
    ],
    includedTitle: "What you get",
    included: [
      {
        title: "Written scope and estimate",
        body: "Before work starts you know what gets built, in what order and what it costs.",
      },
      {
        title: "Works on phones and computers",
        body: "Apps and sites designed for phones first, which is where your customers and your team are.",
      },
      {
        title: "Connected to what you already use",
        body: "Integrations with your payment gateways, email, spreadsheets and CRM, so nobody copies data by hand.",
      },
      {
        title: "Secure and in the cloud",
        body: "Hosting on AWS or Google Cloud, keys kept out of the code, a test environment separate from production and role-based sign-in.",
      },
      {
        title: "All in Spanish",
        body: "Meetings, documents, training and support in Spanish, in working hours that overlap almost completely with yours.",
      },
      {
        title: "Support after launch",
        body: "Fixes, improvements and new features from the same engineer who built it.",
      },
    ],
    platformsTitle: "What I do for businesses in Colombia",
    platformsIntro: "Each service has its own page with details, projects and common questions.",
    platforms: [
      {
        title: "Custom software",
        body: "Web apps, customer portals, booking and payment systems, dashboards and SaaS products.",
        href: "/services/custom-software/",
      },
      {
        title: "Websites",
        body: "Fast sites on Next.js, WordPress, Shopify, Wix or Base44, in Spanish, English or both.",
        href: "/services/web-design/",
      },
      {
        title: "AI automation",
        body: "Chatbots that answer from your business's own information, automatic follow-ups and AI content.",
        href: "/services/ai-automation/",
      },
      {
        title: "AWS & Google Cloud",
        body: "Serverless apps, cloud migrations and costs under control.",
        href: "/services/cloud-services/",
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
        title: "Free video call",
        body: "Tell me about your company and the problem you want to solve. No cost and no commitment.",
      },
      {
        title: "Written scope and estimate",
        body: "What gets built, in what order and what it costs, before work starts.",
      },
      {
        title: "A first version you can try",
        body: "You see the app or site working in a test environment and ask for changes before anything goes live.",
      },
      {
        title: "Launch",
        body: "Domain, hosting, forms and analytics set up and tested, and your team ready to use it.",
      },
      {
        title: "Support afterwards",
        body: "Adjustments, improvements and new features by email or video call.",
      },
    ],
    processNote:
      "Colombia is 2 hours ahead of Denver from November to March and 1 hour ahead the rest of the year, so our working days overlap almost completely.",
    workTitle: "Projects in production",
    workSubtitle: "Systems running today with real users, payments and AI.",
    faqTitle: "Questions from businesses in Colombia",
    faq: [
      {
        q: "Do you work with companies in Colombia even though you live in Denver?",
        a: "Yes. I work remotely with companies anywhere in the country, with video calls in Spanish, shared documents and test versions you review in your browser. I trained as an engineer in Colombia and live in Denver, Colorado.",
      },
      {
        q: "What is the time difference?",
        a: "Colombia is 2 hours ahead of Denver from November to March and 1 hour ahead the rest of the year, because Colombia doesn't change its clocks and Denver does. Working days overlap almost completely.",
      },
      {
        q: "How much does custom software or a website cost?",
        a: "It depends on the scope: how many screens or pages, which integrations and how much has to work on day one. After a free call you get a written estimate before any work starts.",
      },
      {
        q: "Can I start with something small?",
        a: "Yes. You can start with a website, one automation or a first version of the app, and grow in phases once you see results.",
      },
      {
        q: "What do I gain from an engineer who works in the United States?",
        a: "The same standards I use with clients there: separate test and production environments, security from the start and real experience with payments, cloud and AI in production. The platform I built for a dance studio, for example, has processed $51K across 864 transactions.",
      },
      {
        q: "Will my website show up on Google in Colombia?",
        a: "It will be built to be found: indexable pages, titles and descriptions, structured data and a sitemap submitted to Google Search Console. Rankings take weeks and nobody can honestly guarantee a position, but the technical side won't hold you back.",
      },
    ],
  },
};
