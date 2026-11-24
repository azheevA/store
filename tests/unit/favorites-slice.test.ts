import { describe, expect, it } from "vitest";
import favoritesReducer, {
  restoreFavorites,
  toggleFavorite,
} from "@/features/favorites/model/favorites-slice";

describe("favorites reducer", () => {
  it("starts with an empty list", () => {
    expect(favoritesReducer(undefined, { type: "unknown" })).toEqual({
      ids: [],
    });
  });

  it("adds an id when it is not in favorites", () => {
    expect(favoritesReducer(undefined, toggleFavorite("p-001")).ids).toEqual([
      "p-001",
    ]);
  });

  it("removes an id when it is already in favorites", () => {
    const initial = { ids: ["p-001", "p-002"] };

    expect(favoritesReducer(initial, toggleFavorite("p-001")).ids).toEqual([
      "p-002",
    ]);
  });

  it("restores unique non-empty ids", () => {
    expect(
      favoritesReducer(
        undefined,
        restoreFavorites(["p-001", "", "p-001", "p-002"]),
      ).ids,
    ).toEqual(["p-001", "p-002"]);
  });
});
