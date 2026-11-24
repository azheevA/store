import type { Metadata } from "next";
import { CatalogPage } from "@/views/catalog/ui/catalog-page";

export const metadata: Metadata = {
  title: "Каталог товаров для дома",
  description:
    "Каталог Лавки: посуда, декор, освещение, текстиль и мебель. Поиск и подбор предметов для уютного дома.",
  alternates: { canonical: "/catalog" },
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
