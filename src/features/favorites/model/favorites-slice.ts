import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type FavoritesState = { ids: string[] };

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: { ids: [] } as FavoritesState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<string>) {
      if (state.ids.includes(action.payload))
        state.ids = state.ids.filter((id) => id !== action.payload);
      else state.ids.push(action.payload);
    },
    restoreFavorites(state, action: PayloadAction<string[]>) {
      state.ids = [...new Set(action.payload.filter(Boolean))];
    },
  },
});

export const { toggleFavorite, restoreFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
