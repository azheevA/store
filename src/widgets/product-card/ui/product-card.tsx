"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Heart, Star } from "lucide-react";
import type { Product } from "@/entities/product/model/types";
import { formatPrice } from "@/shared/lib/format-price";
import { AddToCartButton } from "@/features/cart/ui/add-to-cart-button";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { toggleFavorite } from "@/features/favorites/model/favorites-slice";

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((state) =>
    state.favorites.ids.includes(product.id),
  );
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null;

  return (
    <article className="product-card group min-w-0">
      <div className="product-card-image product-image relative overflow-hidden rounded-[17px] sm:rounded-[22px]">
        <Link
          href={`/product/${product.slug}`}
          className="block"
          aria-label={`Открыть товар ${product.name}`}
        >
          <div className="relative aspect-[.91/1] overflow-hidden sm:aspect-[.88/1]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority={priority}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.055]"
            />
          </div>
        </Link>

        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5 sm:left-4 sm:top-4">
          {product.isNew && (
            <span className="rounded-full border border-white/80 bg-[#fbfaf5]/90 px-3 py-1.5 text-[8px] font-bold uppercase tracking-widest text-[#49644b] shadow-sm backdrop-blur">
              Новинка
            </span>
          )}
          {discount !== null && (
            <span className="rounded-full bg-[#b97858] px-3 py-1.5 text-[8px] font-bold uppercase tracking-[.08em] text-white shadow-sm">
              −{discount}%
            </span>
          )}
          {product.isPopular && !product.oldPrice && !product.isNew && (
            <span className="rounded-full border border-white/70 bg-[#fbfaf5]/90 px-3 py-1.5 text-[8px] font-bold uppercase tracking-widest text-[#49644b] shadow-sm backdrop-blur">
              Бестселлер
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => dispatch(toggleFavorite(product.id))}
          aria-label={isFavorite ? "Убрать из избранного" : "В избранное"}
          aria-pressed={isFavorite}
          className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-white/60 shadow-sm backdrop-blur transition-all duration-300 hover:scale-105 sm:right-4 sm:top-4 ${isFavorite ? "bg-[#294638] text-white" : "bg-[#fbfaf5]/90 text-[#35483a] hover:bg-white"}`}
        >
          <Heart
            size={15}
            strokeWidth={1.7}
            fill={isFavorite ? "currentColor" : "none"}
          />
        </button>

        <Link
          href={`/product/${product.slug}`}
          aria-label={`Подробнее о товаре ${product.name}`}
          className="absolute bottom-3 right-3 grid h-9 w-9 translate-y-2 place-items-center rounded-full bg-[#fbfaf5]/95 text-[#294638] opacity-0 shadow-lg transition duration-300 hover:bg-[#294638] hover:text-white group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100 max-sm:hidden"
        >
          <ArrowUpRight size={15} />
        </Link>
      </div>

      <div className="px-0.5 pt-3.5 sm:pt-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[8px] font-bold uppercase tracking-[.17em] text-[#929589] sm:text-[9px]">
            {product.categoryLabel}
          </p>
          <span className="flex shrink-0 items-center gap-1 text-[9px] font-semibold text-[#727a6e]">
            <Star size={10} fill="#c99a4b" strokeWidth={0} />
            {product.rating.toFixed(1)}
            <span className="font-normal text-[#a4a79c]">
              ({product.reviewsCount})
            </span>
          </span>
        </div>

        <Link
          href={`/product/${product.slug}`}
          className="mt-2 block font-serif text-[17px] leading-[1.12] tracking-[-.035em] text-[#29372d] transition-colors hover:text-[#71876c] sm:text-[20px]"
        >
          {product.name}
        </Link>
        <p className="mt-1.5 truncate text-[10px] text-[#96988d] sm:text-[11px]">
          {product.subtitle}
        </p>

        <div className="mt-3 flex min-h-7 items-baseline gap-2">
          <p className="text-[13px] font-bold tracking-tight text-[#2c362d] sm:text-[15px]">
            {formatPrice(product.price)}
          </p>
          {product.oldPrice && (
            <p className="text-[10px] text-[#a5a69b] line-through">
              {formatPrice(product.oldPrice)}
            </p>
          )}
        </div>
        <div className="mt-3">
          <AddToCartButton productId={product.id} compact />
        </div>
      </div>
    </article>
  );
}
