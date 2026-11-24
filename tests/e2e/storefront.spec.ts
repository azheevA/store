import { expect, test } from "@playwright/test";

test("homepage renders the hero and catalog call to action", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Предметы",
  );
  await expect(
    page.getByRole("link", { name: "Исследовать коллекцию" }),
  ).toHaveAttribute("href", "/catalog");
});

test("catalog search narrows the product list", async ({ page }) => {
  await page.goto("/catalog");

  await page.getByPlaceholder("Поиск по коллекции...").fill("Ваза «Песок»");

  await expect(page.locator("article")).toHaveCount(1);
  await expect(page.getByText("Ваза «Песок»", { exact: true })).toBeVisible();
});

test("catalog category filters show matching products", async ({ page }) => {
  await page.goto("/catalog");

  await page.getByRole("button", { name: /Декор/ }).first().click();

  await expect(page.locator("article").first()).toContainText("Декор");
  await expect(page.getByText("Ваза «Песок»", { exact: true })).toBeVisible();
});

test("cart drawer reflects added products and quantity changes", async ({
  page,
}) => {
  await page.goto("/catalog");
  await page.getByRole("button", { name: "В корзину" }).first().click();
  await page.getByRole("button", { name: /Открыть корзину/ }).click();

  const dialog = page.getByRole("dialog", { name: "Быстрый просмотр корзины" });
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole("heading", { name: /Корзина \(1\)/ }),
  ).toBeVisible();

  await dialog.getByRole("button", { name: "Увеличить" }).click();
  await expect(
    dialog.getByRole("heading", { name: /Корзина \(2\)/ }),
  ).toBeVisible();
});

test("favorites persist when navigating to the favorites page", async ({
  page,
}) => {
  await page.goto("/catalog");
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem("lavka-favorites-v1")))
    .toBe("[]");
  await page.getByRole("button", { name: "В избранное" }).first().click();
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          JSON.parse(localStorage.getItem("lavka-favorites-v1") ?? "[]").length,
      ),
    )
    .toBe(1);
  await page
    .locator("header.site-header")
    .getByRole("link", { name: /^Избранное/ })
    .click();

  await expect(page.getByRole("heading", { name: "Избранное" })).toBeVisible();
  await expect(page.locator("article")).toHaveCount(1);
});

test("checkout validates required fields and completes a demo order", async ({
  page,
}) => {
  await page.goto("/catalog");
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem("lavka-cart-v1")))
    .toBe("[]");
  await page.getByRole("button", { name: "В корзину" }).first().click();
  await expect
    .poll(() =>
      page.evaluate(
        () => JSON.parse(localStorage.getItem("lavka-cart-v1") ?? "[]").length,
      ),
    )
    .toBe(1);
  await page.goto("/checkout");

  await expect(
    page.getByRole("heading", { name: "Оформление заказа" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Подтвердить заказ" }).click();
  await expect(
    page.getByText("Заполните имя, телефон и адрес доставки.", {
      exact: true,
    }),
  ).toBeVisible();

  await page.getByLabel("Имя и фамилия").fill("Тестовый Покупатель");
  await page.getByLabel("Телефон").fill("+79990000000");
  await page.getByLabel("Адрес доставки").fill("Москва, Тестовая улица, 1");
  await page.getByRole("button", { name: "Подтвердить заказ" }).click();

  await expect(page).toHaveURL(/\/order-success\?order=LV-/);
  await expect(
    page.getByRole("heading", { name: "Заказ оформлен!" }),
  ).toBeVisible();
});

test("mobile navigation opens and navigates to the catalog", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await page.getByRole("button", { name: "Открыть меню" }).click();
  const mobileNavigation = page.getByRole("navigation", {
    name: "Мобильная навигация",
  });
  await expect(mobileNavigation).toBeVisible();
  await mobileNavigation.getByRole("link", { name: "Каталог" }).click();

  await expect(page).toHaveURL(/\/catalog$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
