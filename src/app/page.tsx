import type { Metadata } from "next";
import { HomePage } from "@/views/home/ui/home-page";
import { absoluteUrl, siteConfig } from "@/shared/config/site";

const title = "Товары для дома, декор и посуда";
const description =
  "Посуда, декор, освещение, текстиль и мебель для уютного дома. Найдите красивые и практичные вещи для повседневной жизни в интернет-магазине «Лавка».";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${title} | Лавка`,
    description,
    images: [
      {
        url: absoluteUrl("/images/brand/og-lavka.jpg"),
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Лавка — предметы для уютного дома",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Лавка`,
    description,
    images: [absoluteUrl("/images/brand/og-lavka.jpg")],
  },
};

export default function Page() {
  return <HomePage />;
}
