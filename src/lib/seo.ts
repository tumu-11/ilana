export const SITE_URL = "https://getilana.com";
export const LOGO_URL = `${SITE_URL}/logo.png`;

export const ORGANIZATION_SCHEMA = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Get Ilana",
  alternateName: ["GetIlana", "Ilana", "Ilana Nutrition", "Get Ilana Nutrition"],
  url: `${SITE_URL}/`,
  logo: {
    "@type": "ImageObject",
    url: LOGO_URL,
    width: 512,
    height: 512,
  },
  image: LOGO_URL,
  description:
    "Discover ILANA Nutrition & Wellness for personalised nutrition, healthy eating guidance and practical diet support. Explore tailored food and nutrition services for every stage of life.",
  areaServed: [{ "@type": "Country", name: "Uganda" }, "East Africa"],
  knowsAbout: ["Nutrition", "Wellness", "Diet plans"],
  sameAs: ["https://www.instagram.com/get.ilana", "https://www.tiktok.com/@get.ilana"],
};

export const WEBSITE_SCHEMA = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: "Get Ilana",
  alternateName: [
    "GetIlana",
    "Ilana",
    "Ilana Nutrition",
    "Get Ilana Nutrition",
    "Ilana Diet",
    "Get Ilana Diet",
  ],
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
      { property: "og:site_name", content: "Get Ilana" },
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
