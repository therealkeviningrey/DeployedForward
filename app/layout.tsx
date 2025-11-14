import type { Metadata } from 'next';
import { Orbitron, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { ConsentBanner } from '@/components/ConsentBanner';
import { JsonLd } from '@/components/JsonLd';
import { generateOrganizationJsonLd } from '@/lib/seo';
import { AuthProvider } from '@/components/auth/AuthClient';
import '../styles/globals.css';
import '../styles/components.css';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-orbitron',
  display: 'swap',
  preload: true,
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
  preload: true,
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: 'Deployed Forward | Train where the future is operational',
    template: '%s | Deployed Forward',
  },
  description: 'Master AI workflows. Deploy capability. Build repeatable AI advantage with field-tested workflows and missions.',
  keywords: ['AI training', 'developer workflows', 'operational intelligence', 'AI missions', 'coding education'],
  authors: [{ name: 'Kingsbury Labs' }],
  creator: 'Kingsbury Labs',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://deployedforward.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Deployed Forward',
    title: 'Deployed Forward | Train where the future is operational',
    description: 'Master AI workflows. Deploy capability. Build repeatable AI advantage with field-tested workflows and missions.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deployed Forward | Train where the future is operational',
    description: 'Master AI workflows. Deploy capability. No fluff.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://deployedforward.com';
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Deployed Forward',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/courses?query={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <AuthProvider>
      <html
        lang="en"
        className={`${orbitron.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
      >
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        </head>
        <body>
          <JsonLd data={generateOrganizationJsonLd()} />
          <JsonLd data={websiteJsonLd} />
          {children}
          <ConsentBanner />
          <Analytics />
        </body>
      </html>
    </AuthProvider>
  );
}
