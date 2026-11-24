import type { Metadata } from "next";
import { Suspense } from "react";
import { OrderSuccessPage } from "@/views/order-success/ui/order-success-page";

export const metadata: Metadata = {
  title: "Заказ оформлен",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-[50vh]" />}>
      <OrderSuccessPage />
    </Suspense>
  );
}
