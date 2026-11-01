import { Helmet } from "react-helmet-async";

export const SITE_URL = "https://freelancekit.akclnt.com";
export const SITE_NAME = "FreelanceKit";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

type SeoProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
  jsonLd?: object | object[];
};

export default function Seo({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  noindex = false,
  jsonLd,
}: SeoProps) {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const fullTitle = path === "/" ? title : `${title} | ${SITE_NAME}`;
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph: link share preview */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter/X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}
