import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Clock3,
  Headphones,
  PackageCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { products, categories } from "@/entities/product/data/products";
import { ProductCard } from "@/widgets/product-card/ui/product-card";
import { Container } from "@/shared/ui/container";
import { HomeHero } from "./home-hero";

const categoryCards = [
  {
    id: "kitchen",
    label: "Кухня",
    note: "Красивые повседневные ритуалы",
    image: "/images/products/mug-oat.webp",
    number: "01",
    tone: "from-[#eeece4] to-[#e6e1d5]",
  },
  {
    id: "decor",
    label: "Декор",
    note: "Акценты с характером",
    image: "/images/products/vase-sand.webp",
    number: "02",
    tone: "from-[#ece9e0] to-[#e2ded2]",
  },
  {
    id: "lighting",
    label: "Освещение",
    note: "Тёплый свет и атмосфера",
    image: "/images/products/lamp-stone.webp",
    number: "03",
    tone: "from-[#efede7] to-[#e5e2d9]",
  },
  {
    id: "textile",
    label: "Текстиль",
    note: "Мягкость в каждой детали",
    image: "/images/products/plaid-cream.webp",
    number: "04",
    tone: "from-[#efebe3] to-[#e4dfd4]",
  },
  {
    id: "furniture",
    label: "Мебель",
    note: "Форма, функция, комфорт",
    image: "/images/products/chair-nord.webp",
    number: "05",
    tone: "from-[#ece9e1] to-[#e1ded5]",
  },
];

const benefits = [
  {
    icon: PackageCheck,
    title: "Бережная доставка",
    text: "Бесплатно от 5 000 ₽",
  },
  {
    icon: ShieldCheck,
    title: "Вещи с характером",
    text: "Продуманные материалы",
  },
  { icon: Clock3, title: "Без спешки", text: "Выбирайте в своём ритме" },
  { icon: Headphones, title: "Мы рядом", text: "Поддержка каждый день" },
];

function formatCategoryCount(count: number) {
  const lastTwo = count % 100;
  const last = count % 10;
  if (lastTwo >= 11 && lastTwo <= 14) return `${count} товаров`;
  if (last === 1) return `${count} товар`;
  if (last >= 2 && last <= 4) return `${count} товара`;
  return `${count} товаров`;
}

