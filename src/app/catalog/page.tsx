import type { Metadata } from "next";
import { CatalogPage } from "@/views/catalog/ui/catalog-page";
import { absoluteUrl, siteConfig } from "@/shared/config/site";

const title = "Каталог товаров для дома";
const description =
  "Выбирайте посуду, декор, освещение, текстиль и мебель для дома. В каталоге Лавки собраны красивые и практичные предметы на каждый день.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/catalog" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: absoluteUrl("/catalog"),
    siteName: siteConfig.name,
    title: `${title} | Лавка`,
    description,
    images: [
      {
        url: absoluteUrl("/images/brand/og-lavka.jpg"),
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Каталог Лавки — товары для дома",
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

type Props = {
  searchParams: Promise<{ q?: string; category?: string; sort?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  return (
    <CatalogPage
      initialQuery={params.q ?? ""}
      initialCategory={params.category ?? "all"}
      initialSort={params.sort ?? "featured"}
    />
  );
}
