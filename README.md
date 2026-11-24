# Lavka — Home & Lifestyle Store

[RUS](#русская-версия) · [ENG](#english-version)

---

## Русская версия

**Lavka** — современный интернет-магазин товаров для дома, декора и повседневной жизни. Проект сочетает минималистичный редакционный дизайн, натуральную цветовую палитру и удобный пользовательский интерфейс.

### Возможности

- Адаптивная главная страница и каталог товаров.
- Категории, поиск, фильтрация и сортировка каталога.
- Страницы товаров с подробной информацией.
- Корзина и избранное на Redux Toolkit с сохранением в `localStorage`.
- Демонстрационный сценарий оформления заказа.
- Переиспользуемые UI-компоненты и оптимизация изображений через `next/image`.

### Технологии

- **Next.js 16** и **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Redux Toolkit** и **React Redux**
- **Lucide React**

### Тестирование

В проект добавлена многоуровневая стратегия тестирования:

| Уровень | Инструменты | Что проверяется |
|---|---|---|
| Unit tests | Vitest | Redux reducers, форматирование цен, данные каталога |
| Component tests | Vitest, React Testing Library, user-event | Поведение карточки товара и кнопки добавления в корзину |
| Integration tests | Vitest, React Testing Library | Redux Provider, восстановление и сохранение состояния, работа корзины |
| End-to-end tests | Playwright | Навигация, поиск, фильтры, корзина, избранное, checkout |
| Accessibility | axe-core + Playwright | Автоматические проверки WCAG на ключевых страницах; CI блокируется при critical-нарушениях |
| Visual smoke tests | Playwright screenshots | Загрузка Hero, адаптивность, скриншоты для ручного просмотра в CI artifacts |
| Performance | Lighthouse CI | Performance, Accessibility, Best Practices, SEO, LCP и CLS |
| Static analysis | ESLint, TypeScript | Стиль кода и статическая типизация |
| Dependency security | `bun audit` | Известные уязвимости зависимостей уровня High и Critical |

Автоматические accessibility-проверки не заменяют ручной аудит клавиатурной навигации, экранных дикторов и контрастности в реальных сценариях. Visual smoke tests сохраняют снимки страниц как артефакты, но пока не выполняют pixel-by-pixel сравнение с эталонными изображениями.

### Локальный запуск

Требования: **Node.js 22.12+** и **Bun**.

```bash
bun install
bun run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

### Команды

```bash
# Разработка и production
bun run dev
bun run build
bun run start

# Качество кода
bun run lint
bun run typecheck
bun run audit
bun run test:security
bun run check

# Unit / component / integration
bun run test:unit
bun run test:component
bun run test:integration
bun run test:coverage
bun run test:watch
bun run test:all

# Браузерные, accessibility и visual smoke tests
bunx playwright install chromium
bun run test:e2e
bun run test:a11y
bun run test:visual
bun run test:e2e:ui

# Lighthouse performance audit
bun run test:performance
```

### SEO и Open Graph

- Уникальные `title`, `description` и canonical URL для главной, каталога и карточек товаров.
- Open Graph и Twitter Card с брендированным изображением 1200 × 630.
- JSON-LD для `Organization`, `WebSite`, `Product` и `BreadcrumbList`.
- `robots.txt` и `sitemap.xml`; в sitemap попадают только индексируемые страницы.
- Корзина, избранное, оформление заказа и страница успешного заказа помечены `noindex`.
- Preview-деплои Vercel автоматически получают `noindex` и закрываются от обхода.

`NEXT_PUBLIC_SITE_URL` задаёт канонический production URL. На Vercel добавьте его в **Project Settings → Environment Variables → Production** (например, `https://ваш-домен`). Если переменная не задана, приложение использует `VERCEL_PROJECT_PRODUCTION_URL`. Локально используйте `http://localhost:3000` из `.env.example`.

Подробности перед публичным запуском — в [SEO-SETUP.md](./SEO-SETUP.md).

### CI/CD

GitHub Actions запускает workflow `.github/workflows/ci.yml` при `push` и `pull_request` в `main` или `master`:

1. ESLint и TypeScript typecheck.
2. Unit, component и integration tests с coverage.
3. Dependency security audit.
4. Production build Next.js.
5. Playwright E2E, accessibility и visual smoke tests.
6. Lighthouse CI для главной страницы и каталога.

Отчёты Vitest, Playwright и Lighthouse сохраняются в GitHub Actions artifacts.

Production deployment настроен отдельным workflow `.github/workflows/deploy.yml`. После успешного CI на `main` он может развернуть приложение на Vercel. Для включения деплоя добавьте в **GitHub → Settings → Secrets and variables → Actions**:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

Если Secrets не заданы, шаг деплоя будет пропущен. Также можно запускать deploy workflow вручную через `workflow_dispatch`.

Dependabot еженедельно проверяет обновления Bun-зависимостей и GitHub Actions.

> После добавления или обновления зависимостей выполните `bun install` и закоммитьте обновлённый `bun.lock`. CI устанавливает зависимости из `package.json` и lockfile; зафиксированный lockfile нужен для воспроизводимых установок.

---

## English version

**Lavka** is a modern e-commerce storefront for home decor and everyday lifestyle products. It combines a minimalist editorial aesthetic, a natural color palette and an intuitive shopping experience.

### Features

- Responsive homepage and product catalog.
- Product categories, search, filtering and sorting.
- Product detail pages.
- Shopping cart and favorites powered by Redux Toolkit and persisted in `localStorage`.
- Demo checkout flow.
- Reusable UI components and image optimization with `next/image`.

### Tech Stack

- **Next.js 16** and **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Redux Toolkit** and **React Redux**
- **Lucide React**

### Testing Strategy

The project includes a layered testing setup:

| Level | Tools | Coverage |
|---|---|---|
| Unit tests | Vitest | Redux reducers, price formatting, catalog data |
| Component tests | Vitest, React Testing Library, user-event | Product cards and add-to-cart interactions |
| Integration tests | Vitest, React Testing Library | Redux Provider, state persistence and cart behavior |
| End-to-end tests | Playwright | Navigation, search, filters, cart, favorites and checkout |
| Accessibility | axe-core + Playwright | Automated WCAG checks on key pages; CI blocks critical violations |
| Visual smoke tests | Playwright screenshots | Hero loading, responsive layout and screenshots for manual review in CI artifacts |
| Performance | Lighthouse CI | Performance, Accessibility, Best Practices, SEO, LCP and CLS |
| Static analysis | ESLint, TypeScript | Code quality and static typing |
| Dependency security | `bun audit` | Known High and Critical dependency vulnerabilities |

Automated accessibility checks do not replace manual testing with keyboard navigation, screen readers and real-world contrast evaluation. Visual smoke tests store screenshots as artifacts, but do not yet perform pixel-by-pixel comparison against reference images.

### Getting Started

Requirements: **Node.js 22.12+** and **Bun**.

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
# Development and production
bun run dev
bun run build
bun run start

# Code quality
bun run lint
bun run typecheck
bun run audit
bun run test:security
bun run check

# Unit / component / integration
bun run test:unit
bun run test:component
bun run test:integration
bun run test:coverage
bun run test:watch
bun run test:all

# Browser, accessibility and visual smoke tests
bunx playwright install chromium
bun run test:e2e
bun run test:a11y
bun run test:visual
bun run test:e2e:ui

# Lighthouse performance audit
bun run test:performance
```

### SEO and Open Graph

- Unique `title`, `description` and canonical URLs for the homepage, catalog and product pages.
- Open Graph and Twitter Cards with a branded 1200 × 630 preview image.
- JSON-LD structured data for `Organization`, `WebSite`, `Product` and `BreadcrumbList`.
- Generated `robots.txt` and `sitemap.xml`; the sitemap contains indexable routes only.
- Cart, favorites, checkout and order-success pages are marked `noindex`.
- Vercel Preview deployments are automatically marked `noindex` and blocked from crawling.

`NEXT_PUBLIC_SITE_URL` defines the canonical production origin. On Vercel, set it under **Project Settings → Environment Variables → Production** (for example, `https://your-domain`). If it is not set, the app falls back to `VERCEL_PROJECT_PRODUCTION_URL`. For local development, use `http://localhost:3000` from `.env.example`.

See [SEO-SETUP.md](./SEO-SETUP.md) for the pre-launch checklist.

### CI/CD

GitHub Actions runs `.github/workflows/ci.yml` on `push` and `pull_request` to `main` or `master`:

1. ESLint and TypeScript type checking.
2. Unit, component and integration tests with coverage.
3. Dependency security audit.
4. Next.js production build.
5. Playwright E2E, accessibility and visual smoke tests.
6. Lighthouse CI for the homepage and catalog.

Vitest, Playwright and Lighthouse reports are uploaded as GitHub Actions artifacts.

Production deployment is configured in `.github/workflows/deploy.yml`. After CI succeeds on `main`, the workflow can deploy the application to Vercel. To enable deployment, add these repository secrets under **GitHub → Settings → Secrets and variables → Actions**:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

The deployment step is skipped when the secrets are missing. The deploy workflow can also be started manually with `workflow_dispatch`.

Dependabot checks Bun dependencies and GitHub Actions for updates every week.

> After adding or updating dependencies, run `bun install` and commit the updated `bun.lock`. The CI workflow installs from `package.json` and the lockfile; committing the lockfile is required for reproducible installs.

---

## License / Лицензия

Лицензия проекта пока не указана. / No license has been specified for this project.
