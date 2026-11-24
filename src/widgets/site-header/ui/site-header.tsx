"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import {
  ArrowUpRight,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  X,
} from "lucide-react";
import { Container } from "@/shared/ui/container";
import { useAppSelector } from "@/app/store/hooks";
import { CartDrawer } from "@/widgets/cart-drawer/ui/cart-drawer";

const links = [
  { href: "/", label: "Главная" },
  { href: "/catalog", label: "Каталог" },
  { href: "/#popular", label: "Бестселлеры" },
  { href: "/#about", label: "О Лавке" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [query, setQuery] = useState("");
  const closeCart = useCallback(() => setCartOpen(false), []);
  const cartCount = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0),
  );
  const favoritesCount = useAppSelector((state) => state.favorites.ids.length);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="announcement-bar bg-[#294638] text-white">
        <Container className="flex min-h-8 items-center justify-between gap-3 text-[9px] sm:min-h-8.5 sm:text-[10px]">
          <span className="flex items-center gap-2">
            <span className="grid h-4 w-4 place-items-center rounded-full bg-[#c2d0b9] text-[9px] font-bold text-[#263c2e]">
              %
            </span>
            <span className="font-medium tracking-[.035em]">
              Бесплатная доставка при заказе от 5 000 ₽
            </span>
          </span>
          <span className="hidden text-white/55 sm:block">
            Вещи для дома с вниманием к деталям
          </span>
        </Container>
      </div>

      <header className="site-header sticky top-0 z-50 border-b border-[#e8e6de]/90 bg-[#f8f7f2]/95 backdrop-blur-xl">
        <Container className="flex min-h-18 items-center gap-3 py-2.5 sm:gap-5 lg:min-h-20 lg:gap-7">
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menuOpen}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-[#304a37] transition hover:bg-[#ecefe8] xl:hidden"
          >
            {menuOpen ? (
              <X size={20} strokeWidth={1.6} />
            ) : (
              <Menu size={20} strokeWidth={1.6} />
            )}
          </button>

          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2.5"
            aria-label="Лавка — на главную"
          >
            <span className="grid h-10 w-10 place-items-center rounded-[13px] bg-[#294638] font-serif text-[25px] italic text-white shadow-sm transition duration-300 group-hover:rotate-[-5deg]">
              л
            </span>
            <span className="font-serif text-[29px] font-bold leading-none tracking-[-.08em] text-[#28352b]">
              лавка<span className="text-[#829779]">.</span>
            </span>
          </Link>

          <nav
            aria-label="Основная навигация"
            className="hidden shrink-0 items-center gap-6 xl:flex 2xl:gap-8"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link relative py-2 text-[10px] font-bold text-[#687266] transition hover:text-[#294638]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <form
            action="/catalog"
            className="header-search ml-auto hidden h-11 min-w-47.5 max-w-107.5 flex-1 items-center gap-3 rounded-full border border-[#e5e4db] bg-[#efeee8] px-4 transition focus-within:border-[#bdc8b8] xl:flex"
          >
            <Search size={16} className="shrink-0 text-[#81897b]" />
            <input
              name="q"
              placeholder="Что ищем сегодня?"
              aria-label="Что ищем сегодня?"
              className="h-full w-full bg-transparent text-[11px] text-[#344337] outline-none placeholder:text-[#a1a397]"
            />
            <button
              type="submit"
              aria-label="Найти"
              className="text-[#74836f] transition hover:text-[#294638]"
            >
              <ArrowUpRight size={16} />
            </button>
          </form>

          <div className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-1 xl:ml-0">
            <button
              type="button"
              onClick={() => {
                setSearchOpen((value) => !value);
                setMenuOpen(false);
              }}
              aria-label={searchOpen ? "Закрыть поиск" : "Открыть поиск"}
              aria-expanded={searchOpen}
              className="grid h-10 w-10 place-items-center rounded-full text-[#34483a] transition hover:bg-[#ecefe8] xl:hidden"
            >
              {searchOpen ? (
                <X size={18} strokeWidth={1.6} />
              ) : (
                <Search size={18} strokeWidth={1.6} />
              )}
            </button>

            <Link
              href="/favorites"
              aria-label={`Избранное${favoritesCount ? `, ${favoritesCount}` : ""}`}
              className="header-icon relative grid h-10 w-10 place-items-center rounded-full text-[#34483a] transition hover:bg-[#ecefe8]"
            >
              <Heart size={18} strokeWidth={1.6} />
              {favoritesCount > 0 && (
                <span className="absolute right-0 top-0 grid h-4.25 min-w-4.25 place-items-center rounded-full bg-[#b97858] px-1 text-[9px] font-bold text-white">
                  {favoritesCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={`Открыть корзину${cartCount ? `, ${cartCount} товаров` : ""}`}
              className="header-icon relative grid h-10 w-10 place-items-center rounded-full text-[#34483a] transition hover:bg-[#ecefe8]"
            >
              <ShoppingBag size={18} strokeWidth={1.6} />
              {cartCount > 0 && (
                <span className="absolute right-0 top-0 grid h-4.25 min-w-4.25 place-items-center rounded-full bg-[#294638] px-1 text-[9px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>

            <Link
              href="/catalog"
              className="ml-1 hidden h-10 items-center gap-2 rounded-full border border-[#d9ddd3] px-4 text-[10px] font-bold text-[#526650] transition hover:border-[#294638] hover:bg-[#294638] hover:text-white sm:inline-flex"
            >
              В магазин <ArrowUpRight size={13} />
            </Link>
          </div>
        </Container>

        {searchOpen && (
          <div className="border-t border-[#e9e7df] bg-[#f8f7f2] py-3 xl:hidden">
            <Container>
              <form
                action="/catalog"
                className="flex h-11 items-center gap-3 rounded-full border border-[#dedfd5] bg-[#efeee8] px-4"
              >
                <Search size={16} className="shrink-0 text-[#81897b]" />
                <input
                  name="q"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  autoFocus
                  placeholder="Название товара или категория"
                  aria-label="Название товара или категория"
                  className="h-full min-w-0 flex-1 bg-transparent text-[11px] outline-none placeholder:text-[#a1a397]"
                />
                <button
                  type="submit"
                  className="text-[10px] font-bold text-[#294638]"
                >
                  Найти
                </button>
              </form>
            </Container>
          </div>
        )}

        {menuOpen && (
          <div className="absolute inset-x-0 top-full border-b border-[#e9e7df] bg-[#f8f7f2] px-5 py-5 shadow-[0_18px_35px_#26382d12] xl:hidden">
            <Container>
              <nav
                aria-label="Мобильная навигация"
                className="grid gap-1 sm:grid-cols-2"
              >
                {links.map((link) => (
                  <Link
                    key={link.href}
                    onClick={closeMenu}
                    href={link.href}
                    className="rounded-xl px-3 py-3 text-[13px] font-semibold text-[#344c3c] transition hover:bg-[#edf0e9]"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  onClick={closeMenu}
                  href="/favorites"
                  className="rounded-xl px-3 py-3 text-[13px] font-semibold text-[#344c3c] transition hover:bg-[#edf0e9]"
                >
                  Избранное {favoritesCount > 0 && `(${favoritesCount})`}
                </Link>
                <button
                  onClick={() => {
                    setCartOpen(true);
                    closeMenu();
                  }}
                  type="button"
                  className="rounded-xl px-3 py-3 text-left text-[13px] font-semibold text-[#344c3c] transition hover:bg-[#edf0e9]"
                >
                  Корзина {cartCount > 0 && `(${cartCount})`}
                </button>
              </nav>
            </Container>
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={closeCart} />
    </>
  );
}
