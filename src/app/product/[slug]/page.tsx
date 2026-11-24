import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPage } from "@/views/product/ui/product-page";
import { getProductBySlug, products } from "@/entities/product/data/products";
import { siteConfig } from "@/shared/config/site";
import { formatPrice } from "@/shared/lib/format-price";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Товар не найден" };
  const title = `${product.name} — купить в Лавке`;
  const description = `${product.subtitle}. ${product.description} Цена: ${formatPrice(product.price)}.`;
  const canonical = `/product/${product.slug}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      title,
      description,
      url: canonical,
      images: [
        { url: product.image, width: 1200, height: 1200, alt: product.name },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.image],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (product === undefined) notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.id,
    category: product.categoryLabel,
    brand: { "@type": "Brand", name: siteConfig.name },
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/product/${product.slug}`,
      priceCurrency: "RUB",
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewsCount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ProductPage product={product} />
    </>
  );
}
