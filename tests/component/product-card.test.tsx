import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { products } from "@/entities/product/data/products";
import { formatPrice } from "@/shared/lib/format-price";
import { ProductCard } from "@/widgets/product-card/ui/product-card";
import { renderWithStore } from "../utils/render-with-store";

describe("ProductCard", () => {
  const product = products[0]!;

  it("renders product information and price", () => {
    renderWithStore(<ProductCard product={product} />);

    expect(screen.getByText(product.name)).toBeVisible();
    expect(screen.getByText(product.subtitle)).toBeVisible();

    const expectedPrice = formatPrice(product.price).replace(/\s/gu, "");
    const priceElement = screen.getByText((_, element) => {
      if (element?.tagName !== "P") return false;

      return (element.textContent ?? "").replace(/\s/gu, "") === expectedPrice;
    });

    expect(priceElement).toBeVisible();
  });

  it("toggles favorite state from the card button", async () => {
    const user = userEvent.setup();
    const { store } = renderWithStore(<ProductCard product={product} />);
    const favoriteButton = screen.getByRole("button", { name: "В избранное" });

    await user.click(favoriteButton);

    expect(store.getState().favorites.ids).toContain(product.id);
    expect(
      screen.getByRole("button", { name: "Убрать из избранного" }),
    ).toHaveAttribute("aria-pressed", "true");

    await user.click(
      screen.getByRole("button", { name: "Убрать из избранного" }),
    );

    expect(store.getState().favorites.ids).not.toContain(product.id);
  });
});
