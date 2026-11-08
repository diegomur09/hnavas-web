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
  {
    slug: "custom-software",
    serviceId: "fullstack",
    serviceType: "Custom software & web application development",
    projects: ["scoreflow", "dynamic-bachata", "sky-weekender", "email-campaigns"],
    en: {
      metaTitle: "Custom Software Development in Denver",
      metaDescription:
        "Custom web apps, customer portals, booking and payment systems and SaaS MVPs for Denver businesses, built with Next.js, Python and AWS, in English or Spanish.",
      breadcrumb: "Custom software",
      h1: "Custom software & web app development in Denver",
      intro:
        "I build custom web apps for Denver businesses: customer portals, booking and payment systems, dashboards, internal tools and SaaS products, from the first version to production. You work directly with the engineer who designs, builds and runs it, in English or Spanish.",
      whenTitle: "When custom software is worth it",
      when: [
        {
          title: "Your team runs on spreadsheets and copy-paste",
          body: "Orders, schedules or reports live in spreadsheets, paper and email threads. One app with all the data in one place saves hours every week and stops mistakes.",
        },
        {
          title: "Off-the-shelf software almost fits",
          body: "You pay per user, use a fraction of it and still work around what it can't do. Custom software follows your process. For a dance studio I replaced a paid email tool with a campaign app the studio owns.",
        },
        {
          title: "Customers need to book, pay or log in",
          body: "Online booking, payments, memberships and customer accounts that work the way your business does. The platform I built for a dance studio has processed $51K across 864 transactions.",
        },
        {
          title: "You have an idea for a SaaS product",
          body: "Start with a focused first version that real users can try, then grow it. ScoreFlow, a real-time judging platform I built, ran a live competition with 21 competitors and 9 judges.",
        },
      ],
      includedTitle: "What's included in a custom software project",
      included: [
        {
          title: "Scope before code",
          body: "A written plan of the screens, data and user roles, so you know what you get and what it costs before work starts.",
        },
        {
          title: "A web app for any device",
          body: "A fast app built with Next.js, React and TypeScript that works on phones, tablets and desktops, with no app store in the way.",
        },
        {
          title: "Backend, database and logins",
          body: "APIs in Node.js or Python, a database designed around your data, and secure sign-in with roles for staff, customers or admins.",
        },
        {
          title: "Payments and integrations",
          body: "Stripe or Square checkout, subscriptions and webhooks, plus email, calendars and the tools you already use.",
        },
        {
          title: "Production and test environments",
          body: "A separate QA copy to try every change before it reaches your users, with automatic deploys on every update.",
        },
        {
          title: "Support after launch",
          body: "Monitoring, fixes and new features from the same engineer who built it.",
        },
      ],
      platformsTitle: "Fully custom, low-code or connect what you have?",
      platformsIntro:
        "Not every problem needs a fully custom app. I recommend the simplest option that solves it and can grow with you.",
      platforms: [
        {
          title: "Fully custom",
          body: "Next.js, Node.js or Python on AWS or Google Cloud. Best for products, portals and anything with real-time features, payments or many users.",
        },
        {
          title: "Low-code (Base44, AppSheet)",
          body: "A working app in days when budget or time is tight, like the AppSheet inspection app I built that replaced paper across 100+ properties.",
        },
        {
          title: "Connect your current tools",
          body: "Sometimes the answer is connecting what you already pay for, with automations between your forms, CRM, payments and email.",
        },
      ],
      processTitle: "How a custom software project works",
      process: [
        {
          title: "Free first call",
          body: "You explain the process or the idea; I ask about the users, the data and what has to happen first. No cost and no commitment.",
        },
        {
          title: "Written scope and estimate",
          body: "Screens, data, roles and phases on paper, with an estimate for the first phase.",
        },
        {
          title: "First working version",
          body: "You get a working version early in a test environment, not a slide deck, and try it with your team.",
        },
        {
          title: "Build in short cycles",
          body: "New features arrive in small steps you review, so the app stays close to what your team actually needs.",
        },
        {
          title: "Launch and support",
          body: "Go-live with monitoring, then fixes and new features as your business grows.",
        },
      ],
      processNote: "Larger products ship in phases, so you use working software early.",
      workTitle: "Custom software I've built",
      workSubtitle: "Platforms running in production with real users and payments.",
      faqTitle: "Custom software questions",
      faq: [
        {
          q: "How much does custom software cost?",
          a: "It depends on the number of screens, user roles and integrations, and on how much has to work on day one. A focused internal tool is a smaller project; a SaaS product with payments and real-time features is larger and built in phases. After a free call you get a written scope and estimate before any work starts.",
        },
        {
          q: "How long does it take to build a web app?",
          a: "The first version is kept small on purpose so you can use it early. Bigger products ship in phases, so your team works with real software while the rest is built.",
        },
        {
          q: "Do you build SaaS MVPs for startups?",
          a: "Yes. I build the smallest version that proves the idea with real users: sign-up, the core feature and payments if needed, on infrastructure that can grow. ScoreFlow, a judging platform I built, ran a live event with 135 scores cast in real time.",
        },
        {
          q: "Can you take over or fix an existing app?",
          a: "Yes. I start with a review of the code, the hosting and the data, and fix what is urgent before adding features. In one live system I fixed a payment bug that gave customers two packages for a single charge, and cleaned up the affected records.",
        },
        {
          q: "What technology do you use?",
          a: "Usually Next.js, React and TypeScript for the app, Node.js or Python (FastAPI) for the backend, AWS or Google Cloud for hosting, and Stripe or Square for payments. The choice follows your needs, your team and your budget.",
        },
        {
          q: "Do you support the app after launch?",
          a: "Yes. Monitoring, fixes, security updates and new features, from the same engineer who built it, so you never have to explain your system to a stranger.",
        },
      ],
    },
    es: {
      metaTitle: "Desarrollo de Software a la Medida en Denver",
      metaDescription:
        "Aplicaciones web a la medida, portales de clientes, reservas, pagos y MVPs de SaaS para negocios de Denver, con Next.js, Python y AWS, en inglés o español.",
      breadcrumb: "Software a la medida",
      h1: "Desarrollo de software y aplicaciones web a la medida en Denver",
      intro:
        "Construyo aplicaciones web a la medida para negocios de Denver: portales de clientes, sistemas de reservas y pagos, paneles, herramientas internas y productos SaaS, desde la primera versión hasta producción. Trabajas directamente con el ingeniero que lo diseña, lo construye y lo mantiene, en inglés o en español.",
      whenTitle: "Cuándo vale la pena el software a la medida",
      when: [
        {
          title: "Tu equipo vive en hojas de cálculo y copiar y pegar",
          body: "Pedidos, horarios o reportes repartidos entre hojas de cálculo, papel y cadenas de correo. Una sola aplicación con todos los datos en un lugar ahorra horas cada semana y evita errores.",
        },
        {
          title: "El software que compraste casi sirve",
          body: "Pagas por usuario, usas una parte y aun así trabajas alrededor de lo que no hace. El software a la medida sigue tu proceso. Para un estudio de baile reemplacé una herramienta de correo pagada por una aplicación de campañas propia.",
        },
        {
          title: "Tus clientes necesitan reservar, pagar o entrar con su cuenta",
          body: "Reservas en línea, pagos, membresías y cuentas de cliente que funcionan como tu negocio. La plataforma que construí para un estudio de baile ha procesado $51K en 864 transacciones.",
        },
        {
          title: "Tienes la idea de un producto SaaS",
          body: "Empieza con una primera versión enfocada que usuarios reales puedan probar, y luego hazla crecer. ScoreFlow, una plataforma de jueceo en tiempo real que construí, corrió una competencia en vivo con 21 competidores y 9 jueces.",
        },
      ],
      includedTitle: "Qué incluye un proyecto de software a la medida",
      included: [
        {
          title: "El alcance antes del código",
          body: "Un plan por escrito de pantallas, datos y roles de usuario, para que sepas qué recibes y cuánto cuesta antes de empezar.",
        },
        {
          title: "Una aplicación web para cualquier equipo",
          body: "Una aplicación rápida hecha con Next.js, React y TypeScript que funciona en celular, tableta y computadora, sin pasar por tiendas de apps.",
        },
        {
          title: "Backend, base de datos e inicio de sesión",
          body: "APIs en Node.js o Python, una base de datos pensada para tus datos e inicio de sesión seguro con roles para empleados, clientes o administradores.",
        },
        {
          title: "Pagos e integraciones",
          body: "Cobros con Stripe o Square, suscripciones y webhooks, además de correo, calendarios y las herramientas que ya usas.",
        },
        {
          title: "Ambiente de producción y de pruebas",
          body: "Una copia de pruebas (QA) para revisar cada cambio antes de que llegue a tus usuarios, con publicación automática en cada actualización.",
        },
        {
          title: "Soporte después del lanzamiento",
          body: "Monitoreo, arreglos y nuevas funciones del mismo ingeniero que lo construyó.",
        },
      ],
      platformsTitle: "¿Totalmente a la medida, low-code o conectar lo que ya tienes?",
      platformsIntro:
        "No todos los problemas necesitan una aplicación totalmente a la medida. Te recomiendo la opción más sencilla que lo resuelva y que pueda crecer contigo.",
      platforms: [
        {
          title: "Totalmente a la medida",
          body: "Next.js, Node.js o Python en AWS o Google Cloud. Lo mejor para productos, portales y todo lo que tenga funciones en tiempo real, pagos o muchos usuarios.",
        },
        {
          title: "Low-code (Base44, AppSheet)",
          body: "Una aplicación funcionando en días cuando el presupuesto o el tiempo son cortos, como la app de inspecciones en AppSheet que construí y que reemplazó el papel en más de 100 propiedades.",
        },
        {
          title: "Conectar tus herramientas actuales",
          body: "A veces la respuesta es conectar lo que ya pagas, con automatizaciones entre tus formularios, CRM, pagos y correo.",
        },
      ],
      processTitle: "Cómo funciona un proyecto de software a la medida",
      process: [
        {
          title: "Primera llamada gratis",
          body: "Me cuentas el proceso o la idea, y yo te pregunto por los usuarios, los datos y lo que tiene que pasar primero. Sin costo y sin compromiso.",
        },
        {
          title: "Alcance y cotización por escrito",
          body: "Pantallas, datos, roles y fases por escrito, con una cotización para la primera fase.",
        },
        {
          title: "Primera versión funcionando",
          body: "Recibes pronto una versión que funciona en un ambiente de pruebas, no una presentación, y la pruebas con tu equipo.",
        },
        {
          title: "Construcción en ciclos cortos",
          body: "Las nuevas funciones llegan en pasos pequeños que tú revisas, para que la aplicación siga cerca de lo que tu equipo necesita.",
        },
        {
          title: "Lanzamiento y soporte",
          body: "Salida en vivo con monitoreo, y luego arreglos y nuevas funciones a medida que tu negocio crece.",
        },
      ],
      processNote: "Los productos grandes se entregan por fases, para que uses software funcionando desde temprano.",
      workTitle: "Software a la medida que he construido",
      workSubtitle: "Plataformas en producción con usuarios y pagos reales.",
      faqTitle: "Preguntas sobre software a la medida",
      faq: [
        {
          q: "¿Cuánto cuesta el software a la medida?",
          a: "Depende de la cantidad de pantallas, roles de usuario e integraciones, y de cuánto tiene que funcionar desde el primer día. Una herramienta interna enfocada es un proyecto pequeño; un producto SaaS con pagos y funciones en tiempo real es más grande y se construye por fases. Después de una llamada gratis recibes un alcance y una cotización por escrito antes de empezar.",
        },
        {
          q: "¿Cuánto tiempo toma construir una aplicación web?",
          a: "La primera versión se mantiene pequeña a propósito para que la uses pronto. Los productos más grandes se entregan por fases, así tu equipo trabaja con software real mientras se construye el resto.",
        },
        {
          q: "¿Construyes MVPs de SaaS para startups?",
          a: "Sí. Construyo la versión más pequeña que prueba la idea con usuarios reales: registro, la función principal y pagos si hacen falta, sobre una infraestructura que puede crecer. ScoreFlow, una plataforma de jueceo que construí, corrió un evento en vivo con 135 calificaciones registradas en tiempo real.",
        },
        {
          q: "¿Puedes hacerte cargo de una aplicación existente o arreglarla?",
          a: "Sí. Empiezo revisando el código, el hosting y los datos, y arreglo lo urgente antes de agregar funciones. En un sistema en producción arreglé un error de pagos que les daba a los clientes dos paquetes por un solo cobro, y limpié los registros afectados.",
        },
        {
          q: "¿Qué tecnología usas?",
          a: "Normalmente Next.js, React y TypeScript para la aplicación, Node.js o Python (FastAPI) para el backend, AWS o Google Cloud para el hosting, y Stripe o Square para los pagos. La elección depende de tus necesidades, tu equipo y tu presupuesto.",
        },
        {
          q: "¿Das soporte después del lanzamiento?",
          a: "Sí. Monitoreo, arreglos, actualizaciones de seguridad y nuevas funciones, del mismo ingeniero que lo construyó, para que nunca tengas que explicarle tu sistema a un desconocido.",
        },
      ],
    },
  },
  {
    // Slug matches the "cloud services {city}" queries GSC already shows.
    slug: "cloud-services",
    serviceId: "cloud",
    serviceType: "Cloud architecture & consulting (AWS, Google Cloud)",
    projects: ["scoreflow", "dynamic-bachata", "fence-houston", "sky-weekender"],
    en: {
      metaTitle: "AWS & Google Cloud Services in Denver",
      metaDescription:
        "AWS and Google Cloud architecture, migrations, serverless apps and cost reviews for Denver businesses, with 60+ Lambda functions built across production and QA.",
      breadcrumb: "Cloud services",
      h1: "AWS & Google Cloud services in Denver",
      intro:
        "I design, build and run cloud systems on AWS and Google Cloud for Denver businesses: serverless apps, migrations off old servers, secure hosting and cloud bills under control. The systems I run today include 60+ Lambda functions and 40 database tables across production and QA.",
      whenTitle: "When it's time to get help with the cloud",
      when: [
        {
          title: "Your cloud bill keeps growing",
          body: "Nobody is sure what each service costs or why. A review finds idle resources and oversized setups, and serverless designs cost little when traffic is low.",
        },
        {
          title: "Your app is slow or goes down",
          body: "Traffic spikes, a single server or manual fixes at midnight. A serverless or managed setup scales on its own and alerts you before customers notice.",
        },
        {
          title: "You're still on an old server or shared hosting",
          body: "A move to AWS or Google Cloud is planned and tested in a copy first, so the switch is quick and can be rolled back.",
        },
        {
          title: "Deploys are manual and risky",
          body: "Changes go straight to production by hand. Infrastructure as code, a QA environment and automatic deploys make every update repeatable.",
        },
      ],
      includedTitle: "What's included in a cloud project",
      included: [
        {
          title: "Architecture review",
          body: "A written review of your current setup: costs, risks, security and what to change first.",
        },
        {
          title: "Serverless apps and APIs",
          body: "Lambda, API Gateway and DynamoDB on AWS, or Cloud Run on Google Cloud, so you pay for use instead of idle servers.",
        },
        {
          title: "Fast, secure hosting",
          body: "Websites and apps on S3 and CloudFront with HTTPS, caching and redirects handled at the edge.",
        },
        {
          title: "Logins, email and files",
          body: "User sign-in with Cognito, transactional email with SES and file storage set up correctly from day one.",
        },
        {
          title: "Infrastructure as code",
          body: "Everything defined with AWS CDK or CloudFormation, so environments can be rebuilt and reviewed instead of clicked together by hand.",
        },
        {
          title: "Monitoring and alerts",
          body: "CloudWatch alarms and logs, so problems surface before customers report them.",
        },
      ],
      platformsTitle: "AWS, Google Cloud or managed hosting?",
      platformsIntro:
        "I pick the platform that fits your team, your current tools and your budget, not the one with the most features.",
      platforms: [
        {
          title: "AWS",
          body: "Where most of my production work runs: serverless apps, APIs, real-time WebSockets and static sites on CloudFront. Best for custom apps that need to scale.",
        },
        {
          title: "Google Cloud",
          body: "A natural fit when your team already works in Google Workspace or wants Google's AI models like Gemini, with Cloud Run for apps and AppSheet for no-code tools.",
        },
        {
          title: "Managed hosting (Vercel, Amplify)",
          body: "For simpler sites and front ends that don't need their own cloud architecture: quick deploys and little to maintain.",
        },
      ],
      processTitle: "How a cloud project works",
      process: [
        {
          title: "Free first call",
          body: "We look at what you run today, what it costs and what is causing trouble.",
        },
        {
          title: "Review and plan",
          body: "A written plan with the target architecture, the migration steps, the expected monthly cost and an estimate for the work.",
        },
        {
          title: "Build in a test environment",
          body: "Everything is built and tested in a separate QA environment before it touches production.",
        },
        {
          title: "Switch over",
          body: "A planned cut-over with a way back, timed to stay out of your busy hours.",
        },
        {
          title: "Monitor and hand over",
          body: "Alarms, documentation and access handed over to you, plus ongoing support if you want it.",
        },
      ],
      workTitle: "Cloud systems I've built",
      workSubtitle: "Serverless platforms running on AWS today.",
      faqTitle: "Cloud services questions",
      faq: [
        {
          q: "What does a cloud consultant do for a small business?",
          a: "Helps you choose where your website, apps and data run, sets them up securely and keeps the monthly bill under control. For most small businesses that means fewer surprises: no server to patch, automatic scaling and alerts when something breaks.",
        },
        {
          q: "Is serverless cheaper than a regular server?",
          a: "Usually, for business apps with uneven traffic, because you pay per request instead of for an idle machine. For steady, heavy workloads a server can cost less. I compare both with your real numbers before recommending one.",
        },
        {
          q: "AWS or Google Cloud: which is better?",
          a: "Neither wins for everyone. AWS has the widest range of services and is where most of my production systems run; Google Cloud fits teams already on Google Workspace or using Gemini. I recommend one based on your team, your tools and your budget.",
        },
        {
          q: "Can you migrate my website or app to AWS?",
          a: "Yes. I copy and test everything in a separate environment first, then switch over with a way back if anything looks wrong, and redirect old addresses so you keep your search traffic.",
        },
        {
          q: "How do you keep a cloud setup secure?",
          a: "API keys and secrets stay on the server, each part gets only the permissions it needs, production and test environments are kept apart, and sign-in uses managed services like Cognito instead of home-made logins.",
        },
        {
          q: "Do you offer ongoing cloud support?",
          a: "Yes. Monitoring, cost reviews, updates and new features, from the same engineer who built the system.",
        },
      ],
    },
    es: {
      metaTitle: "Servicios de AWS y Google Cloud en Denver",
      metaDescription:
        "Arquitectura, migraciones, apps serverless y control de costos en AWS y Google Cloud para negocios de Denver, con más de 60 funciones Lambda en producción y QA.",
      breadcrumb: "Servicios en la nube",
      h1: "Servicios de AWS y Google Cloud en Denver",
      intro:
        "Diseño, construyo y mantengo sistemas en la nube con AWS y Google Cloud para negocios de Denver: aplicaciones serverless, migraciones desde servidores viejos, hosting seguro y facturas de la nube bajo control. Los sistemas que manejo hoy suman más de 60 funciones Lambda y 40 tablas de base de datos entre producción y QA.",
      whenTitle: "Cuándo es momento de pedir ayuda con la nube",
      when: [
        {
          title: "Tu factura de la nube no para de crecer",
          body: "Nadie sabe bien qué cuesta cada servicio ni por qué. Una revisión encuentra recursos sin uso y configuraciones sobredimensionadas, y los diseños serverless cuestan poco cuando hay poco tráfico.",
        },
        {
          title: "Tu aplicación es lenta o se cae",
          body: "Picos de tráfico, un solo servidor o arreglos a mano a medianoche. Una configuración serverless o administrada escala sola y te avisa antes de que lo noten tus clientes.",
        },
        {
          title: "Sigues en un servidor viejo o en hosting compartido",
          body: "La migración a AWS o Google Cloud se planea y se prueba primero en una copia, para que el cambio sea rápido y tenga vuelta atrás.",
        },
        {
          title: "Publicar cambios es manual y riesgoso",
          body: "Los cambios van directo a producción a mano. Infraestructura como código, un ambiente de QA y publicación automática hacen que cada actualización sea repetible.",
        },
      ],
      includedTitle: "Qué incluye un proyecto en la nube",
      included: [
        {
          title: "Revisión de arquitectura",
          body: "Una revisión por escrito de tu configuración actual: costos, riesgos, seguridad y qué cambiar primero.",
        },
        {
          title: "Aplicaciones y APIs serverless",
          body: "Lambda, API Gateway y DynamoDB en AWS, o Cloud Run en Google Cloud, para pagar por uso en vez de por servidores sin trabajo.",
        },
        {
          title: "Hosting rápido y seguro",
          body: "Sitios y aplicaciones en S3 y CloudFront con HTTPS, caché y redirecciones resueltas en el borde de la red.",
        },
        {
          title: "Inicio de sesión, correo y archivos",
          body: "Inicio de sesión con Cognito, correos automáticos con SES y almacenamiento de archivos bien configurados desde el primer día.",
        },
        {
          title: "Infraestructura como código",
          body: "Todo definido con AWS CDK o CloudFormation, para que los ambientes se puedan reconstruir y revisar en vez de armarse a mano con clics.",
        },
        {
          title: "Monitoreo y alertas",
          body: "Alarmas y registros en CloudWatch, para que los problemas aparezcan antes de que tus clientes los reporten.",
        },
      ],
      platformsTitle: "¿AWS, Google Cloud o hosting administrado?",
      platformsIntro:
        "Elijo la plataforma que va con tu equipo, tus herramientas actuales y tu presupuesto, no la que tiene más funciones.",
      platforms: [
        {
          title: "AWS",
          body: "Donde corre la mayor parte de mi trabajo en producción: aplicaciones serverless, APIs, WebSockets en tiempo real y sitios estáticos en CloudFront. Lo mejor para aplicaciones a la medida que necesitan escalar.",
        },
        {
          title: "Google Cloud",
          body: "Encaja bien cuando tu equipo ya trabaja en Google Workspace o quiere usar los modelos de IA de Google como Gemini, con Cloud Run para aplicaciones y AppSheet para herramientas sin código.",
        },
        {
          title: "Hosting administrado (Vercel, Amplify)",
          body: "Para sitios y front ends más sencillos que no necesitan su propia arquitectura en la nube: publicación rápida y poco mantenimiento.",
        },
      ],
      processTitle: "Cómo funciona un proyecto en la nube",
      process: [
        {
          title: "Primera llamada gratis",
          body: "Revisamos lo que usas hoy, cuánto cuesta y qué te está dando problemas.",
        },
        {
          title: "Revisión y plan",
          body: "Un plan por escrito con la arquitectura propuesta, los pasos de la migración, el costo mensual esperado y una cotización del trabajo.",
        },
        {
          title: "Construcción en un ambiente de pruebas",
          body: "Todo se construye y se prueba en un ambiente de QA separado antes de tocar producción.",
        },
        {
          title: "El cambio",
          body: "Un cambio planeado y con vuelta atrás, en un horario que no choque con tus horas de más trabajo.",
        },
        {
          title: "Monitoreo y entrega",
          body: "Alarmas, documentación y accesos en tus manos, y soporte continuo si lo quieres.",
        },
      ],
      workTitle: "Sistemas en la nube que he construido",
      workSubtitle: "Plataformas serverless que corren hoy en AWS.",
      faqTitle: "Preguntas sobre servicios en la nube",
      faq: [
        {
          q: "¿Qué hace un consultor de la nube por un negocio pequeño?",
          a: "Te ayuda a decidir dónde corren tu sitio, tus aplicaciones y tus datos, los configura de forma segura y mantiene la factura mensual bajo control. Para la mayoría de los negocios pequeños eso significa menos sorpresas: ningún servidor que parchar, escalado automático y alertas cuando algo falla.",
        },
        {
          q: "¿Serverless es más barato que un servidor normal?",
          a: "Por lo general sí, en aplicaciones de negocio con tráfico variable, porque pagas por solicitud y no por una máquina sin trabajo. Con cargas constantes y pesadas un servidor puede costar menos. Comparo las dos opciones con tus números reales antes de recomendar una.",
        },
        {
          q: "¿AWS o Google Cloud: cuál es mejor?",
          a: "Ninguna gana para todos. AWS tiene la mayor variedad de servicios y es donde corre la mayoría de mis sistemas en producción; Google Cloud encaja con equipos que ya usan Google Workspace o Gemini. Te recomiendo una según tu equipo, tus herramientas y tu presupuesto.",
        },
        {
          q: "¿Puedes migrar mi sitio o mi aplicación a AWS?",
          a: "Sí. Primero copio y pruebo todo en un ambiente separado, luego hago el cambio con vuelta atrás por si algo se ve mal, y redirijo las direcciones viejas para que no pierdas tráfico de búsqueda.",
        },
        {
          q: "¿Cómo mantienes segura una configuración en la nube?",
          a: "Las claves de API y los secretos se quedan en el servidor, cada parte tiene solo los permisos que necesita, producción y pruebas van separados, y el inicio de sesión usa servicios administrados como Cognito en vez de sistemas hechos en casa.",
        },
        {
          q: "¿Das soporte continuo en la nube?",
          a: "Sí. Monitoreo, revisión de costos, actualizaciones y nuevas funciones, del mismo ingeniero que construyó el sistema.",
        },
      ],
    },
  },
  {
    slug: "ai-automation",
    serviceId: "ai",
    serviceType: "AI automation & chatbot development",
    projects: ["ai-agent", "bachata-crm", "email-campaigns"],
    en: {
      metaTitle: "AI Automation & Chatbots in Denver",
      metaDescription:
        "AI chatbots that answer from your own data, automatic follow-ups and AI content for Denver businesses on Claude, ChatGPT or Gemini, in English or Spanish.",
      breadcrumb: "AI automation",
      h1: "AI automation & chatbots for businesses in Denver",
      intro:
        "I build AI tools that save your team hours: website chatbots that answer from your own information and capture leads, automatic follow-ups that win customers back, and workflows that move data between your tools. Built on Claude, ChatGPT or Gemini, in English, Spanish or both.",
      whenTitle: "When AI automation pays off",
      when: [
        {
          title: "You answer the same questions every day",
          body: "Prices, hours, availability, how it works. A chatbot that knows your business answers them instantly, day and night, and passes the real leads to you.",
        },
        {
          title: "Leads arrive when nobody can answer",
          body: "Many people shop in the evening and on weekends. An AI assistant replies right away, takes their details and shares your booking link.",
        },
        {
          title: "Customers go quiet and nobody follows up",
          body: "An automation can spot who stopped coming and send each one a personal message. I built this for a dance studio: a daily scan finds students inactive for 14 to 28 days and writes each of them an AI-personalized email.",
        },
        {
          title: "Your team copies data between tools",
          body: "Forms, spreadsheets, CRM and email that don't talk to each other. Automations move the data and keep everything in sync.",
        },
      ],
      includedTitle: "What I build with AI",
      included: [
        {
          title: "A website chatbot on your data",
          body: "An assistant that answers about your services, prices and policies in English and Spanish, from your own content (RAG) rather than the open internet.",
        },
        {
          title: "Lead capture and meeting requests",
          body: "The chatbot collects name, contact and need, emails the lead to you and shares your booking link.",
        },
        {
          title: "Automatic follow-ups",
          body: "Personalized emails written by AI for reminders, win-backs and lead nurturing, sent on a schedule.",
        },
        {
          title: "Workflow automation",
          body: "Connections between forms, CRM, spreadsheets, email and payments, so data moves without copy-paste.",
        },
        {
          title: "AI content for marketing",
          body: "Copy, images and short videos made with AI tools for ads, social posts and your website.",
        },
        {
          title: "Control and clear costs",
          body: "API keys stay on the server, and you can see what the AI answers and what it costs.",
        },
      ],
      platformsTitle: "Claude, ChatGPT or Gemini?",
      platformsIntro:
        "Each model has its strengths. I choose per task and keep your system ready to switch models later.",
      platforms: [
        {
          title: "Claude (Anthropic)",
          body: "Strong at writing and at following detailed instructions. I use it for personalized emails, like the win-back messages in the studio CRM.",
        },
        {
          title: "ChatGPT (OpenAI)",
          body: "Fast and inexpensive for chat and search over your content. The assistant on this site runs on OpenAI with RAG and tools.",
        },
        {
          title: "Gemini (Google)",
          body: "A good fit when your business already lives in Google Workspace and Google Cloud.",
        },
        {
          title: "AI images and video",
          body: "Images and short videos for ads and social media, made with current AI image and video models.",
        },
        {
          title: "Automation tools",
          body: "n8n, scheduled jobs on AWS EventBridge or Google Apps Script, depending on where your data already lives.",
        },
      ],
      processTitle: "How an AI project works",
      process: [
        {
          title: "Free first call",
          body: "We find the tasks that eat your team's time and pick the one where AI pays off first.",
        },
        {
          title: "Plan and estimate",
          body: "What the AI will do, which data it uses, what it must never do, and a written estimate.",
        },
        {
          title: "Build and test with your content",
          body: "You try it with real questions in a test version, and we adjust answers and tone before launch.",
        },
        {
          title: "Launch",
          body: "It goes live on your website, inbox or tools, with leads and alerts sent to you.",
        },
        {
          title: "Improve",
          body: "I review what it answers, add missing information and extend it to the next task.",
        },
      ],
      workTitle: "AI systems I've built",
      workSubtitle: "Running in production today, including the assistant on this site.",
      faqTitle: "AI automation questions",
      faq: [
        {
          q: "What can AI automate in a small business?",
          a: "The repetitive work around customers: answering common questions, capturing and qualifying leads, sending follow-ups and reminders, drafting emails and posts, and moving data between tools. The best first project is the task your team repeats most.",
        },
        {
          q: "Will an AI chatbot make things up?",
          a: "It is built to answer from your own information, using a technique called retrieval (RAG), and to pass the questions it can't answer to you. You test it with real questions before it goes live.",
        },
        {
          q: "Is my business data safe with AI?",
          a: "API keys stay on the server, never in your website code, and the AI only sees the content you choose to give it.",
        },
        {
          q: "Can the chatbot answer in Spanish?",
          a: "Yes. It can answer in English and Spanish and switch to each visitor's language. The assistant on this site does exactly that.",
        },
        {
          q: "Should I use ChatGPT, Claude or Gemini?",
          a: "It depends on the task. I use OpenAI for this site's assistant and Claude for personalized emails, and choose per project based on quality, speed and cost.",
        },
        {
          q: "How much does it cost to run an AI chatbot?",
          a: "There is the build, quoted after a free call, and the AI usage, which the provider bills per message. For most small business sites the usage cost is low, and I set it up so you can see it every month.",
        },
      ],
    },
    es: {
      metaTitle: "Automatización con IA y Chatbots en Denver",
      metaDescription:
        "Chatbots de IA que responden con los datos de tu negocio, seguimientos automáticos y contenido con IA para negocios de Denver, con Claude, ChatGPT o Gemini.",
      breadcrumb: "Automatización con IA",
      h1: "Automatización con IA y chatbots para negocios en Denver",
      intro:
        "Construyo herramientas de IA que le ahorran horas a tu equipo: chatbots para tu sitio que responden con tu propia información y capturan clientes potenciales, seguimientos automáticos que recuperan clientes y flujos que mueven datos entre tus herramientas. Con Claude, ChatGPT o Gemini, en inglés, español o ambos.",
      whenTitle: "Cuándo vale la pena automatizar con IA",
      when: [
        {
          title: "Respondes las mismas preguntas todos los días",
          body: "Precios, horarios, disponibilidad, cómo funciona. Un chatbot que conoce tu negocio las responde al instante, de día y de noche, y te pasa los clientes potenciales reales.",
        },
        {
          title: "Los clientes escriben cuando nadie puede contestar",
          body: "Mucha gente busca en la noche y los fines de semana. Un asistente de IA responde de inmediato, toma sus datos y comparte tu enlace para agendar.",
        },
        {
          title: "Los clientes se alejan y nadie les hace seguimiento",
          body: "Una automatización puede detectar quién dejó de venir y mandarle a cada uno un mensaje personal. Lo construí para un estudio de baile: una revisión diaria encuentra a los alumnos inactivos de 14 a 28 días y le escribe a cada uno un correo personalizado con IA.",
        },
        {
          title: "Tu equipo copia datos entre herramientas",
          body: "Formularios, hojas de cálculo, CRM y correo que no se hablan entre sí. Las automatizaciones mueven los datos y mantienen todo sincronizado.",
        },
      ],
      includedTitle: "Lo que construyo con IA",
      included: [
        {
          title: "Un chatbot para tu sitio con tus datos",
          body: "Un asistente que responde sobre tus servicios, precios y políticas en inglés y español, a partir de tu propio contenido (RAG) y no de internet en general.",
        },
        {
          title: "Clientes potenciales y solicitudes de reunión",
          body: "El chatbot toma nombre, contacto y necesidad, te manda el cliente potencial por correo y comparte tu enlace para agendar.",
        },
        {
          title: "Seguimientos automáticos",
          body: "Correos personalizados escritos con IA para recordatorios, recuperar clientes y dar seguimiento a prospectos, enviados en horario programado.",
        },
        {
          title: "Automatización de procesos",
          body: "Conexiones entre formularios, CRM, hojas de cálculo, correo y pagos, para que los datos se muevan sin copiar y pegar.",
        },
        {
          title: "Contenido con IA para marketing",
          body: "Textos, imágenes y videos cortos hechos con herramientas de IA para anuncios, redes sociales y tu sitio.",
        },
        {
          title: "Control y costos claros",
          body: "Las claves de API se quedan en el servidor, y puedes ver qué responde la IA y cuánto cuesta.",
        },
      ],
      platformsTitle: "¿Claude, ChatGPT o Gemini?",
      platformsIntro:
        "Cada modelo tiene sus fortalezas. Elijo según la tarea y dejo tu sistema listo para cambiar de modelo más adelante.",
      platforms: [
        {
          title: "Claude (Anthropic)",
          body: "Muy bueno para redactar y seguir instrucciones detalladas. Lo uso para correos personalizados, como los mensajes para recuperar alumnos del CRM del estudio.",
        },
        {
          title: "ChatGPT (OpenAI)",
          body: "Rápido y económico para chat y búsqueda en tu contenido. El asistente de este sitio funciona con OpenAI, RAG y herramientas.",
        },
        {
          title: "Gemini (Google)",
          body: "Encaja bien cuando tu negocio ya vive en Google Workspace y Google Cloud.",
        },
        {
          title: "Imágenes y video con IA",
          body: "Imágenes y videos cortos para anuncios y redes sociales, hechos con modelos actuales de imagen y video con IA.",
        },
        {
          title: "Herramientas de automatización",
          body: "n8n, tareas programadas con AWS EventBridge o Google Apps Script, según dónde estén tus datos.",
        },
      ],
      processTitle: "Cómo funciona un proyecto de IA",
      process: [
        {
          title: "Primera llamada gratis",
          body: "Buscamos las tareas que más tiempo le quitan a tu equipo y elegimos la primera donde la IA vale la pena.",
        },
        {
          title: "Plan y cotización",
          body: "Qué va a hacer la IA, qué datos usa, qué nunca debe hacer, y una cotización por escrito.",
        },
        {
          title: "Construcción y pruebas con tu contenido",
          body: "Lo pruebas con preguntas reales en una versión de prueba, y ajustamos respuestas y tono antes de lanzar.",
        },
        {
          title: "Lanzamiento",
          body: "Sale en vivo en tu sitio, tu correo o tus herramientas, con los clientes potenciales y las alertas llegando a ti.",
        },
        {
          title: "Mejora continua",
          body: "Reviso lo que responde, agrego la información que falta y lo extiendo a la siguiente tarea.",
        },
      ],
      workTitle: "Sistemas de IA que he construido",
      workSubtitle: "Funcionando hoy en producción, incluido el asistente de este sitio.",
      faqTitle: "Preguntas sobre automatización con IA",
      faq: [
        {
          q: "¿Qué puede automatizar la IA en un negocio pequeño?",
          a: "El trabajo repetitivo alrededor de los clientes: responder preguntas comunes, capturar y calificar clientes potenciales, mandar seguimientos y recordatorios, redactar correos y publicaciones, y mover datos entre herramientas. El mejor primer proyecto es la tarea que tu equipo más repite.",
        },
        {
          q: "¿Un chatbot de IA puede inventar respuestas?",
          a: "Se construye para responder con tu propia información, usando una técnica llamada recuperación (RAG), y para pasarte las preguntas que no puede responder. Lo pruebas con preguntas reales antes de que salga en vivo.",
        },
        {
          q: "¿Mis datos están seguros con la IA?",
          a: "Las claves de API se quedan en el servidor, nunca en el código de tu sitio, y la IA solo ve el contenido que tú decides darle.",
        },
        {
          q: "¿El chatbot puede responder en español?",
          a: "Sí. Puede responder en inglés y en español y cambiar al idioma de cada visitante. El asistente de este sitio hace exactamente eso.",
        },
        {
          q: "¿Uso ChatGPT, Claude o Gemini?",
          a: "Depende de la tarea. Uso OpenAI para el asistente de este sitio y Claude para correos personalizados, y elijo en cada proyecto según calidad, velocidad y costo.",
        },
        {
          q: "¿Cuánto cuesta mantener un chatbot de IA?",
          a: "Está la construcción, que se cotiza después de una llamada gratis, y el uso de la IA, que el proveedor cobra por mensaje. En la mayoría de los sitios de negocios pequeños el costo de uso es bajo, y lo dejo configurado para que lo veas cada mes.",
        },
      ],
    },
  },
  {
    // The "Payment & CRM integrations" card links here. The client is not
    // named publicly (same rule as the salesforce-portal project card).
    slug: "salesforce",
    serviceId: "integrations",
    serviceType: "Salesforce consulting & implementation",
    projects: ["salesforce-portal"],
    en: {
      metaTitle: "Salesforce Consulting in Denver",
      metaDescription:
        "Salesforce Service Cloud, Email-to-Case and Experience Cloud portals for Denver teams, set up, cleaned up and released safely from sandbox to production.",
      breadcrumb: "Salesforce",
      h1: "Salesforce consulting & implementation in Denver",
      intro:
        "I set up and fix Salesforce for support teams: Service Cloud, Email-to-Case, customer portals on Experience Cloud, permissions and automation, built in a sandbox and released to production with a tested plan. You work directly with the consultant who builds it, in English or Spanish.",
      whenTitle: "When you need a Salesforce consultant",
      when: [
        {
          title: "Support requests get lost in a shared inbox",
          body: "Emails pile up, two people answer the same one and some never get a reply. Email-to-Case turns every email into a tracked case with an owner.",
        },
        {
          title: "Customers keep asking for status",
          body: "A self-service portal lets customers open cases, add details and see progress without calling or emailing your team.",
        },
        {
          title: "Your org got messy over time",
          body: "Old rules, unused fields and permissions nobody remembers. An audit shows who can see and edit what, and what to clean up first.",
        },
        {
          title: "Changes go live without testing",
          body: "Edits made straight in production break things. Sandbox builds, versioned releases and user acceptance testing make every change predictable.",
        },
      ],
      includedTitle: "What's included in a Salesforce project",
      included: [
        {
          title: "Service Cloud setup",
          body: "Cases, queues, assignment and auto-response rules shaped around how your team actually works.",
        },
        {
          title: "Email-to-Case",
          body: "Support email that becomes cases automatically and lands in the right queue.",
        },
        {
          title: "Experience Cloud portal",
          body: "A customer portal where users log in, open cases and follow them, with access limited to their own company's records.",
        },
        {
          title: "Users, profiles and sharing",
          body: "Profiles, permission sets, org-wide defaults and sharing sets reviewed so people see only what they should.",
        },
        {
          title: "Flows and automation",
          body: "Record-triggered and screen flows that remove manual steps and keep data consistent.",
        },
        {
          title: "Releases, testing and handover",
          body: "Sandbox-to-production releases with Salesforce CLI, scripted UAT with your team, user guides and support after go-live.",
        },
      ],
      platformsTitle: "Salesforce products I work with",
      platformsIntro: "I focus on the parts of Salesforce that run customer support.",
      platforms: [
        {
          title: "Service Cloud",
          body: "Cases, queues, routing, auto-responses and the agent console for your support team.",
        },
        {
          title: "Experience Cloud",
          body: "Branded customer portals with secure logins, scoped to each customer's account.",
        },
        {
          title: "Flow",
          body: "No-code automation for assignments, updates and notifications.",
        },
        {
          title: "Salesforce CLI and Metadata API",
          body: "Versioned, repeatable releases from sandbox to production instead of manual changes in production.",
        },
      ],
      processTitle: "How a Salesforce project works",
      process: [
        {
          title: "Free first call",
          body: "We go over your support process, your org today and what is not working.",
        },
        {
          title: "Audit and design",
          body: "A written review of the org and a design for cases, queues, portal and permissions, agreed before anything is built.",
        },
        {
          title: "Build in a sandbox",
          body: "Everything is configured in a sandbox, never directly in production.",
        },
        {
          title: "Test with your team",
          body: "Scripted user acceptance testing with your real scenarios, and fixes until your team signs off.",
        },
        {
          title: "Go-live and support",
          body: "A planned release to production, user guides and training, and support after go-live while your team settles in.",
        },
      ],
      workTitle: "Salesforce work",
      workSubtitle: "Delivered for an enterprise client, described without naming them.",
      faqTitle: "Salesforce questions",
      faq: [
        {
          q: "What does a Salesforce consultant do?",
          a: "Sets up and adjusts Salesforce to fit how your business works: cases and queues, automation, user access and portals, and releases the changes safely. A good consultant also tells you what not to build.",
        },
        {
          q: "What is Email-to-Case in Salesforce?",
          a: "A Service Cloud feature that turns every email sent to your support address into a case with an owner, a status and a history, so nothing gets lost and the customer can get an automatic acknowledgment.",
        },
        {
          q: "Can you fix a Salesforce org someone else set up?",
          a: "Yes. I start with an audit of the current setup, including who can see and edit what, and fix the risky parts first, like permissions that give users more access than they need.",
        },
        {
          q: "Do you build Salesforce customer portals?",
          a: "Yes, on Experience Cloud: customers log in, open and follow their cases, and only see records from their own company.",
        },
        {
          q: "Can you work in a bilingual (English and Spanish) org?",
          a: "Yes. I work in English and Spanish and can set up portals, emails and guides in both languages.",
        },
        {
          q: "How do you avoid breaking production?",
          a: "Every change is built in a sandbox, packaged as a versioned release and deployed with Salesforce CLI after your team tests it. Production is never the place to experiment.",
        },
      ],
    },
    es: {
      metaTitle: "Consultoría de Salesforce en Denver",
      metaDescription:
        "Service Cloud, Email-to-Case y portales en Experience Cloud para equipos de Denver, configurados, ordenados y publicados con cuidado de sandbox a producción.",
      breadcrumb: "Salesforce",
      h1: "Consultoría e implementación de Salesforce en Denver",
      intro:
        "Configuro y arreglo Salesforce para equipos de soporte: Service Cloud, Email-to-Case, portales de clientes en Experience Cloud, permisos y automatizaciones, construidos en un sandbox y llevados a producción con un plan probado. Trabajas directamente con el consultor que lo construye, en inglés o en español.",
      whenTitle: "Cuándo necesitas un consultor de Salesforce",
      when: [
        {
          title: "Las solicitudes de soporte se pierden en un buzón compartido",
          body: "Los correos se acumulan, dos personas responden el mismo y otros nunca reciben respuesta. Email-to-Case convierte cada correo en un caso con responsable y seguimiento.",
        },
        {
          title: "Tus clientes siempre preguntan cómo va su caso",
          body: "Un portal de autoservicio les permite abrir casos, agregar detalles y ver el avance sin llamar ni escribirle a tu equipo.",
        },
        {
          title: "Tu org se desordenó con el tiempo",
          body: "Reglas viejas, campos sin uso y permisos que nadie recuerda. Una auditoría muestra quién puede ver y editar qué, y qué limpiar primero.",
        },
        {
          title: "Los cambios salen sin probarse",
          body: "Las ediciones hechas directo en producción rompen cosas. Construir en sandbox, publicar por versiones y hacer pruebas de aceptación con usuarios hace que cada cambio sea predecible.",
        },
      ],
      includedTitle: "Qué incluye un proyecto de Salesforce",
      included: [
        {
          title: "Configuración de Service Cloud",
          body: "Casos, colas y reglas de asignación y de respuesta automática pensadas según cómo trabaja tu equipo.",
        },
        {
          title: "Email-to-Case",
          body: "Correos de soporte que se convierten en casos automáticamente y llegan a la cola correcta.",
        },
        {
          title: "Portal en Experience Cloud",
          body: "Un portal donde tus clientes entran, abren casos y les hacen seguimiento, con acceso limitado a los registros de su propia empresa.",
        },
        {
          title: "Usuarios, perfiles y permisos",
          body: "Perfiles, conjuntos de permisos, valores predeterminados de la organización y sharing sets revisados para que cada quien vea solo lo que debe.",
        },
        {
          title: "Flows y automatización",
          body: "Flows por registro y de pantalla que quitan pasos manuales y mantienen los datos consistentes.",
        },
        {
          title: "Publicación, pruebas y entrega",
          body: "Publicaciones de sandbox a producción con Salesforce CLI, pruebas de aceptación guionizadas con tu equipo, guías de usuario y soporte después del go-live.",
        },
      ],
      platformsTitle: "Productos de Salesforce con los que trabajo",
      platformsIntro: "Me enfoco en las partes de Salesforce que hacen funcionar el soporte al cliente.",
      platforms: [
        {
          title: "Service Cloud",
          body: "Casos, colas, enrutamiento, respuestas automáticas y la consola de agentes para tu equipo de soporte.",
        },
        {
          title: "Experience Cloud",
          body: "Portales de clientes con tu marca e inicio de sesión seguro, limitados a la cuenta de cada cliente.",
        },
        {
          title: "Flow",
          body: "Automatización sin código para asignaciones, actualizaciones y notificaciones.",
        },
        {
          title: "Salesforce CLI y Metadata API",
          body: "Publicaciones versionadas y repetibles de sandbox a producción, en vez de cambios a mano en producción.",
        },
      ],
      processTitle: "Cómo funciona un proyecto de Salesforce",
      process: [
        {
          title: "Primera llamada gratis",
          body: "Repasamos tu proceso de soporte, cómo está tu org hoy y qué no está funcionando.",
        },
        {
          title: "Auditoría y diseño",
          body: "Una revisión por escrito de la org y un diseño de casos, colas, portal y permisos, acordado antes de construir nada.",
        },
        {
          title: "Construcción en un sandbox",
          body: "Todo se configura en un sandbox, nunca directo en producción.",
        },
        {
          title: "Pruebas con tu equipo",
          body: "Pruebas de aceptación guionizadas con tus casos reales, y ajustes hasta que tu equipo lo aprueba.",
        },
        {
          title: "Go-live y soporte",
          body: "Una publicación planeada a producción, guías de usuario y capacitación, y soporte después del go-live mientras tu equipo se adapta.",
        },
      ],
      workTitle: "Trabajo en Salesforce",
      workSubtitle: "Hecho para un cliente enterprise, descrito sin nombrarlo.",
      faqTitle: "Preguntas sobre Salesforce",
      faq: [
        {
          q: "¿Qué hace un consultor de Salesforce?",
          a: "Configura y ajusta Salesforce según cómo trabaja tu negocio: casos y colas, automatizaciones, accesos de usuarios y portales, y publica los cambios de forma segura. Un buen consultor también te dice qué no construir.",
        },
        {
          q: "¿Qué es Email-to-Case en Salesforce?",
          a: "Una función de Service Cloud que convierte cada correo enviado a tu dirección de soporte en un caso con responsable, estado e historial, para que nada se pierda y el cliente pueda recibir un acuse automático.",
        },
        {
          q: "¿Puedes arreglar una org de Salesforce que configuró otra persona?",
          a: "Sí. Empiezo con una auditoría de la configuración actual, incluido quién puede ver y editar qué, y arreglo primero lo riesgoso, como permisos que dan más acceso del necesario.",
        },
        {
          q: "¿Construyes portales de clientes en Salesforce?",
          a: "Sí, en Experience Cloud: los clientes entran, abren y siguen sus casos, y solo ven los registros de su propia empresa.",
        },
        {
          q: "¿Trabajas con orgs bilingües (inglés y español)?",
          a: "Sí. Trabajo en inglés y en español y puedo dejar portales, correos y guías en los dos idiomas.",
        },
        {
          q: "¿Cómo evitas dañar producción?",
          a: "Cada cambio se construye en un sandbox, se empaqueta como una versión y se publica con Salesforce CLI después de que tu equipo lo prueba. Producción nunca es el lugar para experimentar.",
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
