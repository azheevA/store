import type { Metadata } from "next";
import { HomePage } from "@/views/home/ui/home-page";

export const metadata: Metadata = {
  title: "Товары для дома, декор и уютная кухня",
  description:
    "Откройте коллекцию Лавки: посуда, декор, освещение и текстиль для дома. Выбирайте красивые и практичные вещи на каждый день.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return <HomePage />;
}
