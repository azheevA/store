import type { Metadata } from "next";
import { FavoritesPage } from "@/views/favorites/ui/favorites-page";

export const metadata: Metadata = {
  title: "Избранное",
  description: "Сохранённые товары Лавки.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/favorites" },
};

export default function Page() {
  return <FavoritesPage />;
}
