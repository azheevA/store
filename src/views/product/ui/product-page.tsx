"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  Star,
  Truck,
  X,
  ZoomIn,
} from "lucide-react";
import type { Product } from "@/entities/product/model/types";
import { products } from "@/entities/product/data/products";
import { formatPrice } from "@/shared/lib/format-price";
import { Container } from "@/shared/ui/container";
import { useAppDispatch } from "@/app/store/hooks";
import { addToCart } from "@/features/cart/model/cart-slice";
import { FavoriteButton } from "@/features/favorites/ui/favorite-button";
import { ProductCard } from "@/widgets/product-card/ui/product-card";

export function ProductPage({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [zoomOpen, setZoomOpen] = useState(false);
  const dispatch = useAppDispatch();
  const related = products
    .filter(
      (item) => item.category === product.category && item.id !== product.id,
    )
    .slice(0, 4);
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null;

  const handleAdd = () => {
    for (let index = 0; index < quantity; index += 1)
      dispatch(addToCart(product.id));
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  };

  return (
    <>
      <Container className="py-6 sm:py-9">
        <div className="mb-6 flex flex-wrap items-center gap-2 text-[9px] text-[#989b8f]">
          <Link href="/" className="transition hover:text-[#294638]">
            Главная
          </Link>
          <ChevronRight size={11} />
          <Link href="/catalog" className="transition hover:text-[#294638]">
            Каталог
          </Link>
          <ChevronRight size={11} />
          <span className="font-semibold text-[#586b56]">{product.name}</span>
        </div>
        <div className="grid items-start gap-8 lg:grid-cols-[1.08fr_.92fr] lg:gap-12 xl:gap-[76px]">
          <div className="min-w-0">
            <div className="product-image group relative overflow-hidden rounded-[24px] sm:rounded-[30px]">
              <button
                type="button"
                onClick={() => setZoomOpen(true)}
                aria-label="Увеличить фотографию"
                className="relative block aspect-[.94/1] w-full cursor-zoom-in sm:aspect-[1.05/1]"
              >
                <Image
                  src={product.images[activeImage] ?? product.image}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 56vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.025]"
                />
                <span className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full border border-white/70 bg-white/85 text-[#53664f] opacity-0 shadow-md backdrop-blur transition group-hover:opacity-100">
                  <ZoomIn size={16} />
                </span>
              </button>
              <span className="absolute left-4 top-4 rounded-full border border-white/70 bg-[#fbfaf5]/85 px-3.5 py-2 text-[8px] font-bold uppercase tracking-[.16em] text-[#62715d] shadow-sm backdrop-blur">
                Коллекция Лавки
              </span>
              {discount !== null && (
                <span className="absolute right-4 top-4 rounded-full bg-[#b97858] px-3.5 py-2 text-[9px] font-bold uppercase tracking-[.12em] text-white shadow-sm">
                  −{discount}%
                </span>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="mt-3 flex gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    aria-label={`Показать фото ${index + 1}`}
                    className={`product-image relative h-[76px] w-[76px] overflow-hidden rounded-[13px] transition sm:h-[90px] sm:w-[90px] ${activeImage === index ? "ring-2 ring-[#49684a] ring-offset-2 ring-offset-[#f7f6f1]" : "opacity-65 hover:opacity-100"}`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name}, фото ${index + 1}`}
                      fill
                      sizes="90px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
            <div className="mt-5 flex items-center justify-between text-[9px] font-semibold uppercase tracking-[.14em] text-[#96998d]">
              <span>Артикул {product.id.toUpperCase()}</span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7f9a75]" />{" "}
                {product.inStock ? "В наличии" : "Нет в наличии"}
              </span>
            </div>
          </div>

          <div className="lg:sticky lg:top-[112px] lg:self-start">
            <div className="flex items-center justify-between gap-3">
              <p className="eyebrow">{product.categoryLabel} / Лавка</p>
              <FavoriteButton productId={product.id} />
            </div>
            <h1 className="mt-5 font-serif text-[clamp(2.7rem,4.7vw,4.4rem)] leading-[.96] tracking-[-.075em] text-[#27352b]">
              {product.name}
            </h1>
            <p className="mt-3 text-[12px] text-[#909387] sm:text-[13px]">
              {product.subtitle}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-[10px] text-[#8b9084]">
              <span className="flex items-center gap-1.5 font-bold text-[#8c744d]">
                <Star size={13} fill="currentColor" strokeWidth={0} />{" "}
                {product.rating.toFixed(1)}
              </span>
              <span>{product.reviewsCount} отзывов</span>
              <span className="h-1 w-1 rounded-full bg-[#bbc0b4]" />
              <span>Бережно упакуем</span>
            </div>
            <div className="mt-7 flex items-end gap-3">
              <span className="font-serif text-[38px] tracking-[-.055em] text-[#29372d] sm:text-[44px]">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <>
                  <span className="pb-1.5 text-[13px] text-[#a2a398] line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                  <span className="mb-1.5 rounded-full bg-[#f2e8e0] px-2.5 py-1 text-[8px] font-bold text-[#a96d51]">
                    −{discount}%
                  </span>
                </>
              )}
            </div>
            <div className="my-7 border-t border-[#e6e4dc]" />
            <p className="max-w-[520px] text-[12px] leading-7 text-[#767d71] sm:text-[13px]">
              {product.description}
            </p>

            <div className="mt-8 rounded-[20px] border border-[#e8e6de] bg-[#fffefa] p-4 sm:p-5">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex h-12 items-center rounded-full border border-[#e4e4da] bg-[#f9f8f3]">
                  <button
                    type="button"
                    aria-label="Уменьшить количество"
                    onClick={() =>
                      setQuantity((value) => Math.max(1, value - 1))
                    }
                    className="grid h-11 w-11 place-items-center rounded-full text-[#61715e] transition hover:bg-[#ecefe8]"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="w-7 text-center text-[11px] font-bold text-[#314536]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Увеличить количество"
                    onClick={() =>
                      setQuantity((value) => Math.min(20, value + 1))
                    }
                    className="grid h-11 w-11 place-items-center rounded-full text-[#61715e] transition hover:bg-[#ecefe8]"
                  >
                    <Plus size={13} />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={!product.inStock}
                  className="button-primary min-w-[180px] flex-1 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {added ? (
                    <>
                      <Check size={15} /> Добавлено
                    </>
                  ) : (
                    "Добавить в корзину"
                  )}{" "}
                  <ArrowRight size={15} />
                </button>
              </div>
              <p className="mt-3 text-center text-[9px] text-[#999c90]">
                {quantity > 1
                  ? `${quantity} шт. · ${formatPrice(product.price * quantity)}`
                  : "Можно добавить в корзину и продолжить покупки"}
              </p>
            </div>

            <div className="mt-5 grid grid-cols-3 divide-x divide-[#e6e7df] rounded-[18px] bg-[#eceee7] px-2 py-4">
              <div className="flex flex-col items-center gap-2 text-center">
                <Truck size={17} strokeWidth={1.5} className="text-[#62795e]" />
                <span className="text-[8px] leading-4 text-[#758071] sm:text-[9px]">
                  Доставка
                  <br />
                  от 2 дней
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <RotateCcw
                  size={17}
                  strokeWidth={1.5}
                  className="text-[#62795e]"
                />
                <span className="text-[8px] leading-4 text-[#758071] sm:text-[9px]">
                  Возврат
                  <br />
                  14 дней
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <ShieldCheck
                  size={17}
                  strokeWidth={1.5}
                  className="text-[#62795e]"
                />
                <span className="text-[8px] leading-4 text-[#758071] sm:text-[9px]">
                  Контроль
                  <br />
                  качества
                </span>
              </div>
            </div>

            <div className="mt-9">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="eyebrow">Всё по делу</p>
                  <h2 className="mt-2 font-serif text-[26px] tracking-[-.045em] text-[#2d3b30]">
                    Характеристики
                  </h2>
                </div>
                <span className="text-[9px] text-[#a0a296]">
                  {product.characteristics.length} параметра
                </span>
              </div>
              <dl className="mt-4">
                {product.characteristics.map((item) => (
                  <div
                    key={item.label}
                    className="flex justify-between gap-4 border-b border-[#e9e7df] py-3.5 text-[10px]"
                  >
                    <dt className="text-[#96998d]">{item.label}</dt>
                    <dd className="text-right font-semibold text-[#536452]">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <Link
              href="/catalog"
              className="mt-6 inline-flex items-center gap-2 text-[10px] font-bold text-[#778574] transition hover:text-[#294638]"
            >
              <ArrowLeft size={13} /> Вернуться к каталогу
            </Link>
          </div>
        </div>
      </Container>

      {related.length > 0 && (
        <section className="mt-12 bg-[#eeede6] py-14 sm:py-[78px]">
          <Container>
            <div className="mb-8 flex items-end justify-between gap-5">
              <div>
                <p className="eyebrow">В том же настроении</p>
                <h2 className="section-title mt-3">Вам может понравиться</h2>
              </div>
              <Link href="/catalog" className="link-arrow">
                Весь каталог <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:grid-cols-2 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {zoomOpen && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[#17231c]/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Увеличенное изображение товара"
        >
          <button
            type="button"
            onClick={() => setZoomOpen(false)}
            aria-label="Закрыть изображение"
            className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
          >
            <X size={20} />
          </button>
          <div className="relative h-[min(86vh,900px)] w-full max-w-[900px]">
            <Image
              src={product.images[activeImage] ?? product.image}
              alt={product.name}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
