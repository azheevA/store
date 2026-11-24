import type { MetadataRoute } from "next";
import { siteConfig } from "@/shared/config/site";

export default function robots(): MetadataRoute.Robots {
  const isPreviewDeployment = process.env.VERCEL_ENV === "preview";

  return {
    rules: {
      userAgent: "*",
      allow: isPreviewDeployment ? undefined : "/",
      disallow: isPreviewDeployment ? "/" : ["/api/"],
    },
    sitemap: absoluteSitemapUrl(),
    host: siteConfig.url,
  };
}

function absoluteSitemapUrl() {
  return new URL("/sitemap.xml", `${siteConfig.url}/`).toString();
}
