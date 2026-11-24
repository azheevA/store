import { describe, expect, it } from "vitest";
import cartReducer, {
  addToCart,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  restoreCart,
} from "@/features/cart/model/cart-slice";

describe("cart reducer", () => {
  it("starts with an empty cart", () => {
    expect(cartReducer(undefined, { type: "unknown" })).toEqual({ items: [] });
  });

  it("adds a product and increments an existing product", () => {
    const firstAdd = cartReducer(undefined, addToCart("p-001"));
    const secondAdd = cartReducer(firstAdd, addToCart("p-001"));

    expect(secondAdd.items).toEqual([{ productId: "p-001", quantity: 2 }]);
  });

  it("keeps different products as separate cart entries", () => {
    const state = cartReducer(
      cartReducer(undefined, addToCart("p-001")),
      addToCart("p-002"),
    );

    expect(state.items).toEqual([
      { productId: "p-001", quantity: 1 },
      { productId: "p-002", quantity: 1 },
    ]);
  });

  it("increases and decreases quantity", () => {
    const initial = { items: [{ productId: "p-001", quantity: 2 }] };
    const increased = cartReducer(initial, increaseQuantity("p-001"));
    const decreased = cartReducer(increased, decreaseQuantity("p-001"));

    expect(increased.items[0]?.quantity).toBe(3);
    expect(decreased.items[0]?.quantity).toBe(2);
  });

  it("removes an item when its quantity reaches zero", () => {
    const initial = { items: [{ productId: "p-001", quantity: 1 }] };

    expect(cartReducer(initial, decreaseQuantity("p-001")).items).toEqual([]);
  });

  it("does not change the cart for unknown product ids", () => {
    const initial = { items: [{ productId: "p-001", quantity: 1 }] };

    expect(cartReducer(initial, increaseQuantity("missing"))).toEqual(initial);
    expect(cartReducer(initial, decreaseQuantity("missing"))).toEqual(initial);
  });

  it("removes one product without affecting other items", () => {
    const initial = {
      items: [
        { productId: "p-001", quantity: 2 },
        { productId: "p-002", quantity: 1 },
      ],
    };

    expect(cartReducer(initial, removeFromCart("p-001")).items).toEqual([
      { productId: "p-002", quantity: 1 },
    ]);
  });

  it("clears all items", () => {
    const initial = { items: [{ productId: "p-001", quantity: 2 }] };

    expect(cartReducer(initial, clearCart())).toEqual({ items: [] });
  });

  it("restores only entries with a product id and a positive integer quantity", () => {
    const restored = cartReducer(
      undefined,
      restoreCart([
        { productId: "p-001", quantity: 2 },
        { productId: "", quantity: 1 },
        { productId: "p-002", quantity: 0 },
        { productId: "p-003", quantity: -1 },
        { productId: "p-004", quantity: 1.5 },
      ]),
    );

    expect(restored.items).toEqual([{ productId: "p-001", quantity: 2 }]);
  });
});
