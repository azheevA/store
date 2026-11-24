import Link from "next/link";
import { ArrowUpRight, Heart, Send, ShoppingBag } from "lucide-react";
import { Container } from "@/shared/ui/container";
import { siteConfig } from "@/shared/config/site";

const footerLinkClass =
  "w-fit text-[11px] text-white/60 transition-colors duration-200 hover:text-white";

export function SiteFooter() {
  return (
    <footer className="site-footer mt-2 bg-[#263b2e] text-[#f7f6ef]">
      <Container className="grid gap-11 py-12 sm:py-16 md:grid-cols-[1.3fr_.8fr_.9fr_1fr] md:gap-8 lg:py-19">
        <div>
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5"
            aria-label="Лавка — на главную"
          >
            <span className="grid h-10 w-10 place-items-center rounded-[13px] border border-white/25 font-serif text-[24px] italic transition group-hover:bg-white/10">
              л
            </span>
            <span className="font-serif text-[31px] font-bold tracking-[-.08em]">
              лавка<span className="text-[#aebe9e]">.</span>
            </span>
          </Link>
          <p className="mt-5 max-w-72.5 text-[11px] leading-6 text-white/55">
            Предметы для дома, которые делают каждый день немного уютнее.
            Маленькие вещи — большое настроение.
          </p>
          <div className="mt-6 flex gap-2">
            <a
              href={`mailto:${siteConfig.email}`}
              aria-label="Написать нам"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-white/70 transition hover:border-white/50 hover:bg-white/10 hover:text-white"
            >
              <Send size={14} />
            </a>
            <Link
              href="/catalog"
              aria-label="Открыть каталог"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-white/70 transition hover:border-white/50 hover:bg-white/10 hover:text-white"
            >
              <ShoppingBag size={14} />
            </Link>
            <Link
              href="/favorites"
              aria-label="Избранное"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-white/70 transition hover:border-white/50 hover:bg-white/10 hover:text-white"
            >
              <Heart size={14} />
            </Link>
          </div>
        </div>

        <div>
          <p className="mb-5 text-[9px] font-bold uppercase tracking-[.2em] text-white/35">
            Коллекция
          </p>
          <div className="flex flex-col gap-3">
            <Link className={footerLinkClass} href="/catalog">
              Все товары
            </Link>
            <Link className={footerLinkClass} href="/catalog?category=kitchen">
              Кухня
            </Link>
            <Link className={footerLinkClass} href="/catalog?category=decor">
              Декор
            </Link>
            <Link className={footerLinkClass} href="/catalog?category=textile">
              Текстиль
            </Link>
            <Link className={footerLinkClass} href="/catalog?category=lighting">
              Освещение
            </Link>
            <Link
              className={footerLinkClass}
              href="/catalog?category=furniture"
            >
              Мебель
            </Link>
          </div>
        </div>

        <div>
          <p className="mb-5 text-[9px] font-bold uppercase tracking-[.2em] text-white/35">
            Покупателям
          </p>
          <div className="flex flex-col gap-3">
            <Link className={footerLinkClass} href="/cart">
              Корзина
            </Link>
            <Link className={footerLinkClass} href="/favorites">
              Избранное
            </Link>
            <Link className={footerLinkClass} href="/checkout">
              Оформление заказа
            </Link>
            <a
              className={footerLinkClass}
              href={`mailto:${siteConfig.email}?subject=Доставка%20и%20оплата`}
            >
              Доставка и оплата
            </a>
            <a className={footerLinkClass} href={`mailto:${siteConfig.email}`}>
              Помощь <ArrowUpRight className="ml-1 inline" size={11} />
            </a>
          </div>
        </div>

        <div>
          <p className="mb-5 text-[9px] font-bold uppercase tracking-[.2em] text-white/35">
            Будем на связи
          </p>
          <p className="max-w-55 text-[11px] leading-6 text-white/55">
            Подскажем с выбором и ответим на вопросы о товарах.
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-4 inline-flex items-center gap-2 text-[12px] text-white transition hover:text-[#c5d5bb]"
          >
            {siteConfig.email} <ArrowUpRight size={13} />
          </a>
          <a
            href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
            className="mt-2 block w-fit text-[12px] text-white/75 transition hover:text-white"
          >
            {siteConfig.phone}
          </a>
          <p className="mt-3 text-[9px] text-white/40">
            Ежедневно · 10:00–20:00
          </p>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col justify-between gap-3 py-5 text-[9px] tracking-[.04em] text-white/35 sm:flex-row">
          <span>
            © {new Date().getFullYear()} Лавка. Демонстрационный проект.
          </span>
          <span>
            Создано с вниманием к деталям{" "}
            <span className="px-1 text-[#bd8060]">♥</span>
          </span>
        </Container>
      </div>
    </footer>
  );
}
