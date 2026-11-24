import type { Metadata } from "next";
import { CheckoutPage } from "@/views/checkout/ui/checkout-page";

export const metadata: Metadata = {
  title: "Оформление заказа",
  description:
    "Заполните данные для демонстрационного оформления заказа в Лавке.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/checkout" },
};

export default function Page() {
  return <CheckoutPage />;
}
