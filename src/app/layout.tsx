import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { StoreProvider } from "@/app/providers/store-provider";
import { SiteHeader } from "@/widgets/site-header/ui/site-header";
import { SiteFooter } from "@/widgets/site-footer/ui/site-footer";
import { siteConfig } from "@/shared/config/site";
import "./globals.css";

const socialImage = `${siteConfig.url}/opengraph-image`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Лавка — вещи для дома с характером",
    template: "%s | Лавка",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Лавка — вещи для дома с характером",
    description: siteConfig.description,
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: "Лавка — предметы для уютного дома",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Лавка — вещи для дома с характером",
    description: siteConfig.description,
    images: [socialImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "shopping",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fbfaf7",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Москва",
      addressCountry: "RU",
    },
  };

  return (
    <html lang="ru">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <StoreProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </StoreProvider>
      </body>
    </html>
  );
}
