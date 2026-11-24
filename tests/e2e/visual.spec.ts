import { expect, test } from "@playwright/test";

const heroAlt =
  "Светлая гостиная с натуральными материалами и спокойными оттенками";

test("desktop hero image loads at a high enough source resolution", async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");

  const hero = page.getByRole("region", { name: "Лавка — предметы для дома" });
  const heroImage = page.locator(`img[alt="${heroAlt}"]`).first();

  await expect(hero).toBeVisible();
  await expect(heroImage).toBeVisible();
  await expect
    .poll(() =>
      heroImage.evaluate((image: HTMLImageElement) =>
        image.complete ? image.naturalWidth : 0,
      ),
    )
    .toBeGreaterThan(1000);

  await testInfo.attach("home-hero-desktop.png", {
    body: await hero.screenshot(),
    contentType: "image/png",
  });
});

test("mobile hero keeps its image and primary content visible", async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const heroImage = page.locator(`img[alt="${heroAlt}"]`).last();
  await expect(heroImage).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Исследовать коллекцию" }),
  ).toBeVisible();

  await testInfo.attach("home-hero-mobile.png", {
    body: await page.screenshot({ fullPage: true }),
    contentType: "image/png",
  });
});
