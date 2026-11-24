import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const srcDirectory = fileURLToPath(new URL("./src", import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": srcDirectory,
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.tsx"],
    include: [
      "tests/unit/**/*.test.ts",
      "tests/component/**/*.test.tsx",
      "tests/integration/**/*.test.tsx",
    ],
    clearMocks: true,
    restoreMocks: true,
    coverage: {
      provider: "v8",
      include: [
        "src/features/cart/model/cart-slice.ts",
        "src/features/favorites/model/favorites-slice.ts",
        "src/shared/lib/format-price.ts",
      ],
      reporter: ["text", "html", "lcov"],
      reportsDirectory: "./coverage",
      thresholds: {
        statements: 90,
        branches: 85,
        functions: 90,
        lines: 90,
      },
    },
  },
});
