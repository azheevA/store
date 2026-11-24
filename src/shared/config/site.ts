const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const siteConfig = {
  name: "Лавка",
  shortName: "Лавка",
  description:
    "Предметы для дома, которые делают каждый день уютнее. Посуда, декор, текстиль и детали с характером.",
  url: rawSiteUrl.replace(/\/$/, ""),
  locale: "ru_RU",
  currency: "RUB",
  email: "hello@lavka.example",
  phone: "+7 (800) 555-35-35",
  address: "Москва, Россия",
};
