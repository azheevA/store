import type { Metadata } from "next";
import { CartPageContent } from "@/widgets/cart-content/ui/cart-content";

export const metadata: Metadata = {
  title: "Корзина",
  description: "Проверьте выбранные товары и перейдите к оформлению заказа.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/cart" },
};

export default function Page() {
  return <CartPageContent />;
}
