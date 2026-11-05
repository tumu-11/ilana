export const SITE_URL = "https://getilana.com";
export const LOGO_URL = `${SITE_URL}/favicon.ico.jpeg`;

export const ORGANIZATION_SCHEMA = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "ILANA Nutrition & Wellness",
  alternateName: "ILANA",
  url: `${SITE_URL}/`,
  logo: {
    "@type": "ImageObject",
    url: LOGO_URL,
  },
};

export const WEBSITE_SCHEMA = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: "ILANA Nutrition & Wellness",
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
};

export function pageSeo({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  const url = `${SITE_URL}${path}`;

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index,follow" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: LOGO_URL },
      { property: "og:image:alt", content: "ILANA Nutrition & Wellness logo" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: LOGO_URL },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
