import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { products } from "@/entities/product/data/products";
import { formatPrice } from "@/shared/lib/format-price";

const heroProduct =
  products.find((product) => product.slug === "ceramic-vase-sand") ??
  products[0];
const heroCategories = [
  { id: "kitchen", label: "Кухня" },
  { id: "decor", label: "Декор" },
  { id: "textile", label: "Текстиль" },
  { id: "lighting", label: "Свет" },
];

export function HomeHero() {
  return (
    <section
      aria-label="Лавка — предметы для дома"
      className="px-4 pb-9 pt-5 sm:px-6 sm:pb-11 sm:pt-7 lg:px-8"
    >
      <div className="mx-auto w-full max-w-[1480px]">
        {/* Desktop editorial composition */}
        <div className="group relative isolate hidden min-h-170 overflow-hidden rounded-[30px] border border-[#e1dfd5] bg-[#eeece4] shadow-[0_28px_85px_rgba(43,56,43,0.10)] md:block lg:min-h-185 lg:rounded-[38px]">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/images/brand/hero-interior.webp"
              alt="Светлая гостиная с натуральными материалами и спокойными оттенками"
              fill
              priority
              quality={95}
              sizes="(max-width: 1480px) 100vw, 1480px"
              className="object-cover object-[58%_center] transition-transform duration-[1800ms] ease-out group-hover:scale-[1.025]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#eeece4_0%,rgba(238,236,228,0.99)_22%,rgba(238,236,228,0.94)_36%,rgba(238,236,228,0.72)_49%,rgba(238,236,228,0.10)_69%,rgba(238,236,228,0.00)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(27,39,29,0.22)_0%,transparent_24%,transparent_100%)]" />
          </div>

          <div className="pointer-events-none absolute -left-[190px] -top-[245px] h-[590px] w-[590px] rounded-full border border-[#aeb8a8]/25" />
          <div className="pointer-events-none absolute -left-[115px] -top-[170px] h-[440px] w-[440px] rounded-full border border-[#aeb8a8]/20" />

          <div className="absolute right-8 top-8 z-20 flex items-center gap-3 rounded-full border border-white/70 bg-[#f8f7f1]/90 px-4 py-3 shadow-[0_8px_30px_rgba(36,48,37,0.08)] backdrop-blur-xl lg:right-10 lg:top-10">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#819477] opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#71876c]" />
            </span>
            <span className="text-[9px] font-bold uppercase tracking-[.18em] text-[#596b57]">
              Новая коллекция
            </span>
            <span className="h-3 w-px bg-[#d9ddd3]" />
            <span className="text-[9px] font-semibold tracking-[.12em] text-[#929789]">
              01 / 2026
            </span>
          </div>

          <div className="relative z-10 flex min-h-170 items-center lg:min-h-185">
            <div className="w-full max-w-185 px-8 py-12 sm:px-12 lg:px-[5.5%] lg:py-14">
              <div className="flex items-center gap-3.5">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-[#c7d0c1] bg-white/35 text-[#5e765d]">
                  <Sparkles size={17} strokeWidth={1.35} />
                </span>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[.22em] text-[#647660]">
                    Лавка · магазин вещей для жизни
                  </p>
                  <p className="mt-1 text-[10px] text-[#9a9d90]">
                    Небольшие детали. Большое ощущение дома.
                  </p>
                </div>
              </div>

              <p className="mt-10 text-[9px] font-bold uppercase tracking-[.25em] text-[#8b9383] lg:mt-11">
                Вещи с характером и смыслом
              </p>
              <h1
                id="home-hero-title-desktop"
                className="mt-4 max-w-162.5 font-serif text-[clamp(4.05rem,6.8vw,6.8rem)] leading-[.80] tracking-[-.095em] text-[#283a30]"
              >
                Предметы,
                <br />
                которые
                <br />
                <em className="inline-block pt-2 font-normal text-[#819078]">
                  остаются.
                </em>
              </h1>

              <p className="mt-6 max-w-97.5 text-[13px] leading-[1.95] text-[#737b70] lg:text-[14px]">
                Для тихих утр, долгих вечеров и всего, из чего складывается дом.
                Выбираем простые формы, приятные материалы и вещи на каждый
                день.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3">
                <Link
                  href="/catalog"
                  className="group/cta inline-flex min-h-14 items-center gap-5 rounded-full bg-[#294638] px-7 text-[11px] font-bold tracking-[.015em] text-white shadow-[0_12px_28px_rgba(41,70,56,0.16)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#1e3529] hover:shadow-[0_16px_34px_rgba(41,70,56,0.24)]"
                >
                  Исследовать коллекцию
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
                  />
                </Link>
                <Link
                  href="#about"
                  className="group/link inline-flex items-center gap-2 py-3 text-[10px] font-bold text-[#687966] transition-colors hover:text-[#294638]"
                >
                  Философия Лавки
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover/link:translate-x-1"
                  />
                </Link>
              </div>

              <div className="mt-8 flex max-w-120 items-center gap-4 border-t border-[#cfd3c8] pt-5">
                <span className="text-[9px] font-bold tracking-[.14em] text-[#778573]">
                  01—05
                </span>
                <span className="h-px w-8 bg-[#c1cabc]" />
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[9px] font-semibold uppercase tracking-[.12em] text-[#8b9185]">
                  {heroCategories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/catalog?category=${category.id}`}
                      className="transition-colors hover:text-[#294638]"
                    >
                      {category.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 right-8 z-20 w-[min(330px,42%)] rounded-[21px] border border-white/75 bg-[#f8f7f1]/95 p-3 shadow-[0_18px_55px_rgba(26,38,29,0.20)] backdrop-blur-xl transition-transform duration-500 group-hover:-translate-y-1 lg:bottom-10 lg:right-10">
            <Link
              href={`/product/${heroProduct.slug}`}
              className="flex items-center gap-3.5"
            >
              <span className="relative h-19 w-19 shrink-0 overflow-hidden rounded-[14px] bg-[#e9e5da]">
                <Image
                  src={heroProduct.image}
                  alt={heroProduct.name}
                  fill
                  sizes="76px"
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[8px] font-bold uppercase tracking-[.17em] text-[#8d9687]">
                  Выбор Лавки
                </span>
                <span className="mt-1.5 block truncate font-serif text-[19px] leading-none tracking-[-.035em] text-[#304435]">
                  {heroProduct.name}
                </span>
                <span className="mt-2 block text-[11px] font-semibold text-[#65745f]">
                  {formatPrice(heroProduct.price)}
                </span>
              </span>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#d7ddd2] text-[#536b53] transition duration-300 group-hover:bg-[#294638] group-hover:text-white">
                <ArrowUpRight size={15} />
              </span>
            </Link>
          </div>

          <span className="absolute bottom-9 left-10 z-10 hidden text-[8px] font-bold uppercase tracking-[.22em] text-[#8e9488] md:block lg:left-12">
            Простота вне времени · slow living
          </span>
        </div>

        {/* Mobile composition */}
        <div className="overflow-hidden rounded-[27px] border border-[#e1dfd5] bg-[#eeece4] shadow-[0_18px_48px_rgba(43,56,43,0.09)] md:hidden">
          <div className="relative h-63.75 overflow-hidden bg-[#d9d3c8] sm:h-92.5">
            <Image
              src="/images/brand/hero-interior.webp"
              alt="Светлая гостиная с натуральными материалами и спокойными оттенками"
              fill
              priority
              quality={95}
              sizes="100vw"
              className="object-cover object-[56%_center]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#1e2d22]/40 via-transparent to-[#1e2d22]/10" />
            <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/65 bg-[#f8f7f1]/90 px-3.5 py-2.5 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#71876c]" />
              <span className="text-[8px] font-bold uppercase tracking-[.15em] text-[#596b57]">
                Новая коллекция · 2026
              </span>
            </div>
            <div className="absolute bottom-4 right-4 rounded-[15px] border border-white/60 bg-[#f8f7f1]/90 px-4 py-3 shadow-lg backdrop-blur-md">
              <p className="font-serif text-[23px] italic leading-none text-[#344b39]">
                slow living
              </p>
              <p className="mt-1.5 text-[7px] font-bold uppercase tracking-[.15em] text-[#899082]">
                Искусство замечать простое
              </p>
            </div>
          </div>

          <div className="px-5 pb-7 pt-7 sm:px-9 sm:pb-9 sm:pt-9">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-[#c7d0c1] text-[#5e765d]">
                <Sparkles size={15} strokeWidth={1.35} />
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[.17em] text-[#647660]">
                Лавка · вещи для жизни
              </span>
            </div>
            <p className="mt-7 text-[8px] font-bold uppercase tracking-[.22em] text-[#8b9383]">
              Вещи с характером и смыслом
            </p>
            <h1
              id="home-hero-title-mobile"
              className="mt-4 font-serif text-[clamp(3.05rem,13.5vw,5.1rem)] leading-[.83] tracking-[-.09em] text-[#283a30]"
            >
              Предметы,
              <br />
              которые
              <br />
              <em className="inline-block pt-1 font-normal text-[#819078]">
                остаются.
              </em>
            </h1>
            <p className="mt-6 max-w-110 text-[12px] leading-[1.9] text-[#737b70] sm:text-[13px]">
              Для тихих утр, долгих вечеров и всего, из чего складывается дом.
              Простые формы, приятные материалы и вещи на каждый день.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link
                href="/catalog"
                className="inline-flex min-h-12.75 items-center gap-4 rounded-full bg-[#294638] px-6 text-[10px] font-bold text-white transition hover:bg-[#1e3529]"
              >
                Исследовать коллекцию <ArrowUpRight size={15} />
              </Link>
              <Link
                href="#about"
                className="inline-flex items-center gap-2 py-3 text-[10px] font-bold text-[#687966]"
              >
                О Лавке <ArrowRight size={13} />
              </Link>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[#cfd3c8] pt-5 text-[8px] font-bold uppercase tracking-[.13em] text-[#8b9185]">
              {heroCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/catalog?category=${category.id}`}
                  className="transition-colors hover:text-[#294638]"
                >
                  {category.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3 px-1 text-[8px] font-bold uppercase tracking-[.17em] text-[#929589] sm:mt-5 sm:text-[9px]">
          <span className="shrink-0">Дом начинается с малого</span>
          <span className="h-px flex-1 bg-[#deded4]" />
          <span className="shrink-0 text-right">
            Предметы для ежедневных радостей
          </span>
        </div>
      </div>
    </section>
  );
}
