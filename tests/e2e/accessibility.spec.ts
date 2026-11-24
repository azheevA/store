import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pagesToScan = [
  { path: "/", name: "homepage" },
  { path: "/catalog", name: "catalog" },
  { path: "/cart", name: "empty-cart" },
];

for (const route of pagesToScan) {
  test(`${route.name} has no critical automated accessibility violations`, async ({
    page,
  }, testInfo) => {
    await page.goto(route.path);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    await testInfo.attach(`${route.name}-axe-results.json`, {
      body: Buffer.from(JSON.stringify(results, null, 2)),
      contentType: "application/json",
    });

    const criticalViolations = results.violations.filter(
      (violation) => violation.impact === "critical",
    );

    expect(criticalViolations).toEqual([]);
  });
}
