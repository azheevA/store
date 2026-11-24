import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddToCartButton } from "@/features/cart/ui/add-to-cart-button";
import { renderWithStore } from "../utils/render-with-store";

describe("AddToCartButton", () => {
  it("dispatches addToCart and confirms the action", async () => {
    const user = userEvent.setup();
    const { store } = renderWithStore(<AddToCartButton productId="p-001" />);

    await user.click(screen.getByRole("button", { name: /в корзину/i }));

    expect(store.getState().cart.items).toEqual([
      { productId: "p-001", quantity: 1 },
    ]);
    expect(screen.getByRole("button", { name: /добавлено/i })).toBeVisible();
  });

  it("adds another unit when clicked again", async () => {
    const user = userEvent.setup();
    const { store } = renderWithStore(<AddToCartButton productId="p-001" />);

    await user.click(screen.getByRole("button", { name: /в корзину/i }));
    await user.click(screen.getByRole("button", { name: /добавлено/i }));

    expect(store.getState().cart.items[0]?.quantity).toBe(2);
  });
});
