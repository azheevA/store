import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type CartItem = { productId: string; quantity: number };
type CartState = { items: CartItem[] };

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<string>) {
      const existing = state.items.find(
        (item) => item.productId === action.payload,
      );
      if (existing) existing.quantity += 1;
      else state.items.push({ productId: action.payload, quantity: 1 });
    },
    increaseQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find(
        (entry) => entry.productId === action.payload,
      );
      if (item) item.quantity += 1;
    },
    decreaseQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find(
        (entry) => entry.productId === action.payload,
      );
      if (!item) return;
      item.quantity -= 1;
      if (item.quantity <= 0)
        state.items = state.items.filter(
          (entry) => entry.productId !== action.payload,
        );
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload,
      );
    },
    clearCart(state) {
      state.items = [];
    },
    restoreCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload.filter(
        (item) =>
          item.productId &&
          Number.isInteger(item.quantity) &&
          item.quantity > 0,
      );
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  restoreCart,
} = cartSlice.actions;
export default cartSlice.reducer;
