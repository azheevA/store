"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/features/cart/model/cart-slice";
import { products } from "@/entities/product/data/products";
import { formatPrice } from "@/shared/lib/format-price";

export function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const cartProducts = items
    .map((item) => ({
      ...item,
      product: products.find((product) => product.id === item.productId),
    }))
    .filter((item) => item.product);
  const total = cartProducts.reduce(
    (sum, item) => sum + (item.product?.price ?? 0) * item.quantity,
    0,
  );
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex justify-end">
      <button
        type="button"
        aria-label="Закрыть корзину"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-[#17231c]/40 backdrop-blur-[2px]"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Быстрый просмотр корзины"
        className="relative flex h-full w-full max-w-[470px] animate-fade-up flex-col bg-[#fbfaf6] shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-[#e9e6dd] px-5 py-5 sm:px-7">
          <div>
            <p className="eyebrow">Ваш выбор</p>
            <h2 className="mt-1 font-serif text-2xl tracking-[-.04em] text-[#29382d]">
              Корзина{" "}
              <span className="font-sans text-sm text-[#96998e]">
                ({count})
              </span>
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть"
            className="grid h-10 w-10 place-items-center rounded-full border border-[#e3e3d9] text-[#536453] transition hover:bg-[#edf0e9]"
          >
            <X size={18} />
          </button>
        </div>

        {cartProducts.length > 0 ? (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-7">
              <div className="mb-5 flex items-center gap-2 rounded-xl bg-[#edf0e8] px-3.5 py-3 text-[10px] text-[#61735f]">
                <ShoppingBag size={14} />
                <span>
                  {total >= 5000
                    ? "Доставка за наш счёт — спасибо за выбор!"
                    : `До бесплатной доставки осталось ${formatPrice(5000 - total)}`}
                </span>
              </div>
              <div className="space-y-4">
                {cartProducts.map(
                  ({ product, productId, quantity }) =>
                    product && (
                      <div
                        key={productId}
                        className="flex gap-4 border-b border-[#ece9e1] pb-4"
                      >
                        <Link
                          href={`/product/${product.slug}`}
                          onClick={onClose}
                          className="product-image relative h-[112px] w-[94px] shrink-0 overflow-hidden rounded-[15px]"
                        >
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="94px"
                            className="object-cover"
                          />
                        </Link>
                        <div className="flex min-w-0 flex-1 flex-col py-0.5">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-[8px] font-bold uppercase tracking-[.14em] text-[#929589]">
                                {product.categoryLabel}
                              </p>
                              <Link
                                href={`/product/${product.slug}`}
                                onClick={onClose}
                                className="mt-1 block font-serif text-[17px] leading-tight text-[#2d3a30]"
                              >
                                {product.name}
                              </Link>
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                dispatch(removeFromCart(productId))
                              }
                              aria-label={`Удалить ${product.name}`}
                              className="text-[#a1a397] transition hover:text-[#a15f4a]"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                          <div className="mt-auto flex items-end justify-between gap-3">
                            <div className="flex h-8 items-center rounded-full border border-[#e4e4da] bg-white">
                              <button
                                type="button"
                                onClick={() =>
                                  dispatch(decreaseQuantity(productId))
                                }
                                aria-label="Уменьшить"
                                className="grid h-8 w-8 place-items-center text-[#647362]"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="w-5 text-center text-[10px] font-bold text-[#39483b]">
                                {quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  dispatch(increaseQuantity(productId))
                                }
                                aria-label="Увеличить"
                                className="grid h-8 w-8 place-items-center text-[#647362]"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            <p className="text-[13px] font-bold text-[#303c32]">
                              {formatPrice(product.price * quantity)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ),
                )}
              </div>
            </div>
            <div className="border-t border-[#e8e6dd] bg-white px-5 py-5 sm:px-7 sm:py-6">
              <div className="flex items-center justify-between text-[11px] text-[#83887c]">
                <span>Итого без доставки</span>
                <span className="font-serif text-2xl text-[#2b382d]">
                  {formatPrice(total)}
                </span>
              </div>
              <p className="mt-2 text-[9px] leading-5 text-[#a0a296]">
                Стоимость доставки рассчитывается при оформлении заказа.
              </p>
              <Link
                href="/checkout"
                onClick={onClose}
                className="button-primary mt-5 w-full"
              >
                Перейти к оформлению <ArrowRight size={15} />
              </Link>
              <Link
                href="/cart"
                onClick={onClose}
                className="mt-3 flex justify-center text-[10px] font-semibold text-[#6f7d6d] transition hover:text-[#294638]"
              >
                Открыть полную корзину
              </Link>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-[#edf0e8] text-[#607660]">
              <ShoppingBag size={27} strokeWidth={1.3} />
            </span>
            <p className="mt-6 font-serif text-3xl tracking-[-.04em] text-[#2d3b30]">
              Пока здесь пусто
            </p>
            <p className="mt-2 max-w-[250px] text-[11px] leading-6 text-[#8e9388]">
              Добавьте понравившиеся вещи — они появятся в вашей корзине.
            </p>
            <Link
              href="/catalog"
              onClick={onClose}
              className="button-primary mt-7"
            >
              Перейти в каталог <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
