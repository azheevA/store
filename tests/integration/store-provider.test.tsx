import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { StoreProvider } from "@/app/providers/store-provider";
import { addToCart } from "@/features/cart/model/cart-slice";
import { toggleFavorite } from "@/features/favorites/model/favorites-slice";

function StoreProbe({ children }: { children?: ReactNode }) {
  const cartItems = useAppSelector((state) => state.cart.items);
  const favoriteIds = useAppSelector((state) => state.favorites.ids);
  const dispatch = useAppDispatch();

  return (
    <div>
      <output data-testid="cart-state">{JSON.stringify(cartItems)}</output>
      <output data-testid="favorites-state">
        {JSON.stringify(favoriteIds)}
      </output>
      <button type="button" onClick={() => dispatch(addToCart("p-001"))}>
        Добавить товар
      </button>
      <button type="button" onClick={() => dispatch(toggleFavorite("p-002"))}>
        Добавить в избранное
      </button>
      {children}
    </div>
  );
}

describe("StoreProvider persistence", () => {
  it("restores cart and favorites from localStorage", async () => {
    window.localStorage.setItem(
      "lavka-cart-v1",
      JSON.stringify([{ productId: "p-001", quantity: 2 }]),
    );
    window.localStorage.setItem(
      "lavka-favorites-v1",
      JSON.stringify(["p-002", "p-003"]),
    );

    render(
      <StoreProvider>
        <StoreProbe />
      </StoreProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("cart-state")).toHaveTextContent(
        '"productId":"p-001","quantity":2',
      );
      expect(screen.getByTestId("favorites-state")).toHaveTextContent(
        '["p-002","p-003"]',
      );
    });
  });

  it("persists state changes after hydration", async () => {
    const user = userEvent.setup();

    render(
      <StoreProvider>
        <StoreProbe />
      </StoreProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Добавить товар" }));
    await user.click(
      screen.getByRole("button", { name: "Добавить в избранное" }),
    );

    await waitFor(() => {
      expect(
        JSON.parse(window.localStorage.getItem("lavka-cart-v1") ?? "[]"),
      ).toEqual([{ productId: "p-001", quantity: 1 }]);
      expect(
        JSON.parse(window.localStorage.getItem("lavka-favorites-v1") ?? "[]"),
      ).toEqual(["p-002"]);
    });
  });

  it("clears malformed persisted data without crashing", async () => {
    window.localStorage.setItem("lavka-cart-v1", "not-json");
    window.localStorage.setItem("lavka-favorites-v1", "also-not-json");

    render(
      <StoreProvider>
        <StoreProbe />
      </StoreProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("cart-state")).toHaveTextContent("[]");
      expect(screen.getByTestId("favorites-state")).toHaveTextContent("[]");
    });
    await waitFor(() => {
      expect(
        JSON.parse(window.localStorage.getItem("lavka-cart-v1") ?? "null"),
      ).toEqual([]);
      expect(
        JSON.parse(window.localStorage.getItem("lavka-favorites-v1") ?? "null"),
      ).toEqual([]);
    });
  });
});
