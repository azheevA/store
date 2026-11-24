"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useAppSelector } from "@/app/store/hooks";
import { getProductById } from "@/entities/product/data/products";
import { ProductCard } from "@/widgets/product-card/ui/product-card";
import { Container } from "@/shared/ui/container";

export function FavoritesPage() {
  const ids = useAppSelector((state) => state.favorites.ids);
  const items = ids.map(getProductById).filter((item) => item !== undefined);
  return (
    <Container className="py-12 sm:py-16">
      <div className="mb-10 border-b border-[#e4e2d9] pb-6">
        <p className="eyebrow">То, что понравилось</p>
        <h1 className="page-title mt-3">Избранное</h1>
      </div>
      {items.length ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-[#e7ebe4] bg-white px-5 py-20 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#efeee8] text-[#52694f]">
            <Heart size={25} />
          </div>
          <h2 className="mt-6 font-serif text-3xl text-[#28362c]">
            Здесь будут ваши находки
          </h2>
          <p className="mt-3 text-sm text-[#85867e]">
            Нажмите на сердечко у товара, чтобы сохранить его.
          </p>
          <Link href="/catalog" className="button-primary mt-8 inline-flex">
            Открыть каталог
          </Link>
        </div>
      )}
    </Container>
  );
}
