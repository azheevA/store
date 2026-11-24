"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/shared/ui/container";

export function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const order = searchParams.get("order") ?? "LV-DEMO";
  return (
    <Container className="py-16 text-center sm:py-24">
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-[26px] bg-[#e8f0e6] text-[#426343] shadow-sm">
        <Check size={32} strokeWidth={1.4} />
      </div>
      <p className="eyebrow mt-8">Спасибо за выбор</p>
      <h1 className="mx-auto mt-3 max-w-150 font-serif text-5xl tracking-tighter text-[#203126] sm:text-6xl">
        Заказ оформлен!
      </h1>
      <p className="mt-5 text-sm text-[#85867e]">
        Номер вашего демонстрационного заказа
      </p>
      <p className="mt-2 inline-block rounded-full bg-[#eef3ec] px-5 py-2 font-serif text-2xl text-[#344c3c]">
        {order}
      </p>
      <p className="mx-auto mt-5 max-w-107.5 text-xs leading-6 text-[#96978b]">
        Это демо-сценарий: информация не отправлялась на сервер, а оплата не
        выполнялась.
      </p>
      <Link href="/catalog" className="button-primary mt-9 inline-flex">
        Вернуться в каталог
      </Link>
    </Container>
  );
}
