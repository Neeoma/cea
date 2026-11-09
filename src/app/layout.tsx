import type { Metadata, Viewport } from "next";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { academy } from "@/data/academy";
import { SiteHeader } from "@/components/shell/site-header";
import { SiteFooter } from "@/components/shell/site-footer";
import { RevealProvider } from "@/components/motion/reveal-provider";
import { Assistant } from "@/components/shell/assistant";

export const metadata: Metadata = {
  metadataBase: new URL(academy.url),
  title: {
    default: `${academy.name} — Practical technology & cybersecurity training in Port Harcourt`,
    template: `%s · ${academy.shortName}`,
  },
  description: academy.description,
  keywords: [
    "cybersecurity training in Nigeria",
    "computer training in Port Harcourt",
    "digital skills academy Port Harcourt",
    "ethical hacking training Nigeria",
    "web design training Port Harcourt",
    "computer programming courses Nigeria",
    "IT training for beginners",
    "Cyber Elias Academy",
    "CEA",
  ],
  authors: [{ name: academy.name, url: academy.url }],
  creator: academy.name,
  publisher: academy.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: academy.url,
    siteName: academy.name,
    title: `${academy.name} — The Future Is Built. Not Given.`,
    description: academy.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${academy.name} — The Future Is Built. Not Given.`,
    description: academy.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "education",
};

export const viewport: Viewport = {
  themeColor: "#070B12",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const organisationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: academy.name,
  alternateName: academy.shortName,
  url: academy.url,
  description: academy.description,
  address: {
    "@type": "PostalAddress",
    streetAddress: academy.address.line1,
    addressLocality: academy.address.city,
    addressRegion: academy.address.state,
    addressCountry: "NG",
  },
  areaServed: "Nigeria",
  knowsAbout: [
    "Cybersecurity",
    "Software Development",
    "Digital Design",
    "Cloud Computing",
    "Data Analytics",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG" suppressHydrationWarning>
      <body className="min-h-dvh bg-void text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-cyan focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:font-bold focus:text-void"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
        />
        <RevealProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <Assistant />
        </RevealProvider>
      </body>
    </html>
  );
}
