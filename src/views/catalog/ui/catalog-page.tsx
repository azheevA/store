"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  ArrowRight,
} from "lucide-react";
import { products, categories } from "@/entities/product/data/products";
import { ProductCard } from "@/widgets/product-card/ui/product-card";
import { Container } from "@/shared/ui/container";

const categoryImages: Record<string, string> = {
  all: "/images/brand/hero-interior.webp",
  kitchen: "/images/products/mug-oat.webp",
  decor: "/images/products/vase-arc.webp",
  lighting: "/images/products/lamp-stone.webp",
  textile: "/images/products/plaid-cream.webp",
  furniture: "/images/products/chair-nord.webp",
};

const formatCount = (count: number) =>
  `${count} ${count % 10 === 1 && count % 100 !== 11 ? "товар" : count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 12 || count % 100 > 14) ? "товара" : "товаров"}`;

const categoryDescriptions: Record<string, string> = {
  all: "Продуманные детали для пространства, в котором хочется быть",
  kitchen: "Посуда и аксессуары для красивых повседневных ритуалов",
  decor: "Небольшие акценты, которые меняют настроение комнаты",
  lighting: "Мягкий свет для спокойных вечеров и уютных уголков",
  textile: "Натуральные фактуры и приятные прикосновения",
  furniture: "Лаконичные формы и материалы, которые служат долго",
};

