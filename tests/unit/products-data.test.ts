import { describe, expect, it } from "vitest";
import {
  categories,
  getProductById,
  getProductBySlug,
  products,
} from "@/entities/product/data/products";

describe("product catalog data", () => {
  it("contains unique product ids and slugs", () => {
    expect(new Set(products.map((product) => product.id)).size).toBe(
      products.length,
    );
    expect(new Set(products.map((product) => product.slug)).size).toBe(
      products.length,
    );
  });

  it("resolves a product by id and slug", () => {
    const product = products[0];

    expect(product).toBeDefined();
    expect(getProductById(product!.id)).toEqual(product);
    expect(getProductBySlug(product!.slug)).toEqual(product);
  });

  it("returns undefined for unknown product identifiers", () => {
    expect(getProductById("missing-product")).toBeUndefined();
    expect(getProductBySlug("missing-product")).toBeUndefined();
  });

  it("keeps category counts in sync with the catalog", () => {
    for (const category of categories.filter((item) => item.id !== "all")) {
      expect(category.count).toBe(
        products.filter((product) => product.category === category.id).length,
      );
    }
    expect(categories.find((category) => category.id === "all")?.count).toBe(
      products.length,
    );
  });
});
