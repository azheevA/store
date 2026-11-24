"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/features/cart/model/cart-slice";
import { getProductById } from "@/entities/product/data/products";
import { formatPrice } from "@/shared/lib/format-price";
import { Container } from "@/shared/ui/container";

export function CartPageContent() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const rows = items
    .map((item) => ({ item, product: getProductById(item.productId) }))
    .filter((row) => row.product);
  const total = rows.reduce(
    (sum, row) => sum + row.product!.price * row.item.quantity,
    0,
  );

  return (
    <Container className="py-12 sm:py-16">
      <div className="mb-10 flex items-end justify-between border-b border-[#e4e2d9] pb-6">
        <div>
          <p className="eyebrow">Ваш выбор</p>
          <h1 className="page-title mt-3">Корзина</h1>
        </div>
        <span className="text-xs text-[#898a80]">
          {rows.reduce((sum, row) => sum + row.item.quantity, 0)} товара
        </span>
      </div>
      {rows.length === 0 ? (
        <div className="rounded-[24px] border border-[#e7ebe4] bg-white px-5 py-20 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#efeee8] text-[#344c3c]">
            <ShoppingBag size={26} strokeWidth={1.3} />
          </div>
          <h2 className="mt-6 font-serif text-3xl text-[#28362c]">
            Пока здесь пусто
          </h2>
          <p className="mt-3 text-sm text-[#85867e]">
            Добавьте то, что сделает ваш дом уютнее.
          </p>
          <Link href="/catalog" className="button-primary mt-8 inline-flex">
            Перейти в каталог
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-3">
            {rows.map(
              ({ item, product }) =>
                product && (
                  <div
                    key={product.id}
                    className="grid grid-cols-[104px_1fr] gap-4 rounded-[20px] border border-[#e7ebe4] bg-white p-3.5 sm:grid-cols-[132px_1fr_auto] sm:gap-6 sm:p-5"
                  >
                    <Link
                      href={`/product/${product.slug}`}
                      className="relative aspect-[4/5] overflow-hidden rounded-[14px] bg-[#efeee8]"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="132px"
                        className="object-cover"
                      />
                    </Link>
                    <div className="flex min-w-0 flex-col items-start">
                      <p className="eyebrow">{product.categoryLabel}</p>
                      <Link
                        href={`/product/${product.slug}`}
                        className="mt-2 font-serif text-xl text-[#28362c]"
                      >
                        {product.name}
                      </Link>
                      <p className="mt-1 text-xs text-[#898a80]">
                        {product.subtitle}
                      </p>
                      <div className="mt-auto flex items-center gap-3 pt-6">
                        <div className="flex h-9 items-center rounded-full border border-[#deddd4]">
                          <button
                            type="button"
                            aria-label="Уменьшить количество"
                            onClick={() =>
                              dispatch(decreaseQuantity(product.id))
                            }
                            className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-[#f0f4ee]"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-7 text-center text-xs">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            aria-label="Увеличить количество"
                            onClick={() =>
                              dispatch(increaseQuantity(product.id))
                            }
                            className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-[#f0f4ee]"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => dispatch(removeFromCart(product.id))}
                          className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[.12em] text-[#929388] transition hover:text-[#a65f46]"
                        >
                          <Trash2 size={13} /> Удалить
                        </button>
                      </div>
                    </div>
                    <p className="col-start-2 self-start pt-1 text-sm font-medium text-[#28362c] sm:col-start-auto">
                      {formatPrice(product.price * item.quantity)}
                    </p>
                  </div>
                ),
            )}
          </div>
          <aside className="h-fit rounded-[24px] border border-[#e7ebe4] bg-white p-6 shadow-[0_10px_30px_#1f2c2308] sm:p-8 lg:sticky lg:top-28">
            <p className="eyebrow">Итого</p>
            <div className="mt-6 flex justify-between text-sm text-[#74786e]">
              <span>Товары</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="mt-4 flex justify-between text-sm text-[#74786e]">
              <span>Доставка</span>
              <span>{total >= 5000 ? "Бесплатно" : "Рассчитаем позже"}</span>
            </div>
            <div className="my-6 border-t border-[#d9d7cd]" />
            <div className="flex items-end justify-between">
              <span className="text-sm text-[#4b574b]">К оплате</span>
              <span className="font-serif text-3xl text-[#28362c]">
                {formatPrice(total)}
              </span>
            </div>
            <Link href="/checkout" className="button-primary mt-7 flex w-full">
              Перейти к оформлению
            </Link>
            <p className="mt-4 text-center text-[10px] leading-5 text-[#8b8b80]">
              Демонстрационный заказ. Оплата не производится.
            </p>
          </aside>
        </div>
      )}
    </Container>
  );
}