export function CatalogPage({
  initialQuery = "",
  initialCategory = "all",
  initialSort = "featured",
}: {
  initialQuery?: string;
  initialCategory?: string;
  initialSort?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const allowedSorts = ["featured", "new", "price-asc", "price-desc", "rating"];
  const [sort, setSort] = useState(
    allowedSorts.includes(initialSort) ? initialSort : "featured",
  );
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const validCategory = categories.some((item) => item.id === category)
    ? category
    : "all";
  const activeCategory =
    categories.find((item) => item.id === validCategory)?.label ?? "Все товары";

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("ru");
    const result = products.filter((product) => {
      const matchCategory =
        validCategory === "all" || product.category === validCategory;
      const matchQuery =
        !normalizedQuery ||
        `${product.name} ${product.subtitle} ${product.description} ${product.categoryLabel}`
          .toLocaleLowerCase("ru")
          .includes(normalizedQuery);
      const matchMinPrice =
        minPrice === "" || product.price >= Number(minPrice);
      const matchMaxPrice =
        maxPrice === "" || product.price <= Number(maxPrice);
      return (
        matchCategory &&
        matchQuery &&
        matchMinPrice &&
        matchMaxPrice &&
        (!onlyAvailable || product.inStock)
      );
    });
    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sort === "rating") result.sort((a, b) => b.rating - a.rating);
    if (sort === "new")
      result.sort(
        (a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)),
      );
    if (sort === "featured")
      result.sort(
        (a, b) => Number(Boolean(b.isPopular)) - Number(Boolean(a.isPopular)),
      );
    return result;
  }, [query, validCategory, sort, onlyAvailable, minPrice, maxPrice]);

  const hasFilters = Boolean(
    query ||
    validCategory !== "all" ||
    onlyAvailable ||
    minPrice ||
    maxPrice ||
    sort !== "featured",
  );
  const resetFilters = () => {
    setQuery("");
    setCategory("all");
    setSort("featured");
    setOnlyAvailable(false);
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <>
      <section className="px-4 pt-5 sm:px-6 sm:pt-7 lg:px-8">
        <Container className="max-w-370!">
          <div className="relative isolate grid min-h-67.5 overflow-hidden rounded-[25px] bg-[#e8e6dc] sm:min-h-82.5 md:grid-cols-[1fr_.85fr] lg:rounded-[30px]">
            <div className="relative z-10 flex flex-col items-start justify-center px-6 py-8 sm:px-10 sm:py-10 lg:px-14">
              <div className="mb-5 flex items-center gap-2 text-[9px] font-medium text-[#8e9387]">
                <Link href="/" className="transition hover:text-[#294638]">
                  Главная
                </Link>
                <span>/</span>
                <span className="text-[#536450]">Каталог</span>
              </div>
              <p className="eyebrow text-[#778270]!">
                Коллекция Лавки · {formatCount(products.length)}
              </p>
              <h1 className="page-title mt-4">
                {activeCategory === "Все товары" ? (
                  <>
                    Вещи для{" "}
                    <em className="font-normal text-[#74866f]">
                      уютной жизни.
                    </em>
                  </>
                ) : (
                  activeCategory
                )}
              </h1>
              <p className="mt-4 max-w-110 text-[11px] leading-6 text-[#7f8378] sm:text-[12px]">
                {categoryDescriptions[validCategory] ??
                  categoryDescriptions.all}
              </p>
            </div>
            <div className="relative min-h-45 overflow-hidden sm:min-h-55 md:min-h-full">
              <Image
                src={categoryImages[validCategory] ?? categoryImages.all}
                alt={`Коллекция категории ${activeCategory}`}
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#e8e6dc]/35 via-transparent to-transparent md:bg-linear-to-r md:from-[#e8e6dc]/20 md:to-transparent" />
              <span className="absolute bottom-5 right-5 rounded-full border border-white/60 bg-white/80 px-4 py-2 text-[8px] font-bold uppercase tracking-[.16em] text-[#596b58] shadow-sm backdrop-blur">
                Найдено с заботой
              </span>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-9 sm:py-14">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:mb-9 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Выбирайте в своём ритме</p>
            <h2 className="section-title mt-3">Найдите то самое</h2>
          </div>
          <p className="max-w-75 text-[10px] leading-5 text-[#929589] sm:text-right sm:text-[11px]">
            Подберите деталь, которая сделает привычное пространство немного
            ближе к вам.
          </p>
        </div>

        <div className="grid items-start gap-7 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-9">
          <aside className="soft-panel p-4 sm:p-5 lg:sticky lg:top-28">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#687664]">
                Категории
              </p>
              <SlidersHorizontal size={14} className="text-[#92998c]" />
            </div>
            <div className="hidden flex-col gap-1 lg:flex">
              {categories.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCategory(item.id)}
                  aria-pressed={validCategory === item.id}
                  className={`flex items-center justify-between rounded-xl px-3 py-3 text-left text-[10px] font-semibold transition ${validCategory === item.id ? "bg-[#e9eee7] text-[#294638]" : "text-[#758072] hover:bg-[#f4f3ed]"}`}
                >
                  <span>{item.label}</span>
                  <span className="text-[9px] text-[#a1a597]">
                    {item.count}
                  </span>
                </button>
              ))}
            </div>
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:hidden">
              {categories.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCategory(item.id)}
                  aria-pressed={validCategory === item.id}
                  className={`shrink-0 rounded-full px-4 py-2.5 text-[9px] font-bold transition ${validCategory === item.id ? "bg-[#294638] text-white" : "bg-[#f1f0e9] text-[#748070]"}`}
                >
                  {item.label}{" "}
                  <span className="ml-1 opacity-60">{item.count}</span>
                </button>
              ))}
            </div>
            <div className="my-5 border-t border-[#eceae2]" />
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[.16em] text-[#687664]">
              Цена, ₽
            </p>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
              <label className="block">
                <span className="mb-1 block text-[9px] text-[#a0a396]">От</span>
                <input
                  aria-label="От — минимальная цена"
                  type="number"
                  min="0"
                  value={minPrice}
                  onChange={(event) => setMinPrice(event.target.value)}
                  placeholder="0"
                  className="h-10 w-full rounded-xl border border-[#e8e6de] bg-[#faf9f5] px-3 text-[11px] text-[#354538] outline-none transition focus:border-[#afbeaa]"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-[9px] text-[#a0a396]">До</span>
                <input
                  aria-label="До — максимальная цена"
                  type="number"
                  min="0"
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(event.target.value)}
                  placeholder="Без лимита"
                  className="h-10 w-full rounded-xl border border-[#e8e6de] bg-[#faf9f5] px-3 text-[11px] text-[#354538] outline-none transition focus:border-[#afbeaa]"
                />
              </label>
            </div>
            <div className="my-5 border-t border-[#eceae2]" />
            <label className="flex cursor-pointer items-center gap-2.5 text-[10px] font-medium text-[#687568]">
              <input
                type="checkbox"
                checked={onlyAvailable}
                onChange={(event) => setOnlyAvailable(event.target.checked)}
                className="h-4 w-4 rounded accent-[#294638]"
              />{" "}
              Только в наличии
            </label>
            {hasFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.12em] text-[#8b927f] transition hover:text-[#294638]"
              >
                <RotateCcw size={12} /> Сбросить фильтры
              </button>
            )}
          </aside>

          <div className="min-w-0">
            <div className="flex flex-col gap-3 border-b border-[#e7e5dd] pb-4 sm:flex-row sm:items-center sm:justify-between">
              <label className="flex h-11 min-w-0 flex-1 items-center gap-3 rounded-full border border-[#e7e5dd] bg-[#fffefa] px-4 transition focus-within:border-[#bac6b5] sm:max-w-95">
                <Search size={15} className="shrink-0 text-[#8c9487]" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Поиск по коллекции..."
                  className="w-full bg-transparent text-[10px] text-[#354538] outline-none placeholder:text-[#a5a79c]"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Очистить поиск"
                    className="text-[#8c9487]"
                  >
                    <X size={13} />
                  </button>
                )}
              </label>
              <div className="flex items-center justify-between gap-3">
                <p className="text-[10px] text-[#96998d]">
                  Найдено{" "}
                  <strong className="text-[#4f5e4f]">
                    {filteredProducts.length}
                  </strong>{" "}
                  товаров
                </p>
                <label className="flex h-10 items-center gap-2 rounded-full border border-[#e7e5dd] bg-[#fffefa] px-3">
                  <SlidersHorizontal size={13} className="text-[#879082]" />
                  <select
                    value={sort}
                    onChange={(event) => setSort(event.target.value)}
                    aria-label="Сортировка товаров"
                    className="max-w-37.5 bg-transparent text-[9px] font-semibold text-[#586657] outline-none"
                  >
                    <option value="featured">Сначала популярные</option>
                    <option value="new">Сначала новинки</option>
                    <option value="price-asc">Сначала дешевле</option>
                    <option value="price-desc">Сначала дороже</option>
                    <option value="rating">По рейтингу</option>
                  </select>
                </label>
              </div>
            </div>
            <div className="mt-6">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:grid-cols-2 sm:gap-x-5 lg:grid-cols-3 lg:gap-x-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="rounded-3xl border border-dashed border-[#d7d9cf] bg-[#fffefa] px-5 py-20 text-center">
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#edf0e8] text-[#647660]">
                    <Search size={20} />
                  </span>
                  <p className="mt-5 font-serif text-3xl text-[#344c3c]">
                    Ничего не нашлось
                  </p>
                  <p className="mt-3 text-[11px] text-[#858f83]">
                    Попробуйте изменить запрос или выбрать другую категорию.
                  </p>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="button-outline mt-7"
                  >
                    Сбросить фильтры <ArrowRight size={13} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
