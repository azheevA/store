import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/features/cart/model/cart-slice";
import favoritesReducer from "@/features/favorites/model/favorites-slice";

export const makeStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
      favorites: favoritesReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
