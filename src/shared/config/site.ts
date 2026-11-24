const vercelProductionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const vercelDeploymentHost = process.env.VERCEL_URL;

const fallbackSiteUrl = vercelProductionHost
  ? `https://${vercelProductionHost}`
  : vercelDeploymentHost
    ? `https://${vercelDeploymentHost}`
    : "http://localhost:3000";

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || fallbackSiteUrl;
const normalizedSiteUrl = new URL(configuredSiteUrl).origin;

export const siteConfig = {
  name: "Лавка",
  shortName: "Лавка",
  title: "Лавка — товары для дома, декор и уютная кухня",
  description:
    "Посуда, декор, освещение, текстиль и мебель для уютного дома. Выбирайте красивые и практичные вещи для повседневной жизни в Лавке.",
  url: normalizedSiteUrl,
  locale: "ru_RU",
  language: "ru-RU",
  currency: "RUB",
  email: "hello@lavka.example",
  phone: "+7 (800) 555-35-35",
};

export function absoluteUrl(path: string) {
  return new URL(path, `${siteConfig.url}/`).toString();
}
