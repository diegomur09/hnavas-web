import { Link } from "@/i18n/navigation";
import { localeUrl } from "@/i18n/paths";

// Visible trail plus BreadcrumbList JSON-LD, so Google can show
// "hnavasystems.com › Services › Web design" in results and understands where
// the page sits in the site. Paths are locale-free ("/services/"); the last
// item is the current page and is not a link.
export function Breadcrumbs({
  locale,
  items,
}: {
  locale: string;
  items: { name: string; path: string }[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: localeUrl(locale, c.path),
    })),
  };

  return (
    <nav aria-label="Breadcrumb">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-secondary">
        {items.map((c, i) => (
          <li key={c.path} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i === items.length - 1 ? (
              <span aria-current="page" className="text-body">
                {c.name}
              </span>
            ) : (
              <Link href={c.path} className="transition hover:text-primary">
                {c.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
