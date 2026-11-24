import type { MetadataRoute } from "next";
import { products } from "@/entities/product/data/products";
import { absoluteUrl } from "@/shared/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/catalog"),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: absoluteUrl(`/product/${product.slug}`),
    changeFrequency: "weekly",
    priority: product.isPopular ? 0.8 : product.isNew ? 0.75 : 0.7,
  }));

  return [...staticRoutes, ...productRoutes];
}
