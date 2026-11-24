"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "@/app/store";
import { restoreCart } from "@/features/cart/model/cart-slice";
import { restoreFavorites } from "@/features/favorites/model/favorites-slice";

const CART_KEY = "lavka-cart-v1";
const FAVORITES_KEY = "lavka-favorites-v1";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [store] = useState<AppStore>(() => makeStore());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_KEY);
      const savedFavorites = localStorage.getItem(FAVORITES_KEY);
      if (savedCart)
        store.dispatch(
          restoreCart(
            JSON.parse(savedCart) as Array<{
              productId: string;
              quantity: number;
            }>,
          ),
        );
      if (savedFavorites)
        store.dispatch(
          restoreFavorites(JSON.parse(savedFavorites) as string[]),
        );
    } catch {
      localStorage.removeItem(CART_KEY);
      localStorage.removeItem(FAVORITES_KEY);
    } finally {
      setHydrated(true);
    }
  }, [store]);

  useEffect(() => {
    if (!hydrated) return;
    const persist = () => {
      const state = store.getState();
      localStorage.setItem(CART_KEY, JSON.stringify(state.cart.items));
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(state.favorites.ids));
    };
    persist();
    return store.subscribe(persist);
  }, [hydrated, store]);

  return <Provider store={store}>{children}</Provider>;
}
