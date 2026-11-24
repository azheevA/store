import { describe, expect, it } from "vitest";
import { formatPrice } from "@/shared/lib/format-price";

describe("formatPrice", () => {
  it("formats prices in Russian rubles without decimal digits", () => {
    const result = formatPrice(2490);

    expect(result).toContain("₽");
    expect(result.replace(/[\u00a0\u202f]/g, " ")).toContain("2 490");
  });

  it("supports zero and large values", () => {
    expect(formatPrice(0)).toContain("0");
    expect(formatPrice(125000)).toContain("125");
  });
});
