import type { MetadataRoute } from "next";
import { products } from "@/entities/product/data/products";
import { siteConfig } from "@/shared/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/catalog"].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? ("weekly" as const) : ("daily" as const),
    priority: route === "" ? 1 : 0.8,
  }));
  const productRoutes = products.map((product) => ({
    url: `${siteConfig.url}/product/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));
  return [...staticRoutes, ...productRoutes];
}
