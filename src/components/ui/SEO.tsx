import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function SEO({
  title = 'UR Aerotech — Aircraft Structural Repair & Aviation Parts',
  description = '20+ years of excellence in aircraft structural repairs, modifications, and certified parts supply.',
  image,
  url,
  type = 'website',
}: SEOProps) {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://uraerotech.com';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}

export function StructuredData({ data }: { data: Record<string, unknown> }) {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}

export function PageWrapper({ children }: { children: ReactNode }) {
  return <div className="min-h-screen">{children}</div>;
}