export function HomePage() {
  const featured = products.filter((product) => product.isPopular).slice(0, 4);
  const newProducts = products.filter((product) => product.isNew).slice(0, 4);

  return (
    <>
      <HomeHero />

      {/* Brand promises */}
      <section className="border-y border-[#e9e7df] bg-[#fbfaf6] py-6 sm:py-8">
        <Container className="grid grid-cols-2 gap-x-5 gap-y-6 sm:grid-cols-4 sm:gap-5">
          {benefits.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-3 sm:gap-3.5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#edf0e9] text-[#597056] sm:h-11 sm:w-11">
                <Icon size={17} strokeWidth={1.5} />
              </span>
              <div>
                <p className="text-[10px] font-bold text-[#354439] sm:text-[11px]">
                  {title}
                </p>
                <p className="mt-1 text-[9px] leading-4 text-[#929589] sm:text-[10px]">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </Container>
      </section>

      {/* Categories */}
      <section id="categories" className="py-14 sm:py-20.5 lg:py-24">
        <Container>
          <div className="mb-7 flex items-end justify-between gap-5 sm:mb-9">
            <div>
              <p className="eyebrow">Найдите своё настроение</p>
              <h2 className="section-title mt-3">Комнаты и ритуалы</h2>
              <p className="mt-3 max-w-97.5 text-[11px] leading-6 text-[#898d81] sm:text-[12px]">
                Собрали вещи, которые легко становятся частью повседневной
                жизни.
              </p>
            </div>
            <Link
              href="/catalog"
              className="link-arrow hidden shrink-0 sm:inline-flex"
            >
              Все категории <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
            {categoryCards.map((category) => {
              const count =
                categories.find((item) => item.id === category.id)?.count ?? 0;
              return (
                <Link
                  key={category.id}
                  href={`/catalog?category=${category.id}`}
                  className={`category-card group relative min-h-55 overflow-hidden rounded-[20px] border border-[#e6e3da] bg-linear-to-br ${category.tone} p-4 transition duration-500 hover:-translate-y-1 hover:shadow-[0_18px_40px_#27372c12] sm:min-h-65 sm:rounded-[23px] sm:p-5 lg:min-h-71.25`}
                >
                  <span className="absolute left-4 top-4 z-10 text-[9px] font-bold tracking-[.16em] text-[#929589] sm:left-5 sm:top-5">
                    {category.number}
                  </span>
                  <span className="absolute right-4 top-4 z-10 text-[8px] font-medium text-[#999b90] sm:right-5 sm:top-5 sm:text-[9px]">
                    {formatCategoryCount(count)}
                  </span>
                  <div className="absolute inset-x-0 bottom-7 top-8 flex items-center justify-center overflow-hidden sm:bottom-9 sm:top-10">
                    <Image
                      src={category.image}
                      alt={category.label}
                      fill
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 19vw"
                      className="object-contain p-3 transition-transform duration-700 ease-out group-hover:scale-[1.08] sm:p-4"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-2 px-4 pb-4 pt-12 sm:px-5 sm:pb-5">
                    <div className="min-w-0">
                      <h3 className="font-serif text-[21px] leading-none tracking-[-.045em] text-[#29362c] sm:text-[25px]">
                        {category.label}
                      </h3>
                      <p className="mt-2 hidden text-[9px] text-[#81867a] sm:block">
                        {category.note}
                      </p>
                    </div>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#cbd1c5] text-[#53684f] transition duration-300 group-hover:border-[#294638] group-hover:bg-[#294638] group-hover:text-white">
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
          <Link
            href="/catalog"
            className="link-arrow mt-5 inline-flex sm:hidden"
          >
            Все категории <ArrowUpRight size={15} />
          </Link>
        </Container>
      </section>

      {/* Bestsellers */}
      <section
        id="popular"
        className="bg-[#eeede6] py-14 sm:py-20.5 lg:py-23.5"
      >
        <Container>
          <div className="mb-8 flex flex-col justify-between gap-5 sm:mb-10 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">С любовью выбранное</p>
              <h2 className="section-title mt-3">Любимые предметы</h2>
              <p className="mt-3 max-w-107.5 text-[11px] leading-6 text-[#85877c] sm:text-[12px]">
                Вещи, которые быстро становятся частью привычного дня. Начните с
                того, что понравилось с первого взгляда.
              </p>
            </div>
            <Link
              href="/catalog"
              className="link-arrow self-start sm:self-auto"
            >
              Смотреть всю коллекцию <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
            {featured.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={index < 2}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Editorial brand story */}
      <section
        id="about"
        className="px-4 py-14 sm:px-6 sm:py-21.5 lg:px-8 lg:py-25"
      >
        <Container className="max-w-370!">
          <div className="editorial-panel grid overflow-hidden rounded-[26px] bg-[#294638] md:min-h-117.5 md:grid-cols-[.93fr_1.07fr] lg:rounded-4xl">
            <div className="relative z-10 flex flex-col items-start justify-center px-7 py-11 text-[#f7f6ef] sm:px-11 sm:py-14 lg:px-[clamp(44px,5.5vw,82px)]">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3.5 py-2 text-[8px] font-bold uppercase tracking-[.19em] text-[#cbd5c4]">
                <Sparkles size={12} /> История Лавки
              </span>
              <h2 className="mt-7 max-w-117.5 font-serif text-[clamp(2.8rem,5.2vw,4.9rem)] leading-[.91] tracking-[-.075em]">
                Вещи, которые{" "}
                <em className="font-normal text-[#c0cdb6]">делают дом.</em>
              </h2>
              <p className="mt-6 max-w-97.5 text-[12px] leading-7 text-white/65 sm:text-[13px]">
                Мы верим в красоту повседневного. В любимую чашку утром, мягкий
                плед вечером и свет, который делает комнату теплее. Выбираем не
                много — выбираем внимательно.
              </p>
              <Link
                href="/catalog"
                className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#f6f4ed] px-6 text-[10px] font-bold text-[#294638] transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg"
              >
                Выбрать свои детали <ArrowUpRight size={15} />
              </Link>
              <span className="mt-9 text-[8px] font-semibold uppercase tracking-[.2em] text-white/35">
                Лавка · вещи для дома и жизни
              </span>
            </div>
            <div className="editorial-image relative min-h-75 overflow-hidden md:min-h-full">
              <Image
                src="/images/products/plaid-cream.webp"
                alt="Мягкий фактурный плед молочного оттенка"
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                className="object-cover transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#1b2c21]/20 via-transparent to-transparent md:bg-linear-to-l md:from-transparent md:to-[#294638]/20" />
              <div className="absolute bottom-6 left-6 rounded-full border border-white/60 bg-[#f8f6ef]/90 px-4 py-2.5 text-[8px] font-bold uppercase tracking-[.16em] text-[#51664e] shadow-lg backdrop-blur sm:bottom-8 sm:left-8 sm:text-[9px]">
                Тактильность. Простота. Тепло.
              </div>
              <span className="absolute right-7 top-7 hidden font-serif text-[58px] italic leading-none text-white/80 drop-shadow md:block">
                л.
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* New arrivals */}
      <section className="pb-14 pt-1 sm:pb-22.5">
        <Container>
          <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
            <div>
              <p className="eyebrow">Только появились</p>
              <h2 className="section-title mt-3">Свежие находки</h2>
              <p className="mt-3 text-[11px] leading-6 text-[#898d81] sm:text-[12px]">
                Новые детали, которые уже хочется забрать домой.
              </p>
            </div>
            <Link href="/catalog?sort=new" className="link-arrow">
              Все новинки <ArrowUpRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>

      {/* Final invitation */}
      <section className="px-4 pb-14 sm:px-6 sm:pb-20.5 lg:px-8">
        <Container className="max-w-370!">
          <div className="relative isolate overflow-hidden rounded-[26px] bg-[#e9e9df] px-7 py-10 sm:px-12 sm:py-14 lg:rounded-4xl lg:px-16 lg:py-16.5">
            <div className="relative z-10 flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
              <div>
                <p className="eyebrow">Немного вдохновения каждый день</p>
                <h2 className="mt-3 max-w-155 font-serif text-[clamp(2.1rem,4.1vw,3.8rem)] leading-[.98] tracking-[-.07em] text-[#2c3b2e]">
                  Пусть дома будет{" "}
                  <em className="font-normal text-[#70846c]">хорошо.</em>
                </h2>
                <p className="mt-4 max-w-115 text-[11px] leading-6 text-[#7e8478] sm:text-[12px]">
                  Загляните в коллекцию и найдите детали, которые будут радовать
                  каждый день.
                </p>
              </div>
              <Link href="/catalog" className="button-primary shrink-0">
                Найти свою вещь <ArrowUpRight size={15} />
              </Link>
            </div>
            <div className="pointer-events-none absolute -right-10 -top-24 h-72 w-72 rounded-full border border-[#d0d4c9] sm:-right-5 sm:-top-32 sm:h-107.5 sm:w-107.5" />
            <div className="pointer-events-none absolute -right-2 -top-16 h-52 w-52 rounded-full border border-[#d0d4c9] sm:right-10 sm:-top-24 sm:h-75 sm:w-75" />
            <span className="pointer-events-none absolute -bottom-14.5 right-[31%] hidden font-serif text-[150px] italic leading-none text-[#d8dbd0]/60 lg:block">
              л.
            </span>
          </div>
        </Container>
      </section>
    </>
  );
}
