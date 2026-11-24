"use client";

import { useMemo, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { clearCart } from "@/features/cart/model/cart-slice";
import { getProductById } from "@/entities/product/data/products";
import { formatPrice } from "@/shared/lib/format-price";
import { Container } from "@/shared/ui/container";

export function CheckoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const rows = useMemo(
    () =>
      cartItems
        .map((item) => ({ item, product: getProductById(item.productId) }))
        .filter((row) => row.product),
    [cartItems],
  );
  const total = rows.reduce(
    (sum, row) => sum + row.product!.price * row.item.quantity,
    0,
  );
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    comment: "",
    delivery: "courier",
  });
  const [error, setError] = useState("");

  const update = (field: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!rows.length) return;
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      setError("Заполните имя, телефон и адрес доставки.");
      return;
    }
    const orderId = `LV-${Math.floor(100000 + Math.random() * 900000)}`;
    dispatch(clearCart());
    router.push(`/order-success?order=${orderId}`);
  };

  if (!rows.length)
    return (
      <Container className="py-20 text-center">
        <p className="eyebrow">Оформление</p>
        <h1 className="page-title mt-3">Корзина пока пуста</h1>
        <p className="mt-3 text-sm text-[#85867e]">
          Сначала добавьте товары, которые хотите заказать.
        </p>
        <Link href="/catalog" className="button-primary mt-8 inline-flex">
          Перейти в каталог
        </Link>
      </Container>
    );

  const fieldClass =
    "mt-2 h-12 w-full rounded-xl border border-[#e1e7de] bg-white px-4 text-sm text-[#344c3c] outline-none transition placeholder:text-[#b0afa4] focus:border-[#789477]";
  return (
    <Container className="py-12 sm:py-16">
      <div className="mb-10 border-b border-[#e4e2d9] pb-6">
        <p className="eyebrow">Последний шаг</p>
        <h1 className="page-title mt-3">Оформление заказа</h1>
      </div>
      <form onSubmit={submit} className="grid gap-12 lg:grid-cols-[1fr_390px]">
        <div>
          <section>
            <h2 className="font-serif text-2xl text-[#344c3c]">
              Контактные данные
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <label className="text-[10px] font-semibold uppercase tracking-[.13em] text-[#73796d] sm:col-span-2">
                Имя и фамилия
                <input
                  className={fieldClass}
                  value={form.name}
                  onChange={(event) => update("name", event.target.value)}
                  placeholder="Как к вам обращаться"
                />
              </label>
              <label className="text-[10px] font-semibold uppercase tracking-[.13em] text-[#73796d]">
                Телефон
                <input
                  className={fieldClass}
                  type="tel"
                  value={form.phone}
                  onChange={(event) => update("phone", event.target.value)}
                  placeholder="+7 (___) ___-__-__"
                />
              </label>
              <label className="text-[10px] font-semibold uppercase tracking-[.13em] text-[#73796d]">
                Email
                <input
                  className={fieldClass}
                  type="email"
                  value={form.email}
                  onChange={(event) => update("email", event.target.value)}
                  placeholder="mail@example.com"
                />
              </label>
              <label className="text-[10px] font-semibold uppercase tracking-[.13em] text-[#73796d] sm:col-span-2">
                Адрес доставки
                <input
                  className={fieldClass}
                  value={form.address}
                  onChange={(event) => update("address", event.target.value)}
                  placeholder="Город, улица, дом, квартира"
                />
              </label>
              <label className="text-[10px] font-semibold uppercase tracking-[.13em] text-[#73796d] sm:col-span-2">
                Комментарий к заказу
                <textarea
                  rows={3}
                  className="mt-2 w-full resize-y rounded-xl border border-[#e1e7de] bg-white px-4 py-3 text-sm text-[#344c3c] outline-none focus:border-[#789477]"
                  value={form.comment}
                  onChange={(event) => update("comment", event.target.value)}
                  placeholder="Например, удобное время доставки"
                />
              </label>
            </div>
          </section>
          <section className="mt-10 border-t border-[#e4e2d9] pt-8">
            <h2 className="font-serif text-2xl text-[#344c3c]">
              Способ доставки
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <label
                className={`flex cursor-pointer gap-3 rounded-xl border p-4 transition ${form.delivery === "courier" ? "border-[#71816b] bg-[#f3f2ec]" : "border-[#deddd4]"}`}
              >
                <input
                  type="radio"
                  name="delivery"
                  checked={form.delivery === "courier"}
                  onChange={() => update("delivery", "courier")}
                  className="mt-1 accent-[#344c3c]"
                />
                <span>
                  <span className="block text-xs font-semibold text-[#344c3c]">
                    Курьер
                  </span>
                  <span className="mt-1 block text-[11px] text-[#85867e]">
                    До двери · 2–5 дней
                  </span>
                </span>
              </label>
              <label
                className={`flex cursor-pointer gap-3 rounded-xl border p-4 transition ${form.delivery === "pickup" ? "border-[#71816b] bg-[#f3f2ec]" : "border-[#deddd4]"}`}
              >
                <input
                  type="radio"
                  name="delivery"
                  checked={form.delivery === "pickup"}
                  onChange={() => update("delivery", "pickup")}
                  className="mt-1 accent-[#344c3c]"
                />
                <span>
                  <span className="block text-xs font-semibold text-[#344c3c]">
                    Самовывоз
                  </span>
                  <span className="mt-1 block text-[11px] text-[#85867e]">
                    Из пункта выдачи
                  </span>
                </span>
              </label>
            </div>
          </section>
        </div>
        <aside className="h-fit rounded-3xl border border-[#e7ebe4] bg-white p-6 shadow-[0_10px_30px_#1f2c2308] sm:p-8 lg:sticky lg:top-28">
          <h2 className="font-serif text-2xl text-[#344c3c]">Ваш заказ</h2>
          <div className="mt-6 space-y-4">
            {rows.map(
              ({ item, product }) =>
                product && (
                  <div key={product.id} className="flex gap-3">
                    <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-[#e4e1d7]">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-[#344c3c]">{product.name}</p>
                      <p className="mt-1 text-[10px] text-[#8c8d82]">
                        {item.quantity} × {formatPrice(product.price)}
                      </p>
                    </div>
                    <p className="text-xs text-[#344c3c]">
                      {formatPrice(product.price * item.quantity)}
                    </p>
                  </div>
                ),
            )}
          </div>
          <div className="my-6 border-t border-[#d9d7cd]" />
          <div className="flex justify-between text-xs text-[#7b7e72]">
            <span>Доставка</span>
            <span>{total >= 5000 ? "Бесплатно" : "По тарифу"}</span>
          </div>
          <div className="mt-5 flex items-end justify-between">
            <span className="text-sm text-[#4b574b]">Итого</span>
            <span className="font-serif text-3xl text-[#28362c]">
              {formatPrice(total)}
            </span>
          </div>
          {error && (
            <p role="alert" className="mt-5 text-xs text-[#a65f46]">
              {error}
            </p>
          )}
          <button type="submit" className="button-primary mt-7 w-full">
            Подтвердить заказ
          </button>
          <p className="mt-4 text-center text-[10px] leading-5 text-[#898a80]">
            Демонстрационная форма. Заказ не отправляется продавцу, оплата не
            производится.
          </p>
        </aside>
      </form>
    </Container>
  );
}
