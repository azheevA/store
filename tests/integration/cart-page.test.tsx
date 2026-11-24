import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { makeStore } from "@/app/store";
import { addToCart } from "@/features/cart/model/cart-slice";
import { products } from "@/entities/product/data/products";
import { CartPageContent } from "@/widgets/cart-content/ui/cart-content";
import { renderWithStore } from "../utils/render-with-store";

describe("CartPageContent integration", () => {
  it("shows the empty-cart state when there are no items", () => {
    renderWithStore(<CartPageContent />);

    expect(
      screen.getByRole("heading", { name: "Пока здесь пусто" }),
    ).toBeVisible();
    expect(
      screen.getByRole("link", { name: "Перейти в каталог" }),
    ).toHaveAttribute("href", "/catalog");
  });

  it("updates quantity and removes the product", async () => {
    const user = userEvent.setup();
    const product = products[0]!;
    const store = makeStore();
    store.dispatch(addToCart(product.id));
    const { store: renderedStore } = renderWithStore(<CartPageContent />, {
      store,
    });

    expect(screen.getByText(product.name)).toBeVisible();
    await user.click(
      screen.getByRole("button", { name: "Увеличить количество" }),
    );
    expect(renderedStore.getState().cart.items[0]?.quantity).toBe(2);

    await user.click(screen.getByRole("button", { name: "Удалить" }));
    expect(renderedStore.getState().cart.items).toEqual([]);
    expect(
      screen.getByRole("heading", { name: "Пока здесь пусто" }),
    ).toBeVisible();
  });
});
